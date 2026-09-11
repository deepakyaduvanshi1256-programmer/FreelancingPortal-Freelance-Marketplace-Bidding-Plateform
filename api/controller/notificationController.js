import { NotificationModel } from "../models/model.js";

export const getNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await NotificationModel.find({ userId }).sort({ createdAt: -1 }).limit(50);
        const unreadCount = await NotificationModel.countDocuments({ userId, isRead: false });
        res.json({ code: 200, success: true, message: "Notifications fetched", result: { notifications: result, unreadCount }, error: false });
    } catch (err) {
        res.json({ code: 500, success: false, message: "Internal Server Error", result: "", error: true });
    }
};

export const markNotificationRead = async (req, res) => {
    try {
        const { notificationId } = req.body;
        const result = await NotificationModel.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
        res.json({ code: 200, success: true, message: "Marked as read", result, error: false });
    } catch (err) {
        res.json({ code: 500, success: false, message: "Internal Server Error", result: "", error: true });
    }
};

export const markAllNotificationsRead = async (req, res) => {
    try {
        const userId = req.user.id;
        await NotificationModel.updateMany({ userId, isRead: false }, { isRead: true });
        res.json({ code: 200, success: true, message: "All marked as read", result: "", error: false });
    } catch (err) {
        res.json({ code: 500, success: false, message: "Internal Server Error", result: "", error: true });
    }
};
