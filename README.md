# 📚 Book Store Application

A full-stack online book store built with the **MERN stack** (MongoDB, Express.js, React, Node.js). The platform features a secure dual-module system for both admins and customers, backed by JWT authentication and a modern Material UI interface.

---

## 🚀 Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React.js, Material UI, Axios      |
| Backend    | Node.js, Express.js               |
| Database   | MongoDB, Mongoose                 |
| Auth       | JSON Web Tokens (JWT)             |

---

## ✨ Features

### 🔐 Admin Module
- **Secure Admin Portal** — Dedicated admin login secured with JWT-based authentication; all API access is authorized and protected.
- **Book Management Hub** — Add, update, or remove books from the inventory with full control over the catalog.
- **Order Tracking** — View and manage all customer orders from a single centralized interface.
- **File Uploads** — Admins can upload book cover images directly through the platform.

### 🛍️ Customer Module
- **Protected Customer Login** — Secure customer access via JWT-based token generation for a safe shopping environment.
- **Book Browsing Experience** — Navigate a diverse book catalog on an intuitive dashboard designed for smooth browsing.
- **Streamlined Shopping Cart** — Add multiple books to the cart simultaneously for an efficient shopping experience.
- **Simplified Checkout** — Effortlessly place orders after selecting items with a convenient checkout flow.
- **Order History** — View a comprehensive history of all past purchases at any time.

### 🎨 User-Centric Design
Built with **Material UI**, delivering a modern, visually appealing interface that emphasizes ease of use. Every component is crafted for a seamless and enjoyable user experience aligned with current design standards.

---

## 📁 Folder Structure

```
E-BOOK PROJECT/
│
├── Backend/
│   └── src/
│       ├── controller/
│       │   ├── admin/
│       │   │   └── bookController.js        # Admin book CRUD logic
│       │   └── customer/
│       │       ├── bookController.js        # Customer book browsing logic
│       │       └── authController.js        # Customer auth logic
│       │
│       ├── middleware/
│       │   └── authMiddleware.js            # JWT verification & role guard
│       │
│       ├── models/
│       │   ├── Book.js
│       │   ├── Cartitem.js
│       │   ├── Order.js
│       │   └── user.js
│       │
│       ├── routes/
│       │   ├── admin/
│       │   │   └── bookRoute.js
│       │   ├── auth/
│       │   │   └── authRoute.js
│       │   └── customer/
│       │       └── bookRoute.js
│       │
│       ├── services/
│       │   ├── admin/
│       │   │   └── bookService.js
│       │   ├── auth/
│       │   │   └── authService.js
│       │   └── customer/
│       │       └── bookService.js
│       │
│       ├── utils/
│       │   └── common.js
│       ├── app.js
│       ├── .env
│       └── package.json
│
└── frontend/
    ├── public/
    └── src/
        ├── environment/
        │   └── axiosInstance.js             # Axios base config
        │
        ├── pages/
        │   ├── Admin/
        │   │   ├── components/
        │   │   │   ├── dashboard/
        │   │   │   │   └── adminDashboard.js
        │   │   │   ├── post-book/
        │   │   │   │   └── PostBook.js
        │   │   │   ├── update-book/
        │   │   │   │   └── UpdateBook.js
        │   │   │   └── view-orders/
        │   │   │       └── ViewOrders.js
        │   │   └── service/
        │   │       └── admin.js
        │   │
        │   ├── auth/
        │   │   ├── components/
        │   │   │   ├── signin/
        │   │   │   │   └── Signin.js
        │   │   │   └── signup/
        │   │   │       └── Signup.js
        │   │   └── services/auth/
        │   │       └── auth.js
        │   │
        │   └── customer/
        │       ├── components/
        │       │   ├── cart/
        │       │   │   └── cart.js
        │       │   ├── dashboard/
        │       │   │   └── customerDashboard.js
        │       │   └── my-orders/
        │       │       └── MyOrders.js
        │       ├── service/
        │       └── header/
        │           └── Header.js
        │
        ├── utils/
        ├── App.js
        ├── App.css
        ├── index.js
        └── index.css
```

---

## ⚙️ Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/your-username/bookstore-app.git
cd bookstore-app
```

### 2. Set up environment variables

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

### 3. Install dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 4. Run the application

```bash
# Start the backend (from /server)
npm run dev

# Start the frontend (from /client)
npm start
```

The backend runs on `http://localhost:5000` and the frontend on `http://localhost:3000`.

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

> 🔒 Protected routes require a Bearer token in the `Authorization` header:
> ```
> Authorization: Bearer <your_jwt_token>
> ```

---

### 🔐 Auth Routes — `/api/auth`

| Method | Endpoint          | Description                  | Auth Required |
|--------|-------------------|------------------------------|---------------|
| POST   | `/admin/register` | Register a new admin         | No            |
| POST   | `/admin/login`    | Admin login — returns JWT    | No            |
| POST   | `/register`       | Register a new customer      | No            |
| POST   | `/login`          | Customer login — returns JWT | No            |

**Login — Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  "user": {
    "_id": "64abc...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin"
  }
}
```

---

### 📖 Book Routes — `/api/books`

| Method | Endpoint  | Description                          | Auth Required  |
|--------|-----------|--------------------------------------|----------------|
| GET    | `/`       | Get all books                        | No             |
| GET    | `/:id`    | Get a single book by ID              | No             |
| POST   | `/`       | Add a new book (with image upload)   | Yes (Admin)    |
| PUT    | `/:id`    | Update book details or image         | Yes (Admin)    |
| DELETE | `/:id`    | Remove a book from inventory         | Yes (Admin)    |

**Add Book — Request Body:**
```json
{
  "title": "The Pragmatic Programmer",
  "author": "Andrew Hunt",
  "price": 799,
  "description": "A guide to software craftsmanship.",
  "category": "Technology",
  "stock": 30,
  "imageUrl": "https://your-image-url.com/book.jpg"
}
```

---

### 🛒 Cart Routes — `/api/cart`

| Method | Endpoint       | Description                    | Auth Required |
|--------|----------------|--------------------------------|---------------|
| GET    | `/`            | Get current customer's cart    | Yes           |
| POST   | `/add`         | Add a book to the cart         | Yes           |
| DELETE | `/remove/:id`  | Remove a book from the cart    | Yes           |

---

### 📦 Order Routes — `/api/orders`

| Method | Endpoint      | Description                          | Auth Required    |
|--------|---------------|--------------------------------------|------------------|
| POST   | `/`           | Place a new order (checkout)         | Yes (Customer)   |
| GET    | `/my-orders`  | Get order history for logged-in user | Yes (Customer)   |
| GET    | `/all`        | View all customer orders             | Yes (Admin)      |
| GET    | `/:id`        | Get a specific order by ID           | Yes              |

---

## 🌱 Environment Variables Reference

| Variable         | Description                        |
|------------------|------------------------------------|
| `PORT`           | Port for the Express server        |
| `MONGO_URI`      | MongoDB connection string          |
| `JWT_SECRET`     | Secret key for signing JWTs        |
| `JWT_EXPIRES_IN` | Token expiry duration (e.g. `7d`)  |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
