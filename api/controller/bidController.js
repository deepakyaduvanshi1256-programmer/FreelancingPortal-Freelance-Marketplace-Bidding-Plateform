import mongoose from "mongoose";
import { BidModel, ProjectModel, userModel, NotificationModel } from "../models/model.js";

const BID_COST = 10; // tokens spent whenever a developer places a bid

// Developer places a bid on an open project. Costs BID_COST tokens.
export const placeBid = async (req, res) => {
    try {
        const developerId = req.user.id; // from verifyToken
        const { projectId, amount, duration, proposal } = req.body;

        const project = await ProjectModel.findById(projectId);
        if (!project) {
            return res.json({ code: 404, success: false, message: "Project not found", result: "", error: true });
        }
        if (project.status !== "open") {
            return res.json({ code: 400, success: false, message: "This project is not open for bidding", result: "", error: true });
        }

        const alreadyBid = await BidModel.findOne({ projectId, developerId, status: { $ne: "rejected" } });
        if (alreadyBid) {
            return res.json({ code: 400, success: false, message: "You have already placed a bid on this project", result: "", error: true });
        }

        // Atomic deduction: only succeeds if the developer currently has enough tokens.
        // Prevents a race where two simultaneous bids both pass a balance check done beforehand.
        const developer = await userModel.findOneAndUpdate(
            { _id: developerId, credit: { $gte: BID_COST } },
            { $inc: { credit: -BID_COST } },
            { new: true }
        );
        if (!developer) {
            return res.json({ code: 400, success: false, message: "Not enough tokens to place a bid. Please top up.", result: "", error: true });
        }

        const bid = new BidModel({ projectId, developerId, amount, duration, proposal, tokensUsed: BID_COST });
        const result = await bid.save();

        await NotificationModel.create({
            userId: project.clientId,
            message: `New bid received on your project "${project.title}"`,
            type: "bid_received",
            relatedProjectId: project._id.toString()
        });

        res.json({ code: 200, success: true, message: "Bid placed successfully", result, error: false });
    } catch (err) {
        console.log(err);
        res.json({ code: 500, success: false, message: "Internal Server Error", result: "", error: true });
    }
};

// Client views all bids on one of their projects
export const getBidsForProject = async (req, res) => {
    try {
        const { projectId } = req.query;
        const bids = await BidModel.find({ projectId }).sort({ createdAt: -1 });
        // attach basic developer info to each bid
        const developerIds = bids.map(b => b.developerId);
        const developers = await userModel.find({ _id: { $in: developerIds } }).select("name email skill rate headline profile");
        const devMap = {};
        developers.forEach(d => { devMap[d._id.toString()] = d; });
        const result = bids.map(b => ({ ...b.toObject(), developer: devMap[b.developerId] || null }));
        res.json({ code: 200, success: true, message: "Bids fetched", result, error: false });
    } catch (err) {
        res.json({ code: 500, success: false, message: "Internal Server Error", result: "", error: true });
    }
};

// Developer views their own bid history
export const getMyBids = async (req, res) => {
    try {
        const developerId = req.user.id;
        const bids = await BidModel.find({ developerId }).sort({ createdAt: -1 });
        const projectIds = bids.map(b => b.projectId);
        const projects = await ProjectModel.find({ _id: { $in: projectIds } });
        const projMap = {};
        projects.forEach(p => { projMap[p._id.toString()] = p; });
        const result = bids.map(b => ({ ...b.toObject(), project: projMap[b.projectId] || null }));
        res.json({ code: 200, success: true, message: "Bids fetched", result, error: false });
    } catch (err) {
        res.json({ code: 500, success: false, message: "Internal Server Error", result: "", error: true });
    }
};

// Client accepts one bid -> project assigned, all other pending bids on that project auto-rejected.
// Tokens already spent to bid are NOT refunded (real-life freelance platforms treat this as
// a non-refundable cost of participating, same as Upwork "Connects").
export const acceptBid = async (req, res) => {
    try {
        const { bidId } = req.body;
        const bid = await BidModel.findById(bidId);
        if (!bid) {
            return res.json({ code: 404, success: false, message: "Bid not found", result: "", error: true });
        }

        // Atomic guard: project must still be "open" at the moment we assign it.
        // This stops two different bids being accepted at the same time (double-assign race).
        const project = await ProjectModel.findOneAndUpdate(
            { _id: bid.projectId, status: "open" },
            { status: "assigned", assignedTo: bid.developerId, assignedBidId: bid._id.toString() },
            { new: true }
        );
        if (!project) {
            return res.json({ code: 400, success: false, message: "This project is no longer open (already assigned/cancelled)", result: "", error: true });
        }

        bid.status = "accepted";
        await bid.save();

        // reject every other pending bid on this project
        const otherBids = await BidModel.find({ projectId: bid.projectId, _id: { $ne: bid._id }, status: "pending" });
        await BidModel.updateMany(
            { projectId: bid.projectId, _id: { $ne: bid._id }, status: "pending" },
            { status: "rejected" }
        );

        await NotificationModel.create({
            userId: bid.developerId,
            message: `Your bid was accepted! Project "${project.title}" has been assigned to you.`,
            type: "project_assigned",
            relatedProjectId: project._id.toString()
        });

        for (const ob of otherBids) {
            await NotificationModel.create({
                userId: ob.developerId,
                message: `Your bid on "${project.title}" was not selected this time.`,
                type: "bid_rejected",
                relatedProjectId: project._id.toString()
            });
        }

        res.json({ code: 200, success: true, message: "Bid accepted, project assigned", result: { bid, project }, error: false });
    } catch (err) {
        console.log(err);
        res.json({ code: 500, success: false, message: "Internal Server Error", result: "", error: true });
    }
};

// Client rejects a single bid without assigning the project
export const rejectBid = async (req, res) => {
    try {
        const { bidId } = req.body;
        const bid = await BidModel.findByIdAndUpdate(bidId, { status: "rejected" }, { new: true });
        if (!bid) {
            return res.json({ code: 404, success: false, message: "Bid not found", result: "", error: true });
        }
        const project = await ProjectModel.findById(bid.projectId);
        await NotificationModel.create({
            userId: bid.developerId,
            message: `Your bid on "${project ? project.title : "a project"}" was rejected.`,
            type: "bid_rejected",
            relatedProjectId: bid.projectId
        });
        res.json({ code: 200, success: true, message: "Bid rejected", result: bid, error: false });
    } catch (err) {
        res.json({ code: 500, success: false, message: "Internal Server Error", result: "", error: true });
    }
};
