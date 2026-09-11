import { ProjectModel, userModel, BidModel, NotificationModel, PlanModel } from "../models/model.js";

export const adminUserList = async (req, res) => {
    try {
        const result = await userModel.find({ type: "user" }).select("-password");
        res.status(200).json({ code: 200, success: true, message: "Data fetched", result, error: false });
    } catch (err) {
        res.status(500).json({ code: 500, success: false, message: err.message, result: [], error: true });
    }
};

export const adminClientList = async (req, res) => {
    try {
        const result = await userModel.find({ type: "client" }).select("-password");
        res.status(200).json({ code: 200, success: true, message: "Data fetched", result, error: false });
    } catch (err) {
        res.status(500).json({ code: 500, success: false, message: err.message, result: [], error: true });
    }
};

export const adminProjectList = async (req, res) => {
    try {
        const result = await ProjectModel.find().sort({ createdAt: -1 });
        res.status(200).json({ code: 200, success: true, message: "Data fetched", result, error: false });
    } catch (err) {
        res.status(500).json({ code: 500, success: false, message: err.message, result: [], error: true });
    }
};

export const adminBidList = async (req, res) => {
    try {
        const bids = await BidModel.find().sort({ createdAt: -1 });
        const developerIds = bids.map(b => b.developerId);
        const projectIds = bids.map(b => b.projectId);
        const developers = await userModel.find({ _id: { $in: developerIds } }).select("name email");
        const projects = await ProjectModel.find({ _id: { $in: projectIds } }).select("title status clientId");
        const devMap = {};
        developers.forEach(d => { devMap[d._id.toString()] = d; });
        const projMap = {};
        projects.forEach(p => { projMap[p._id.toString()] = p; });
        const result = bids.map(b => ({
            ...b.toObject(),
            developer: devMap[b.developerId] || null,
            project: projMap[b.projectId] || null
        }));
        res.status(200).json({ code: 200, success: true, message: "Data fetched", result, error: false });
    } catch (err) {
        res.status(500).json({ code: 500, success: false, message: err.message, result: [], error: true });
    }
};

// Admin sees every plan (active + inactive), unlike the public /plans list
export const adminPlanList = async (req, res) => {
    try {
        const result = await PlanModel.find().sort({ tokens: 1 });
        res.status(200).json({ code: 200, success: true, message: "Data fetched", result, error: false });
    } catch (err) {
        res.status(500).json({ code: 500, success: false, message: err.message, result: [], error: true });
    }
};

// Admin blocks/unblocks a user or client account (blocked users can't log in or bid)
export const toggleBlockUser = async (req, res) => {
    try {
        const { userId, isBlocked } = req.body;
        const user = await userModel.findByIdAndUpdate(userId, { isBlocked }, { new: true }).select("-password");
        if (!user) {
            return res.json({ code: 404, success: false, message: "User not found", result: "", error: true });
        }
        await NotificationModel.create({
            userId: user._id.toString(),
            message: isBlocked ? "Your account has been blocked by admin." : "Your account has been unblocked.",
            type: isBlocked ? "project_blocked" : "general"
        });
        res.json({ code: 200, success: true, message: `User ${isBlocked ? "blocked" : "unblocked"}`, result: user, error: false });
    } catch (err) {
        res.json({ code: 500, success: false, message: "Internal Server Error", result: "", error: true });
    }
};

// Admin force-blocks a project (e.g. flagged / disputed) — stops further bidding
export const adminBlockProject = async (req, res) => {
    try {
        const { projectId } = req.body;
        const project = await ProjectModel.findByIdAndUpdate(projectId, { status: "blocked" }, { new: true });
        if (!project) {
            return res.json({ code: 404, success: false, message: "Project not found", result: "", error: true });
        }
        await NotificationModel.create({
            userId: project.clientId,
            message: `Your project "${project.title}" has been blocked by admin.`,
            type: "project_blocked",
            relatedProjectId: project._id.toString()
        });
        res.json({ code: 200, success: true, message: "Project blocked", result: project, error: false });
    } catch (err) {
        res.json({ code: 500, success: false, message: "Internal Server Error", result: "", error: true });
    }
};
