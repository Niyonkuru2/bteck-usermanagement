# B-Tech Full-Stack Practical Test

**Mini Admin Dashboard — User Management System**

---

##  Overview

This project is a full-stack admin panel built using **Next.js (frontend)** and **Node.js/Express (backend)**.

It implements all required features:

*  Google OAuth 2.0 authentication
*  User CRUD (Create, Read, Update, Delete)
*  User growth graph (last 7 days)
*  Protobuf-based API (binary serialization)
*  Cryptographic signing & verification

---

##  Tech Stack

### Frontend

* Next.js (App Router)
* Tailwind CSS
* TanStack Query
* Recharts
* protobufjs
* Axios

### Backend

* Node.js + Express
* SQLite
* Passport.js (Google OAuth 2.0)
* JWT Authentication
* protobufjs
* Node `crypto` (RSA)

---

## Project Structure

```
client/   → Frontend (Next.js)
server/   → Backend (Express)
```

---

# Setup Instructions

## 1. Clone Repository

```
git clone <https://github.com/Niyonkuru2/bteck-usermanagement.git>
```

---

## 2. Backend Setup

```
cd server
npm install
```

### Create `.env`

```
PORT=5000
JWT_SECRET=supersecret
FRONTEND_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
```

### Run backend

```
npm run server
```

---

## 3. Frontend Setup

```
cd client
npm install
npm run dev
```

---

#  Authentication

### Method Used:

**Google OAuth 2.0 (Required)**

### Flow:

1. User clicks **Sign in with Google**
2. Backend authenticates via Passport.js
3. JWT is generated
4. JWT is stored in a **HttpOnly cookie**
5. User is redirected to `/dashboard`

---

##  JWT Storage Decision

###  Chosen: HttpOnly Cookies

### Pros:

* Prevents XSS attacks
* Automatically sent with requests
* More secure than localStorage

### Cons:

* Requires `withCredentials: true`
* Harder to debug
* Needs proper CORS configuration

---

##  Route Protection

Implemented using **Next.js middleware**:

* Unauthenticated → redirected to `/login`
* Authenticated → redirected to `/dashboard`

---

#  User Management

### Endpoints

| Method | Endpoint     | Description                 |
| ------ | ------------ | --------------------------- |
| GET    | /user        | Paginated users             |
| POST   | /user        | Create user                 |
| PUT    | /user/:id    | Update user                 |
| DELETE | /user/:id    | Delete user                 |
| GET    | /user/export | Protobuf export (paginated) |
| GET    | /user/graph  | User graph                  |

---

# Protobuf Implementation

### Endpoint:

```
GET /user/export?page=1&limit=10
```

### Features:

* Binary response (`application/x-protobuf`)
* Pagination supported via headers:

  * `X-Total`
  * `X-Page`
  * `X-Limit`
  * `X-Total-Pages`
* Frontend decodes using `protobufjs`

---

## Why Protobuf?

* Smaller payload size than JSON
* Faster transmission
* Strong schema enforcement

---

# Cryptographic Signing & Verification

## Algorithm Chosen:

**RSA-2048 with SHA-384 (RSA-SHA384)**

### Why?

* Strong and widely used
* Meets security requirements
* Supported by Node.js and Web Crypto API

---

## Backend Process

On user creation:

1. Hash email using SHA-384
2. Sign hash using RSA private key
3. Store:

   * `emailHash` (bytes)
   * `signature` (bytes)

---

## Frontend Verification

1. Fetch public key (`/auth/public-key`)
2. Decode Protobuf users
3. Verify signature using Web Crypto API
4. Display result:

*  Valid (green badge)
*  Invalid (red badge)

---

#  User Graph

* Shows last 7 days of user registrations
* Includes days with zero users
* Updates automatically after creating and deletes a user
* Built using Recharts

---

#  Assumptions

* Email is unique per user
* SQLite is sufficient for lightweight storage
* JWT expiration is handled server-side

---

# 🐞 Known Limitations

* No role-based access control in UI
* Minimal error UI (can be improved)
* No refresh token implementation
* Pagination UI is basic

---

#  Testing

Manually tested:

* Google login flow
* JWT authentication
* CRUD operations
* Protobuf decoding
* Signature verification

---

#  Deployment Live Project Links

* Frontend: Vercel [https://bteck-usermanagement.vercel.app/](https://bteck-usermanagement.vercel.app/)

* Backend: Render [/ https://bteck-usermanagement.onrender.com](https://bteck-usermanagement.onrender.com)

---

# Notes

* All Tier 1 and Tier 2 requirements implemented
* Protobuf + Crypto fully functional
* Code structured for scalability

---

##  Author

NIYONKURU samuel

---
