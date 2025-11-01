# XploitSim - Broken Access Control (Sandbox)

**DANGER:** This server intentionally contains vulnerabilities for educational purposes (IDOR, missing authorization, privilege escalation).

Safety rules:
- This server refuses to run unless `SANDBOX=1` and `NODE_ENV` is not `production`.
- Run only locally or in an isolated environment.
- Do not expose to the public Internet.

Use `npm run db:init` then `npm run db:seed` to create and seed the database.
Start the server with `npm start`.
