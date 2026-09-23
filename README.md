<h1 align="center">✦ Eventara</h1>

<p align="center">
  <b>A full-stack event discovery and seat booking platform built with the MERN stack.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
</p>

---

## 📖 About

**Eventara** lets users browse upcoming events by category, view event details, and reserve seats through an interactive seat map. Signed-in users can create and edit events, and every booking updates seat availability in real time from the database.

## ✨ Features

- 🔐 **User authentication** with registration and login, using bcrypt password hashing and JWT tokens
- 🗂️ **Category browsing** on the home page, with events grouped and filterable by category
- 📄 **Event details page** showing date, category, description, price and live seat availability
- 💺 **Interactive seat booking** on a 40-seat grid, with booked seats locked and a running total in ₹
- ➕ **Create events** with a live preview as you type
- ✏️ **Edit events** to update title, date, category, image, description and price
- 📱 **Responsive design** with a mobile navigation drawer

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, React Router 7, custom CSS |
| **Backend** | Node.js, Express 5 |
| **Database** | MongoDB with Mongoose |
| **Auth** | JSON Web Tokens (JWT), bcryptjs |

## 📁 Project Structure

```
Eventara/
├── client/                  # React frontend
│   └── src/
│       ├── components/
│       │   └── Navbar.js
│       ├── pages/
│       │   ├── Home.js          # Event listing by category
│       │   ├── Login.js
│       │   ├── Register.js
│       │   ├── AddEvent.js      # Create an event
│       │   ├── EditEvent.js     # Update an event
│       │   ├── EventDetails.js
│       │   └── EventPage.js     # Seat selection and booking
│       └── App.js               # Routes
│
└── server/                  # Express backend
    ├── models/
    │   ├── User.js
    │   └── Event.js
    ├── routes/
    │   ├── authRoutes.js
    │   └── eventRoutes.js
    └── index.js                 # Server entry point
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [MongoDB](https://www.mongodb.com/try/download/community) running locally on port `27017`

### 1. Clone the repository

```bash
git clone https://github.com/Ankitha-Kulkarni/Eventara.git
cd Eventara
```

### 2. Start the backend

```bash
cd server
npm install
node index.js
```

The server runs at `http://localhost:5000` and connects to a local MongoDB database named `eventify`.

### 3. Start the frontend

Open a new terminal:

```bash
cd client
npm install
npm start
```

The app opens at `http://localhost:3000`.

## 🔌 API Endpoints

### Auth

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Create a new account |
| `POST` | `/auth/login` | Log in and receive a JWT |

### Events

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/events` | Get all events |
| `GET` | `/events/:id` | Get a single event |
| `POST` | `/events` | Create an event |
| `PUT` | `/events/:id` | Update an event |
| `POST` | `/events/book/:id` | Book seats. Body: `{ "seats": [0, 1, 2] }` |

## 🗃️ Data Models

**User:** `name`, `email` (unique), `password` (hashed), timestamps

**Event:** `title`, `date`, `category`, `image`, `description`, `price` (default ₹200), `seats` (40 seats, each booked or free)

## 🗺️ Roadmap

- [ ] Add a `DELETE /events/:id` route to support the delete button
- [ ] Protect create, edit and booking routes with JWT middleware
- [ ] Move the JWT secret and MongoDB URL into a `.env` file
- [ ] Add a "My Bookings" page for users
- [ ] Add image uploads with Multer
- [ ] Deploy the frontend and backend

## 👩‍💻 Author

**Ankitha G Kulkarni**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Ankitha-Kulkarni)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ankitha-kulkarni-a073a5293/)

<p align="center">⭐ If you like this project, consider giving it a star!</p>
