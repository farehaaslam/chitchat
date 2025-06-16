# 💬 Real-Time Chat Application

A modern, full-stack real-time chat application built with the MERN stack and Socket.IO for seamless messaging experience.

## ✨ Features

- **🔐 User Authentication** - Secure signup/login with JWT tokens
- **💬 Real-time Messaging** - Instant messaging with Socket.IO
- **👥 Online Status** - See who's currently online
- **🖼️ Image Sharing** - Send and receive images in chat
- **📱 Responsive Design** - Works perfectly on desktop and mobile
- **🎨 Profile Management** - Update profile pictures and user details
- **🔒 Secure** - Password hashing with bcrypt and protected routes
- **🎨 UI**-32 diffrent themes

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **Tailwind CSS** - Styling
- **Socket.IO Client** - Real-time communication
- **Daisy-UI** -Bunch of diffrent themes

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **Socket.IO** - Real-time bidirectional communication
- **JWT** - Authentication tokens
- **Cloudinary** - Image storage and management
- **bcrypt** - Password hashing

## 🚀 Quick Start

### Prerequisites
- Node.js (v20 or higher)
- MongoDB database
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/farehaaslam/chitchat
   cd chat-app
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the server directory:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   
   # Cloudinary Config
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

5. **Start the application**
   
   **Development mode (server):**
   ```bash
   cd server
   npm start
   ```
   
   **Development mode (client):**
   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000`

## 📁 Project Structure

```
chat-app/
├── client/                 # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── server/                 # Node.js backend
│   ├── controller/         # Route controllers
│   ├── lib/               # Utilities (socket, cloudinary, jwt)
│   ├── middleware/        # Auth middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── index.js          # Server entry point
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/user/signup` - User registration
- `POST /api/user/login` - User login
- `POST /api/user/logout` - User logout
- `GET /api/user/check` - Check auth status
- `PUT /api/user/update` - Update profile

### Messages
- `GET /api/message/user` - Get users for sidebar
- `GET /api/message/:id` - Get messages with specific user
- `POST /api/message/send/:id` - Send message to user



⭐ Star this repo if you found it helpful!