# FreelancingPortal – Freelance Marketplace & Bidding Platform

FreelancingPortal is a full-stack freelance marketplace and bidding platform built using the MERN stack.

The platform connects Clients and Developers through project posting, competitive bidding, hiring, project assignment, and project completion workflows.

## Technology Stack

- React.js
- Node.js
- Express.js
- MongoDB
- JWT
- bcrypt

## Project Roles

- Admin
- Client
- Developer

## About The Project

FreelancingPortal is designed to provide a complete digital marketplace for freelance work.

Clients can create and publish projects, receive competitive bids from Developers, review proposals, and hire suitable Developers.

Developers can discover available projects, submit bids using tokens, track their bids, and work on assigned projects.

Admins can manage users, monitor projects, moderate platform activities, and handle account-related actions.

## Authentication & User Roles

FreelancingPortal uses secure token-based authentication with JWT.

The platform supports three different user roles:

- **Admin** – Manages users, projects, moderation, and platform activities.
- **Client** – Creates projects, receives bids, reviews developers, and hires developers.
- **Developer** – Browses projects, submits bids, manages bids, and works on assigned projects.

### Authentication Features

- JWT-based authentication
- Secure password hashing using bcrypt
- Role-Based Access Control (RBAC)
- Protected REST API routes
- Role-specific workflows for Admin, Client, and Developer

## Client Features

- Create and publish freelance projects
- Define project requirements and details
- View competitive bids from Developers
- Review developer proposals and bid details
- Hire a suitable Developer
- Assign projects to selected Developers
- Track project progress and completion
- Receive real-time notifications for project and bidding activities

## Developer Features

- Browse available freelance projects
- View project requirements and details
- Submit competitive bids using tokens
- Track submitted bids
- Receive bid status notifications
- Get notified when a bid is accepted or rejected
- View assigned projects
- Work on assigned projects
- Complete assigned projects
- Manage available bidding tokens

## Admin Features

- Manage registered users
- Monitor Client and Developer accounts
- Moderate platform activities
- Manage project-related activities
- Block or manage user accounts
- Receive notifications for account-related actions
- Maintain platform security and access control
- Manage the overall freelance marketplace

## Token-Based Bidding System

FreelancingPortal uses a token-based bidding system to manage competitive project bids.

- Developers use tokens to submit bids on projects.
- Token balance is validated before placing a bid.
- MongoDB atomic `$inc` operations are used for token balance updates.
- Atomic operations help prevent incorrect token deductions during simultaneous bid submissions.
- The system maintains consistent token balances even when multiple users submit bids concurrently.

## Concurrency-Safe Bid Acceptance

FreelancingPortal uses concurrency-safe logic when a Client accepts a Developer bid.

- Conditional `findOneAndUpdate` queries are used during bid acceptance.
- The project is assigned to only one Developer.
- Once a bid is accepted, other pending bids are automatically rejected.
- Conditional database updates help prevent multiple Developers from being assigned to the same project during simultaneous requests.
- This ensures consistent project and bidding state under concurrent operations.

## Real-Time Notifications

FreelancingPortal provides in-app notifications to keep users updated about important platform activities.

The system supports notifications for the following events:

1. Bid Received
2. Bid Accepted
3. Bid Rejected
4. Project Assigned
5. Account Blocked

These notifications help Clients, Developers, and Admins stay informed about important changes without manually checking every section of the platform.