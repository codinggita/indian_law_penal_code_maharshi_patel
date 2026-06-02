# 🏛️ Indian Penal & Legal Framework API

<div align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjRlaTNweG0xYW5yYzhocWNkZGFxbm14NmlmNm0ycTNkcjhlZDFxayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPzVXlzFz8xV84g/giphy.gif" alt="Law Giphy" width="100%">
</div>

## 📖 Comprehensive Overview

The **Indian Penal & Legal Framework API** is a robust, scalable, and highly detailed RESTful backend service built for legal technology platforms, researchers, and law students. It acts as a centralized repository and data provider for the Indian Penal Code (IPC), various legal acts, sections, courts, and offenses. 

The primary goal of this system is to transform raw legal datasets into highly structured, searchable, and filterable endpoints, enabling frontend applications to easily display legal records, analyze crime categories, and track updates to laws. 

---

## ✨ Core System Features

### 🔍 Advanced Search & Querying
- Fast keyword-based search across legal titles, descriptions, and categories.
- Combine search with multiple filters (e.g., search for "fraud" in the state of "Maharashtra").

### 📊 Dynamic Filtering & Sorting
- Filter records by Acts, Chapters, Sections, States, Courts, and Offense Categories.
- Sort laws dynamically by views, popularity, creation date, or section numbers.

### 🛡️ Robust Authentication & Security
- Secure, token-based authentication using **JSON Web Tokens (JWT)**.
- Secure route protection, OTP flows, and role-based access control (Admin vs. User).
- Protection against API abuse with **Rate Limiting** middleware.

### 📈 Data Aggregation & Analytics
- Deep dive analytics tracking the most viewed, bookmarked, and trending laws.
- Court and state-level statistical breakdowns powered by **MongoDB Aggregation Pipelines**.

### 🧩 Industry Standard Architecture
- Built on a strict **MVC (Model-View-Controller)** pattern.
- Clean separation of concerns with isolated routes, controllers, and services.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **Node.js** | High-performance, event-driven JavaScript runtime environment. |
| **Express.js** | Fast, unopinionated web framework for routing and middleware. |
| **MongoDB** | NoSQL database for scalable and flexible legal document storage. |
| **Mongoose** | Elegant object data modeling (ODM) for MongoDB and schema validation. |
| **JWT** | Secure JSON Web Tokens for stateless authentication sessions. |
| **Bcrypt.js** | Strong hashing algorithm for secure password storage. |
| **Dotenv** | Zero-dependency module that loads environment variables. |

---

## 📂 Project Architecture & Structure

The repository follows a clean monolithic MVC structure. All backend logic resides inside the `/backend` folder to keep the codebase highly organized.

```text
📦 indian_law_penal_code_dhruv_ozha
 ┣ 📂 backend
 ┃ ┣ 📂 config          # Environment configs, MongoDB connection setups
 ┃ ┣ 📂 controllers     # Request/Response logic (e.g., LawController, AuthController)
 ┃ ┣ 📂 middlewares     # JWT verification, Error Handling, Rate Limiting, CORS
 ┃ ┣ 📂 models          # Mongoose Schemas (Law, User, Analytics)
 ┃ ┣ 📂 routes          # API Endpoints mapped to specific controllers
 ┃ ┗ 📂 services        # Core business logic and direct database queries
 ┗ 📜 README.md         # Comprehensive Project documentation
```

---

## 🌐 Extensive API Routing Directory

The API provides over 50+ specialized endpoints. Below is a high-level summary of the available resources.

### 📜 Core Legal Records (CRUD)
- `GET /api/v1/laws` - Fetch all legal records (paginated).
- `GET /api/v1/laws/:id` - Fetch specific law details.
- `GET /api/v1/laws/trending` - Discover currently trending legal sections.
- `GET /api/v1/laws/archived` - Access historical/archived laws.

### 🔎 Search & Discovery
- `GET /api/v1/search/laws?q=cybercrime` - Global keyword search.
- `GET /api/v1/laws/filter/act/:actName` - Filter by specific acts (e.g., IPC).
- `GET /api/v1/laws/filter/category/:category` - Filter by crime type.

### 📊 Analytics & Statistics
- `GET /api/v1/analytics/laws/most-viewed` - Analyze top laws.
- `GET /api/v1/stats/laws/count` - Complete database statistics overview.
- `GET /api/v1/analytics/laws/by-state` - Geographical distribution of laws.

### 🔐 Authentication & Identity
- `POST /api/v1/auth/register` & `/login` - Standard User Authentication.
- `POST /api/v1/auth/reset-password` - Secure password recovery flow.
- `GET /api/v1/jwt/profile` - JWT-protected user data retrieval.

### 👑 Admin & System Controls
- `GET /api/v1/admin/users` - Global user management.
- `PATCH /api/v1/admin/users/:id/ban` - Restrict malicious users.
- `GET /api/v1/admin/system/health` - Monitor live server health.

---

## 🚦 Getting Started & Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd indian_law_penal_code_dhruv_ozha/backend
   ```

2. **Initialize Node & Install Dependencies**
   ```bash
   npm init -y
   npm install express mongoose dotenv cors jsonwebtoken bcrypt
   ```

3. **Environment Setup**
   Create a `.env` file in the root of the `backend` folder and add:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   ```

4. **Start the Development Server**
   ```bash
   node server.js
   # Or using nodemon: npm run dev
   ```

---

## 🚀 Development Roadmap & Progress Tracker

This project is currently being developed over a comprehensive **23-Part Journey**. Here is our live progress:

- [x] **Part 1:** Project Initialization & Documentation
- [x] **Part 2:** Node & Express Setup
- [x] **Part 3:** MongoDB Configuration
- [x] **Part 4:** Dataset Analysis & Schema Planning
- [x] **Part 5:** Schema Implementation
- [x] **Part 6:** Core CRUD - Create & Read
- [x] **Part 7:** Core CRUD - Update & Delete
- [x] **Part 8:** Advanced Law APIs
- [x] **Part 9:** Pagination Routes
- [x] **Part 10:** Sorting Routes
- [x] **Part 11:** Search Routes
- [x] **Part 12:** Filtering Routes
- [x] **Part 13:** Advanced Combination Queries
- [x] **Part 14:** Authentication Setup & Models
- [x] **Part 15:** Basic Auth APIs
- [x] **Part 16:** Advanced Auth APIs
- [x] **Part 17:** Middleware Practice Implementation
- [x] **Part 18:** Admin Routes
- [x] **Part 19:** Analytics & Statistics
- [x] **Part 20:** Request Validation & Error Handling
- [x] **Part 21:** Additional API Methods (HEAD & OPTIONS)
- [x] **Part 22:** Good to Have Features (Bonus)
- [x] **Part 23:** Data Seeding & Finalization

<div align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHhzYW84amkwbXJub3E0d2Y3cHgzeG1xYmVwbDJ3eGk0ZGVyeXJzeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26h0pHNtHKjmDo4WQ/giphy.gif" alt="Coding GIF" width="400px">
</div>
