
Legal Records REST API
A Node.js (>=v18) and Express-based RESTful API for managing legal records (laws), storing data in MongoDB with Mongoose ODM, and securing endpoints using JWT-based authentication. It implements full CRUD operations on law documents, along with advanced features such as search, filtering, pagination, sorting, and analytics (e.g. most-viewed or trending laws). All endpoints are documented (e.g. via Postman) and the code follows a MVC architecture (models/controllers/services) for clarity and scalability
. Development uses standard tools like Morgan for request logging and dotenv for configuration; the architecture is illustrated in diagrams below.

Table of Contents
What I'm Using
Data
Architecture & Implementation
API Reference
Setup & Installation
Running & Testing
Deployment
Contributing
License
Contact
What I'm Using
The project stack includes the following major technologies and libraries:

Node.js (v18+) – JavaScript runtime for the backend server (official docs recommend Node 18 or higher)
.
Express.js – Web framework for routing and middleware (installed via npm install express
).
MongoDB – NoSQL document database for persistence; accessed via Mongoose ODM.
Mongoose (v9.x) – Object Data Modeling (ODM) library for MongoDB (install with npm install mongoose
). Schemas define data structure and validation (e.g. new mongoose.Schema({ name: String })
).
jsonwebtoken – JWT auth library (install with npm install jsonwebtoken
) for generating and verifying tokens.
Morgan – HTTP request logger middleware (npm install morgan
) for access logs (developer mode).
dotenv – Loads environment variables from a .env file for configuration (e.g. database URI, JWT secret).
cors – Enables Cross-Origin Resource Sharing for the API.
nodemon (dev) – Automatically restarts server in development.
Postman – Used for API documentation and testing (collection of requests exported).
Each part follows a clear separation of concerns: Mongoose models define database schemas, controllers handle HTTP request/response logic, and services (or the models directly) contain business logic. This MVC pattern makes the code easy to maintain
.

Data
The backend ingests a JSON dataset of legal records and maps it to MongoDB collections. The primary data entity is Law (or legal record), which might include fields such as _id, title, content, chapter, section, state, category, isArchived, createdAt, etc. (Exact schema fields are UNSPECIFIED and should be defined based on the dataset.) Below is an illustrative example of a law document in JSON:

json
Copy
{
  "_id": "60b8c1d2f3a6b91a2c7d4e5f",
  "title": "Cybercrime Act",
  "chapter": "Information Technology",
  "section": 66,
  "state": "National",
  "content": "Any person who causes damage to computer systems or data...",
  "category": "Cyber Crime",
  "enactedDate": "2000-10-16",
  "isArchived": false,
  "createdAt": "2023-06-01T12:00:00.000Z",
  "updatedAt": "2024-01-10T08:30:00.000Z"
}
Storage/Persistence: Data is stored in MongoDB collections (e.g. a laws collection). Mongoose schemas define types and basic validation (e.g. required fields, string vs number, enums)
. Further input validation (e.g. with express-validator) and error checking are applied in controllers to ensure data integrity.

Architecture & Implementation
The API is a monolithic Node.js/Express application following standard MVC principles
. At a high level, clients send HTTP requests to Express routes, which are handled by controller functions. Controllers invoke service/model methods that query or update MongoDB via Mongoose, then return JSON responses. Middleware (e.g. authentication, logging) runs between the request and controller. The high-level flow is visualized below (GitHub supports Mermaid diagrams in Markdown
):

mermaid
Copy
flowchart LR
    Client -->|HTTP| ExpressServer[Server (Express)]
    ExpressServer -->|Router| Controller
    Controller -->|Service/Model| Database[(MongoDB)]
    Database -->|Data| Controller
    Controller -->|JSON response| ExpressServer
    ExpressServer -->|HTTP| Client
In this diagram, the ExpressServer includes middlewares (e.g. auth, CORS, logging). The Controller layer handles request parsing and response formatting, while the Service/Model layer contains business logic and Mongoose database operations. Environment variables (e.g. database URI, JWT secret) are injected via a .env file (using dotenv) so that sensitive settings are not hardcoded.

For example, a request to fetch a specific law might proceed as follows:

mermaid

Show diagram
Copy
sequenceDiagram
    participant C as Client
    participant API as API Server
    participant DB as MongoDB
    C->>API: GET /api/v1/laws/60b8c1d2...
    API->>API: (Auth middleware checks JWT token)
    API->>API: (Input validation)
    API->>API: (Route handler invoked)
    API->>DB: db.laws.findById("60b8c1d2...")
    DB-->>API: { ...law document... }
    API->>C: HTTP 200 OK (law JSON)
This sequence shows the client sending a GET request, the server verifying the JWT and validating parameters, querying the database, and then responding with the law object.

API Reference
All API endpoints are under the base path /api/v1. Below is a summary of key routes; each is prefixed with /api/v1 and typically requires a JSON body for POST/PUT and returns JSON.

Laws (Legal Records)
GET /api/v1/laws – Fetch all laws (with optional pagination & sorting).

Query Params (optional): page, limit (for pagination), sort (e.g. ?sort=createdAt or ?sort=-title).
Response (200): Array of law objects (JSON). Supports pagination: e.g. /laws?page=2&limit=10.
Errors: 400 Bad Request (invalid params), 500 Internal Server Error.
POST /api/v1/laws – Create a new law record.

Auth: Requires valid JWT (e.g. admin user).
Request Body: JSON with law fields (e.g. { "title": "Example", "content": "..." }).
Response: 201 Created with the created law object (including its _id and timestamps).
Errors: 400 if required fields missing/invalid, 401 Unauthorized if no token, 500 for server error.
GET /api/v1/laws/:id – Fetch a law by its ID.

Path Param: id (MongoDB ObjectId of the law).
Response: 200 OK with law JSON if found.
Errors: 400 Bad Request (malformed ID), 404 Not Found if no law with given id exists
.
PUT /api/v1/laws/:id – Replace/update a law record entirely.

Auth: Requires JWT.
Request Body: Full JSON of updated law.
Response: 200 OK with updated law object.
Errors: 400 for validation errors, 404 if law not found, 401 if unauthorized.
PATCH /api/v1/laws/:id – Partially update a law.

Auth: Requires JWT.
Request Body: Partial JSON (only fields to change).
Response: 200 OK with updated law.
Errors: similar to PUT.
DELETE /api/v1/laws/:id – Delete a law record.

Auth: Requires JWT.
Response: 204 No Content if deleted successfully.
Errors: 404 if law not found, 401 if unauthorized.
GET /api/v1/laws/exists/:id – Check if a law exists (no content).

Response: 200 OK with JSON { "exists": true } or { "exists": false }.
GET /api/v1/laws/recent – Fetch most recent laws (optionally paginated).

Description: Returns laws sorted by creation date (descending). Supports page/limit.
GET /api/v1/laws/archived – Fetch archived laws (optionally paginated).

PATCH /api/v1/laws/:id/archive – Archive a law.

Auth: Requires JWT. Marks a law’s isArchived to true.
Response: 200 with updated law.
PATCH /api/v1/laws/:id/restore – Restore an archived law.

Auth: Requires JWT. Sets isArchived to false.
GET /api/v1/laws/:id/history – Get update history for a law.

Description: Returns audit trail or change history (if implemented).
GET /api/v1/laws/:id/summary – Fetch a summarized version of the law.

Description: Returns an abridged text or key points of the law (e.g. first 100 characters or generated summary).
GET /api/v1/laws/random – Fetch a random law record.

GET /api/v1/laws/trending – Fetch currently trending legal sections.

Description: Returns sections/laws with highest recent access or activity.
Search & Filtering
GET /api/v1/search/laws?q=<keyword> – Search laws by keyword.

Query Param: q (e.g. ?q=murder). Performs text search on law titles/content.
Response: 200 with array of matching laws.
Example: /search/laws?q=fraud returns laws containing “fraud”.
Filter Routes: Many endpoints filter by specific fields. Examples:

GET /api/v1/laws/filter/act/:actName – laws by act (e.g. /filter/act/IPC).
/filter/chapter/:chapterId – by chapter ID.
/filter/section/:sectionNumber – by section number.
/filter/state/:stateName – by state jurisdiction.
/filter/court/:courtName – by court name (e.g. SupremeCourt).
/filter/status/:status – by legal status (e.g. "repealed", "valid").
/filter/category/:category – by offense category (e.g. "CyberCrime").
/filter/punishment/:type – by punishment type.
/filter/bailable/:value – bailable (true/false).
/filter/cognizable/:value – cognizable (true/false).
/filter/recent, /filter/trending, /filter/high-importance, /filter/repealed, /filter/constitutional, etc.
Each returns matching laws. All support optional page and limit for pagination.
Pagination and Sorting: Many list endpoints support query params:

?page=<num>&limit=<num> for paging (e.g. /laws?page=1&limit=20).
?sort=field for ascending sort or ?sort=-field for descending (e.g. /laws?sort=title or /laws?sort=-createdAt).
HTTP 200 is returned for successful queries. Sorting and pagination follow standard REST patterns
.
For all endpoints, consistent error handling is used:

Success: 200 OK for GET, 201 Created for successful POST
.
Errors: 400 Bad Request for invalid input, 401 Unauthorized for missing/invalid token, 404 Not Found if a resource is missing, and 500 Server Error for unexpected failures
.
Example response formats (illustrative):

GET /api/v1/laws (200 OK):

json
Copy
[
  { "_id": "60b8c1...", "title": "Cybercrime Act", "section": 66, ... },
  { "_id": "60b8c2...", "title": "Dowry Prohibition", "section": 3, ... },
  ...
]
POST /api/v1/laws (201 Created):

json
Copy
{ "_id": "60b8c3...", "title": "New Law", "section": 42, ... }
GET /api/v1/laws/60b8c1... (200 OK):

json
Copy
{ "_id": "60b8c1...", "title": "Cybercrime Act", "section": 66, ... }
Error Example (404 Not Found):

json
Copy
{ "error": "Law not found" }
(These examples are placeholders; actual responses depend on your schema and data.)

Setup & Installation
Prerequisites:

Node.js (v18 or higher)
.
MongoDB instance (v6.x+ recommended) – you can use a local MongoDB or a hosted database like MongoDB Atlas.
(Optional) Docker if containerizing, and Postman for API testing.
Environment: Create a .env file (see .env.example if included) with variables like:

Variable	Description	Example
PORT	Port for the Node server	3000
MONGODB_URI	MongoDB connection string	mongodb://localhost:27017/db
JWT_SECRET	Secret key for signing JWTs	your_jwt_secret_key
LOG_LEVEL	(Optional) Logging level (e.g. info)	debug
CORS_ORIGIN	(Optional) Allowed CORS origin	* or https://example.com

Additional vars (e.g. for email, analytics) are marked UNSPECIFIED here and can be added as needed.

Installation:

Clone the repo:
bash
Copy
git clone https://github.com/yourusername/your-repo.git
cd your-repo
Initialize npm and install dependencies:
bash
Copy
npm init    # sets up package.json (you can use `-y` to accept defaults)[object Object].
npm install express mongoose dotenv cors morgan jsonwebtoken   # installs core libraries
npm install --save-dev nodemon   # (dev) for automatic restarts
Configure environment: Copy .env.example to .env (if provided) and fill in your settings (Mongo URI, JWT secret, etc.).
Running & Testing
Start the server:

Development: npm run dev (if nodemon script is defined in package.json).
Production: npm start (runs the start script or defaults to node server.js
).
API Testing: Use Postman or curl to test endpoints. For example, to fetch all laws:

bash
Copy
curl -X GET http://localhost:3000/api/v1/laws
To create a law with JSON body:

bash
Copy
curl -X POST http://localhost:3000/api/v1/laws \
     -H "Content-Type: application/json" \
     -d '{"title": "Example Law", "section": 100, "content": "..." }'
Running Tests: (If tests exist) Run npm test to execute the test suite. If no tests are set up, you can add testing frameworks like Jest or Mocha as needed.

Linting/Formatting: (Optional) If using ESLint or Prettier, run npm run lint or npm run format as configured in package.json.

Deployment
Recommended deployment steps include setting the correct environment variables and running the app in a process manager (like PM2) or container:

Docker: A sample Dockerfile might use an official Node image:
dockerfile
Copy
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
ENV NODE_ENV=production
CMD ["node", "server.js"]
Then build and run:
bash
Copy
docker build -t laws-api .
docker run -d -p 80:3000 --env-file .env laws-api
Heroku/AWS/etc.: Deploy by setting env vars and pointing the platform to run npm start (it will use the start script in package.json by default
).
Always ensure security best practices in production: use strong JWT_SECRET, enable HTTPS, set NODE_ENV=production, and limit CORS as appropriate.

Contributing
Contributions are welcome! Please follow these guidelines:

Fork the repository and create a new branch for your feature or bugfix (use descriptive branch names).
Ensure any code follows existing style conventions.
Write clear commit messages and document any major changes in code comments or updated sections of this README.
If you add features, please include tests or usage examples.
Open a Pull Request with details of your changes; maintainers will review and merge.
For major changes, open an issue first to discuss the design. Please adhere to any existing CONTRIBUTING.md or CODE_OF_CONDUCT.md if provided.

License
This project’s license is UNSPECIFIED. (Recommend choosing a license such as MIT or Apache 2.0.)

Contact
Maintainer: Jane Doe (jane.doe@example.com)
For questions or issues, please open an issue on GitHub or contact the maintainer.

Project Link: https://github.com/yourusername/your-repo (replace with actual URL).
