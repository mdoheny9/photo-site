# photo-site
Full stack social platform (work in progress⚠️)

## Tech Stack
- Frontend: React, Node.js
- Backend: MongoDB, Express
- Authentication: JWT, bcrypt (validated by Cypress)
## Setup
1. Install [Docker Desktop](https://docs.docker.com/get-started/introduction/get-docker-desktop/)
2. Create .env file in `/backend` containing the following:
```
CONNECTION_STRING=ambigious_db_connection_string
JWT_SECRET=ambiguous_jwt_secret
```
4. Start the app using `docker compose up` in the root directory
5. Open the app at http://localhost:3000 😬
