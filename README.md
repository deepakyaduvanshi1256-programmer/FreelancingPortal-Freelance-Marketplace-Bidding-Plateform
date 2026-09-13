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