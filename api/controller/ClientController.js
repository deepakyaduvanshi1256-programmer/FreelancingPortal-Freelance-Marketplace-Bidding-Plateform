import { ProjectModel, BidModel } from "../models/model.js"

export const postProject = async (req, res) => {
    try {
        const clientId = req.user.id;
        const { title, des, budget, duration } = req.body
        const isExist = await ProjectModel.findOne({ clientId, title })
        if (isExist) {
            return res.json({
                code: 400,
                success: false,
                message: "Project allready Exist",
                result: "",
                error: true
            })
        }
        const data = new ProjectModel({ clientId, title, des, budget, duration })
        const result = await data.save()
        res.json({
            code: 200,
            success: true,
            message: "Project Posted Successfully",
            result: result,
            error: false
        })
    } catch (err) {
        res.json({
            code: 500,
            success: false,
            message: "Internal Server Error",
            result: "",
            error: true
        })
    }
}

// Client's own projects (any status)
export const clientProjectList = async (req, res) => {
    try {
        const clientId = req.user.id;
        const result = await ProjectModel.find({ clientId }).sort({ createdAt: -1 })
        res.json({
            code: 200,
            success: true,
            message: "data fetched",
            result: result,
            error: false
        })
    } catch (err) {
        res.json({
            code: 500,
            success: false,
            message: "Internal Server Error",
            result: "",
            error: true
        })
    }
}

// Public feed for developers to browse & bid on
export const listOpenProjects = async (req, res) => {
    try {
        const result = await ProjectModel.find({ status: "open" }).sort({ createdAt: -1 })
        res.json({ code: 200, success: true, message: "Open projects fetched", result, error: false })
    } catch (err) {
        res.json({ code: 500, success: false, message: "Internal Server Error", result: "", error: true })
    }
}

// Developer's currently assigned/in-progress work
export const listMyAssignedProjects = async (req, res) => {
    try {
        const developerId = req.user.id;
        const result = await ProjectModel.find({ assignedTo: developerId }).sort({ createdAt: -1 })
        res.json({ code: 200, success: true, message: "Assigned projects fetched", result, error: false })
    } catch (err) {
        res.json({ code: 500, success: false, message: "Internal Server Error", result: "", error: true })
    }
}

// Client (owner only) can move status forward: in_progress -> completed, or open/assigned -> cancelled
export const updateProjectStatus = async (req, res) => {
    try {
        const clientId = req.user.id;
        const { projectId, status } = req.body; // status: "in_progress" | "completed" | "cancelled"
        const allowed = ["in_progress", "completed", "cancelled"];
        if (!allowed.includes(status)) {
            return res.json({ code: 400, success: false, message: "Invalid status", result: "", error: true })
        }
        const project = await ProjectModel.findOneAndUpdate(
            { _id: projectId, clientId },
            { status },
            { new: true }
        );
        if (!project) {
            return res.json({ code: 404, success: false, message: "Project not found or not yours", result: "", error: true })
        }
        res.json({ code: 200, success: true, message: `Project marked as ${status}`, result: project, error: false })
    } catch (err) {
        res.json({ code: 500, success: false, message: "Internal Server Error", result: "", error: true })
    }
}
