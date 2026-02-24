#🚘 My i30 - Smart Maintenance Tracker

A full-stack vehicle management application designed for Hyundai i30 owners. This tool helps users track service intervals, monitor mileage-based maintenance, and manage safety items expirations like fire extinguishers.


## 🌟 Live Demo
**URL:** [Link to your GitHub Pages or Render site]  
**Guest Access:** - **Email:** `demo@i30.com`  
- **Password:** `demo123`     
*(Demo mode uses frontend-only logic to showcase the dashboard without requiring a live server connection.)*


## 📸 Screenshots
### Secure Authentication
-![Login](./screenshots/login-page-scn.png)
-*Custom-themed login with persistent session support.*
-### User Dashboard
-![Dashboard](./screenshots/...)
-*Visual alerts turn red when maintenance is overdue based on current mileage.*


## 🛠️ Technical Stack
- **Frontend:** HTML5, CSS3 (Flexbox/Grid), Vanilla JavaScript (ES6+)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Security:** JWT (JSON Web Tokens), Bcryptjs (Password Hashing), CORS Policy
- **Deployment:** Render (Backend), GitHub Pages (Frontend)


## 🚀 Key Features
- **Smart Logic:** Automatically calculates service gaps and triggers red alert.
- **Secure Auth:** Uses **JWT "Security Badges"** for stateless authentication.
- **Data Persistence:** Implements **Mongoose Upsert** logic so users have exactly one car profile that updates dynamically.
- **Responsive Design:** Custom CSS tailored for both desktop and mobile use in the garage.


## 🔒 Security Best Practices
- Sensitive keys (`MONGO_URI`, `JWT_SECRET`) are managed via **Environment Variables**.
- Passwords are never stored in plain text; they are **salted and hashed** using Bcrypt.
- Client-side storage uses `localStorage` for "Remember Me" functionality.


## 🧠 Development Process
This project was developed as a collaboration between myself and **Gemini (Google AI)**. 
- **My Role**: System architecture, UI/UX design, database schema, and logic implementation.
- **Gemini's Role**: Pair-programming partner, security auditor (JWT/Bcrypt), and deployment consultant.


##Easter-eggs
-Colors are all from hyundai cars (dark blue from normal Hyundai pallet and light blue from Hyundai N division)
-a tribute to my car

---
*Created by Bruno — https://www.linkedin.com/in/bruno-fanin/*

Thanks for being the best car ever 😊
