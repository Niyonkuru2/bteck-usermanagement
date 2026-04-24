# B-TECH Full-Stack Developer Practical Test — Backend

##  Overview

This project is a **mini admin panel backend** built with **Node.js and Express**, implementing all required Tier 1 and Tier 2 features:

###  Implemented Features

####  Tier 1 (Core — Mandatory)

* User CRUD (Create, Read, Update, Delete)
* SQLite database (auto-initialized)
* Protobuf export (`/user/users/export`)  **MANDATORY REQUIREMENT**
* Cryptographic signing (RSA-2048 + SHA-384)
* Public key exposure (JWK format)
* User graph endpoint (last 7 days)

####  Tier 2 (Authentication)

* Google OAuth 2.0 login (Passport.js)
* JWT issuance
* Protected API endpoints

---

##  Tech Stack

* **Backend:** Node.js, Express
* **Database:** SQLite (file-based, no setup required)
* **Authentication:** Passport.js (Google OAuth 2.0), JWT
* **Serialization:** protobufjs
* **Crypto:** Node.js `crypto` module (RSA-2048, SHA-384)

---

##  Setup Instructions

### 1. Clone & Install

```bash
git clone <repo-url>
cd backend
npm install
```

### 2. Environment Variables

Create `.env` file:

```env
PORT=5000
JWT_SECRET=your_secret

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
```

>  A `.env.example` file is included (without values as required).

---

### 3. Run the Server

```bash
npm run dev
```

Server will start on:

```
http://localhost:5000
```

---

##  Database

* SQLite database file: `database.sqlite`
* Automatically created on startup
* No manual setup required

---

##  Cryptography Implementation

###  Algorithm Choice

* **RSA-2048** for signing
* **SHA-384** for hashing email

### Process

On user creation:

1. Email is hashed using SHA-384
2. Hash is signed using RSA private key
3. Both `emailHash` and `signature` are stored in DB

###  Key Management

* Keys generated at server startup if not present
* Stored in `/keys` directory
* Public key exposed via API as JWK

---

##  Authentication Flow

1. User visits:

   ```
   /auth/google
   ```
2. Redirected to Google login
3. On success:

   * User is created (if not exists)
   * JWT is issued
4. Token must be used in:

   ```
   Authorization: Bearer <token>
   ```

---

## API Endpoints

###  Auth Routes

#### `GET /auth/google`

Redirect to Google OAuth login

#### `GET /auth/google/callback`

Returns:

```json
{
  "token": "JWT_TOKEN"
}
```

---

#### `GET /auth/public-key`

Returns public key (JWK):

```json
{
  "kty": "...",
  "n": "...",
  "e": "..."
}
```

---

### User Routes (Protected)

> Base path: `/user`

All routes require:

```
Authorization: Bearer <token>
```

---

###  Create User

#### `POST /user/users`

```json
{
  "email": "test@example.com",
  "role": "user",
  "status": "active"
}
```

Response:

```json
{
  "id": "...",
  "email": "test@example.com",
  "role": "user",
  "status": "active"
}
```

---

###  Get All Users

#### `GET /user/users`

Response:

```json
[
  {
    "id": "...",
    "email": "...",
    "role": "...",
    "status": "...",
    "createdAt": "...",
    "emailHash": "...",
    "signature": "..."
  }
]
```

---

### Get Single User

#### `GET /user/users/:id`

---

### Update User

#### `PUT /user/users/:id`

---

###  Delete User

#### `DELETE /user/users/:id`

---

###  Protobuf Export (CRITICAL)

#### `GET /user/users/export`

Headers:

```
Accept: application/x-protobuf
```

Response:

* Binary Protobuf (`UserList`)
* Content-Type: `application/x-protobuf`

---

###  User Graph

#### `GET /user/users/graph`

Response:

```json
[
  { "date": "2026-04-17", "count": 2 },
  { "date": "2026-04-18", "count": 0 },
  { "date": "2026-04-19", "count": 1 }
]
```

* Last 7 days
* Includes zero-count days
* Sorted chronologically

---

## What Has Been Fully Implemented

*   RESTful user management
*   Persistent SQLite database
*   Protobuf serialization & endpoint
*   RSA-based signing and verification support
*   Public key exposure
*   Google OAuth login
*   JWT protection middleware
*   Graph analytics endpoint

---

##  Known Limitations / Trade-offs

Being transparent as required:

* ❗ No pagination implemented yet on `/user/users`
* ❗ Input validation is minimal (could be improved with Joi/Zod)
* ❗ No rate limiting or security hardening (helmet, etc.)
* ❗ JWT stored in response body (frontend should secure it)
* ❗ No refresh token mechanism
* ❗ Error handling could be more structured (centralized middleware)

---

##  Testing Notes

* Use browser for Google OAuth:

  ```
  http://localhost:5000/auth/google
  ```

* Use Postman/Thunder Client for protected routes

---

##  Important Files

* `src/services/crypto.service.js` → signing logic
* `src/services/protobuf.service.js` → Protobuf encoding
* `src/proto/user.proto` → schema definition
* `src/middleware/auth.middleware.js` → JWT protection

---

##   Final Notes

This implementation prioritizes:

*  Correctness of **Protobuf export (mandatory requirement)**
*  Proper **cryptographic integrity validation**
*  Clean and modular architecture

---

##  Ready for Frontend Integration

---

**Author:** Samuel Niyonkuru
**Email:** [niyonkurusam5@gail.com](mailto:niyonkurusam5@gail.com)
