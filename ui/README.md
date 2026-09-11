# Freelancer Bidding Platform

A full-stack **Freelancer Bidding Platform** where clients can post projects and freelancers can find projects and submit their bids.

## 📌 About The Project

This project is designed to connect **clients and freelancers** on a single platform.

Clients can post their projects with details, budget, and deadline. Freelancers can view available projects and submit their bids according to their skills and experience.

The platform makes the process of **finding projects, hiring freelancers, and managing bids** simple and organized.

## 🚀 Features

### 👤 User Authentication

* User Registration
* User Login
* Secure Password Authentication
* JWT Authentication
* Role-based access

### 🧑‍💼 Client Features

* Create and post projects
* Add project description
* Set project budget
* Set project deadline
* View submitted bids
* Select a suitable freelancer
* Manage posted projects

### 👨‍💻 Freelancer Features

* View available projects
* Search for projects
* View project details
* Submit bids
* Add bid amount
* Add proposal/message
* Track submitted bids

### 🔐 Security

* JWT-based authentication
* Password hashing
* Protected routes
* Role-based authorization

## 🛠️ Technologies Used

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Bootstrap

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Other Tools

* JWT
* bcrypt
* REST API
* Git & GitHub
* Postman

## 🔄 How It Works

1. User creates an account.
2. User logs in to the platform.
3. A client can post a new project.
4. Freelancers can browse available projects.
5. Freelancers submit their bids and proposals.
6. Client reviews the received bids.
7. Client selects the most suitable freelancer.
8. The project can then be managed between the client and freelancer.

## 📂 Project Structure

```text
freelancer-bidding-platform/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 4. Start Backend

```bash
cd backend
npm run dev
```

### 5. Start Frontend

```bash
cd frontend
npm start
```

## 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## 🎯 Project Objective

The main objective of this project is to create a simple and secure platform where **clients can find freelancers and freelancers can find suitable projects**.

It helps make the freelancing process easier by providing project posting, bidding, authentication, and project management features.

## 🔮 Future Improvements

* Online chat between client and freelancer
* Online payment system
* Freelancer ratings and reviews
* Email notifications
* Real-time notifications
* Advanced project search and filters
* Admin dashboard
* Project status tracking

## 👨‍💻 Developer

**Deepak Yadav**

B.Tech CSE / AI-ML
MERN Stack Developer

## ⭐ Support

If you like this project, please give it a **star ⭐** on GitHub.
