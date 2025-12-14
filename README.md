

# 🍬 Sweet Shop Management System - Frontend

> A modern, responsive React-based user interface for the Sweet Shop Management System.

This frontend application interacts with the Spring Boot backend to provide a seamless experience for both customers and administrators. It features a secure login system, a dynamic sweet catalog, and an inventory management dashboard, styled with **Tailwind CSS**.

-----

## 🚀 Features

  * **Authentication & Security:**
      * User & Admin Login pages.
      * JWT Token handling (storage and automatic attachment to requests).
      * Protected Routes (restricting access to Admin-only pages).
  * **Sweet Catalog:**
      * View available sweets.
      * Search/Filter functionality.
  * **Admin Dashboard:**
      * Add, Update, and Delete sweets.
      * **Restock Inventory:** Increase stock levels.
  * **User Operations:**
      * **Purchase Sweets:** Simulate purchasing (reduces backend stock).
  * **State Management:** Centralized Auth Context for managing user sessions.

-----

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | React.js |
| **Styling** | Tailwind CSS |
| **Routing** | React Router DOM |
| **HTTP Client** | Axios |
| **Auth Utils** | JWT Decode |
| **Build Tool** | Vite (or Create React App) |
| **Node Version** | Node v16+ |

-----

## 📂 Project Structure

```text
src
 ├── api             # API configuration
 │   └── axios.js
 ├── assets          # Static assets (images, global styles)
 ├── components      # Reusable UI Components
 │   ├── Navbar.jsx
 │   ├── RestockModal.jsx
 │   ├── SweetCard.jsx
 │   └── SweetFormModal.jsx
 ├── context         # Global State
 │   └── AuthContext.jsx
 ├── pages           # Application Views (Routes)
 │   ├── Dashboard.jsx
 │   ├── Login.jsx
 │   └── Register.jsx
 ├── App.jsx         # Main Application Component
 ├── main.jsx        # Entry Point (DOM Rendering)
 └── vite.config.js  # Vite Configuration
```

-----

## ⚙️ Environment Configuration

Create a `.env` file in the root directory to configure the connection to your Spring Boot backend.

```properties
# Base URL for the Spring Boot Backend
VITE_API_BASE_URL=http://localhost:8080/api

# If using Create React App, use REACT_APP_ instead of VITE_
# REACT_APP_API_BASE_URL=http://localhost:8080/api
```

-----

## 🏃‍♂️ Running the Application Locally

### Prerequisites

  * Node.js installed
  * The Backend Spring Boot application running on port `8080`

### Steps

1.  **Install Dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

2.  **Start the Development Server**

    ```bash
    npm run dev
    # or
    npm start
    ```

3.  **Access the Application**
    Open your browser and navigate to:

      * `http://localhost:5173` (if using Vite)
      * `http://localhost:3000` (if using Create React App)

-----

## 🔌 API Integration

This frontend uses **Axios** to communicate with the backend.

  * **Public Endpoints:** Accessible without a token (Login, Register, View Sweets).
  * **Private Endpoints:** An **Axios Interceptor** is used to automatically attach the `Authorization: Bearer <token>` header to requests that require authentication (Admin operations, Purchasing).

-----

## 🤖 AI Usage Disclosure

**AI Tools Used:** ChatGPT

**How AI Was Used:**

1.  **Component Structure:** Generated boilerplate code for complex React components like the Admin Dashboard table.
2.  **Styling:** Suggested Tailwind CSS utility classes for responsive design.
3.  **State Logic:** Assisted in debugging the `AuthContext` provider and `useEffect` hooks for token persistence.
4.  **Error Handling:** Helped create a standard error handling mechanism for failed API requests.

**What AI Did Not Do:**

  * AI did not define the specific business rules (e.g., who can restock vs. who can buy).
  * The integration of the frontend with the specific backend endpoints was done manually.

-----

## 👨‍💻 Author

**Abhishek**
*Full Stack Developer*

  * **Skills:** React, Spring Boot, Docker, Tailwind CSS
  * **Focus:** creating seamless end-to-end web applications.
