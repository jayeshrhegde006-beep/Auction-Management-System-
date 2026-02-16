Auction-Management-System

# 🛒 Online Auction System

A full-stack Online Auction System built using the MERN stack architecture.  
This platform allows users to register as buyers or sellers, list products for auction, place bids, and manage transactions securely.

---

## 🚀 Features

### 👤 Authentication & User Management
- User registration & login
- Buyer & Seller roles
- Secure authentication with JWT
- User profile management

### 🛍️ Seller Features
- Add products for auction
- Manage listed products
- View bids on products
- Track transactions

### 💰 Buyer Features
- Browse auction products
- Place bids
- View bidding history
- Manage purchased items

### 📦 Auction Management
- Real-time bidding system
- Bid tracking
- Transaction records
- Receipt generation

---

## 🏗️ Project Structure

```
Online-Auction-System/
│
├── client/                 # Frontend (React + Tailwind)
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── tailwind.config.js
│
├── server/                 # Backend (Node.js + Express)
│   ├── config/
│   │   └── db.js
│   ├── controller/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   └── package.json
│
├── database/
│   └── dbms.sql
│
├── docker-compose.yml
└── README.md
```

---

## 🛠️ Technologies Used

<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="45"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="45"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="45"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" width="45"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="45"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" width="45"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="45"/>
</p>

React • Node.js • Express.js • MySQL • JavaScript • Tailwind CSS • Docker

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/online-auction-system.git
```

### 2️⃣ Setup Backend
```bash
cd server
npm install
```

Create a `.env` file using `.env.example` and configure:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=auction_db
JWT_SECRET=your_secret_key
```

Run the backend:
```bash
npm start
```

---

### 3️⃣ Setup Frontend
```bash
cd client
npm install
npm start
```

---

### 🐳 Run with Docker (Optional)

```bash
docker-compose up --build
```

---

## 🎯 Project Purpose

This project demonstrates:

- Full-stack development skills
- REST API development
- Authentication & authorization
- Database integration
- Role-based access control
- Docker containerization

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by **Jayesh Hegde**

If you like this project, consider giving it a ⭐ on GitHub!

