# 💬 Chat App

A modern, full-stack real-time chat application built with React, Node.js, and WebSocket technology. Connect with friends, send messages, and see who's online instantly.

**Live Demo:** [https://chat-app-5ufs.onrender.com/](https://chat-app-5ufs.onrender.com/)  
**GitHub Repository:** [https://github.com/somandhir/chat-app](https://github.com/somandhir/chat-app)

---

## Features

-  **User Authentication** - Secure JWT-based authentication with bcryptjs password encryption
-  **Real-Time Messaging** - Instant message delivery using Socket.io
-  **Online Status** - See who's currently online in real-time
-  **Profile Management** - Update profile picture with Cloudinary integration
-  **Responsive Design** - Beautiful UI built with Tailwind CSS and DaisyUI
-  **Settings Page** - User preference management and personalization
-  **User-Friendly** - Intuitive interface with loading states and error handling
-  **Mobile Optimized** - Works seamlessly on desktop and mobile devices

---

## 🛠 Tech Stack

### Frontend
- **React 19** - JavaScript library for building user interfaces
- **Vite** - Next generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS component library
- **React Router** - Client-side routing
- **Socket.io Client** - Real-time communication
- **Zustand** - State management
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Lucide React** - Beautiful SVG icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Socket.io** - Real-time bidirectional communication
- **JWT** - JSON Web Token authentication
- **Bcryptjs** - Password hashing
- **Cloudinary** - Cloud image storage
- **Cookie Parser** - Parse HTTP request cookies
- **CORS** - Cross-Origin Resource Sharing
- **Dotenv** - Environment variables

---

## Project Structure

```
chat-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js          # Authentication logic
│   │   │   └── message.controller.js       # Message handling
│   │   ├── lib/
│   │   │   ├── cloudinary.js              # Cloudinary configuration
│   │   │   ├── db.js                      # Database connection
│   │   │   ├── socket.js                  # Socket.io setup
│   │   │   └── utils.js                   # Utility functions
│   │   ├── middleware/
│   │   │   └── auth.middleware.js         # JWT verification
│   │   ├── models/
│   │   │   ├── user.model.js              # User schema
│   │   │   └── message.model.js           # Message schema
│   │   ├── routes/
│   │   │   ├── auth.route.js              # Auth endpoints
│   │   │   └── message.route.js           # Message endpoints
│   │   └── index.js                       # Server entry point
│   ├── .env                               # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatContainer.jsx          # Main chat interface
│   │   │   ├── ChatHeader.jsx             # Chat header with user info
│   │   │   ├── MessageInput.jsx           # Message input form
│   │   │   ├── Navbar.jsx                 # Top navigation
│   │   │   ├── NoChatSelected.jsx         # Empty state
│   │   │   ├── Sidebar.jsx                # User list sidebar
│   │   │   └── Skeletons/                 # Loading skeleton components
│   │   ├── pages/
│   │   │   ├── HomePage.jsx               # Main chat page
│   │   │   ├── LoginPage.jsx              # Login form
│   │   │   ├── SignUpPage.jsx             # Registration form
│   │   │   ├── ProfilePage.jsx            # User profile
│   │   │   └── SettingsPage.jsx           # User settings
│   │   ├── store/
│   │   │   ├── useAuthStore.js            # Authentication state
│   │   │   └── useChatStore.js            # Chat state
│   │   ├── lib/
│   │   │   └── axios.js                   # Axios configuration
│   │   ├── App.jsx                        # Main component
│   │   └── main.jsx                       # Entry point
│   ├── public/                            # Static assets
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── package.json
│
└── README.md
```

---

##  Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **MongoDB** instance (local or MongoDB Atlas)
- **Cloudinary** account for image hosting

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/somandhir/chat-app.git
cd chat-app
```

2. **Set up the Backend**

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

3. **Set up the Frontend**

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory (if needed):
```env
VITE_API_URL=http://localhost:5001
```

---

##  Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server runs on `http://localhost:5001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
```

This creates a `dist` folder that the backend serves in production.

---

##  API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /signup` - Register a new user
- `POST /login` - Login user
- `POST /logout` - Logout user
- `GET /check-auth` - Verify authentication status
- `PUT /update-profile` - Update user profile

### Message Routes (`/api/messages`)
- `GET /users` - Get all users
- `GET /:id` - Get messages with specific user
- `POST /send/:id` - Send message to user

---

##  WebSocket Events

Real-time communication is handled through Socket.io:
- `connection` - User connects to socket
- `disconnect` - User disconnects
- `newMessage` - New message received
- `userOnline` - User comes online
- `userOffline` - User goes offline

---

## 🌐 Deployment

The application is deployed on **Render**:
- **Live URL:** [https://chat-app-5ufs.onrender.com/](https://chat-app-5ufs.onrender.com/)

### Deployment Steps:
1. Push your code to GitHub
2. Connect your GitHub repository to Render
3. Set environment variables in Render dashboard
4. Deploy automatically or manually
5. Frontend is served from the backend in production mode

---

## 🔒 Security Features

- **Password Encryption** - Bcryptjs for secure password hashing
- **JWT Authentication** - Secure token-based authentication
- **HTTP-Only Cookies** - Secure cookie storage for tokens
- **CORS Protection** - Cross-origin resource sharing configured
- **Input Validation** - Server-side validation for all inputs
- **Environment Variables** - Sensitive data in .env files

---

## Environment Variables

### Backend (.env)
```
PORT=5001
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/chat-app
JWT_SECRET=your_super_secret_jwt_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=production
```

---

## Troubleshooting

### Backend won't connect to MongoDB
- Verify MongoDB connection string in `.env`
- Check MongoDB Atlas IP whitelist includes your IP
- Ensure MongoDB is running if using local instance

### Frontend can't connect to backend
- Verify backend is running on correct port
- Check CORS configuration in backend
- Ensure API URL is correct in frontend configuration

### Cloudinary image upload fails
- Verify Cloudinary credentials in `.env`
- Check image file size (should be < 5MB)
- Ensure Cloudinary API key is valid

### Socket.io connection issues
- Clear browser cache and cookies
- Check WebSocket compatibility in your network
- Verify Socket.io port is not blocked by firewall

---

## Future Enhancements

-  Message search functionality
-  File sharing capabilities
-  Voice and video calling
-  Group chat support
-  Push notifications
-  Dark mode toggle
-  Mobile app version
-  Message reactions and emojis

---

## Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Somandhir**  
GitHub: [@somandhir](https://github.com/somandhir)

---

##  Support

If you encounter any issues or have questions:
- Open an issue on [GitHub Issues](https://github.com/somandhir/chat-app/issues)

---

##  Live Link

Visit the [live demo](https://chat-app-5ufs.onrender.com/) to see the application in action!

---

