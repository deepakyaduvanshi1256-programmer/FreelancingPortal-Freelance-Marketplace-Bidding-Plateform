import express from 'express';
import { userRegister, userLogin } from '../controller/authcontroller.js';
import { adminUserList, adminClientList, adminProjectList, adminBidList, adminPlanList, toggleBlockUser, adminBlockProject } from '../controller/adminController.js';
import { clientProjectList, postProject, listOpenProjects, listMyAssignedProjects, updateProjectStatus } from '../controller/ClientController.js';
import { placeBid, getBidsForProject, getMyBids, acceptBid, rejectBid } from '../controller/bidController.js';
import { getNotifications, markNotificationRead, markAllNotificationsRead } from '../controller/notificationController.js';
import { listPlans, createPlan, buyPlan } from '../controller/planController.js';
import { getMe, updateProfile, changePassword } from '../controller/profileController.js';
import { verifyToken, allowRoles } from '../middleware/auth.js';

const router = express.Router();

// ---------------- Public / Auth ----------------
router.post("/register", userRegister)
router.post("/login", userLogin)
router.get('/plans', listPlans) // public pricing page

// ---------------- Admin (requires admin role) ----------------
router.get('/admin-user-list', verifyToken, allowRoles("admin"), adminUserList)
router.get('/admin-client-list', verifyToken, allowRoles("admin"), adminClientList)
router.get('/admin-project-list', verifyToken, allowRoles("admin"), adminProjectList)
router.get('/admin-bid-list', verifyToken, allowRoles("admin"), adminBidList)
router.post('/admin-toggle-block-user', verifyToken, allowRoles("admin"), toggleBlockUser)
router.post('/admin-block-project', verifyToken, allowRoles("admin"), adminBlockProject)
router.post('/admin-create-plan', verifyToken, allowRoles("admin"), createPlan)
router.get('/admin-plan-list', verifyToken, allowRoles("admin"), adminPlanList)

// ---------------- Client ----------------
router.post('/client-post-project', verifyToken, allowRoles("client"), postProject)
router.get('/client-post-list', verifyToken, allowRoles("client"), clientProjectList)
router.post('/client-update-project-status', verifyToken, allowRoles("client"), updateProjectStatus)
router.get('/client-project-bids', verifyToken, allowRoles("client"), getBidsForProject)
router.post('/client-accept-bid', verifyToken, allowRoles("client"), acceptBid)
router.post('/client-reject-bid', verifyToken, allowRoles("client"), rejectBid)

// ---------------- Developer (type "user") ----------------
router.get('/developer-open-projects', verifyToken, allowRoles("user"), listOpenProjects)
router.get('/developer-my-projects', verifyToken, allowRoles("user"), listMyAssignedProjects)
router.post('/developer-place-bid', verifyToken, allowRoles("user"), placeBid)
router.get('/developer-my-bids', verifyToken, allowRoles("user"), getMyBids)
router.post('/developer-buy-plan', verifyToken, allowRoles("user"), buyPlan)

// ---------------- Profile (any logged-in user) ----------------
router.get('/profile', verifyToken, getMe)
router.post('/update-profile', verifyToken, updateProfile)
router.post('/change-password', verifyToken, changePassword)

// ---------------- Notifications (any logged-in user) ----------------
router.get('/notifications', verifyToken, getNotifications)
router.post('/notifications-mark-read', verifyToken, markNotificationRead)
router.post('/notifications-mark-all-read', verifyToken, markAllNotificationsRead)

export default router;
