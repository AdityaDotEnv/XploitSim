# Cryptographic Failures - Sandbox (LOCAL ONLY)

WARNING: This server is intentionally insecure. Do NOT deploy or expose to the internet.

- Purpose: educational demo showing weak hashing, static-key encryption, weak JWT practices.
- Run only in local/isolated environment.

Start:

1. From the demo folder:
   - `npm install`
   - `npm run init-db`
   - `npm run seed`
   - `npm start`

2. Demo endpoints:
   - POST /auth/login  { username, password }
   - POST /crypto/hash-md5 { text }
   - POST /crypto/encrypt-static { text }
   - POST /crypto/decrypt-static { ciphertext }
   - POST /users/:id/store-secret { secret }
   - GET  /users/:id/secret
   - POST /crypto/verify-jwt { token }

