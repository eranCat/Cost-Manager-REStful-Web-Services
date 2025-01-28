# Cost Manager RESTful Web Services

This project implements RESTful web services for managing costs. The backend is built with **Node.js**, **Express.js**, and **MongoDB** using **Mongoose** as an ODM. It includes APIs for managing costs, users, and providing detailed monthly reports.

## Features
- **Add Cost**: Add a new cost item for a specific user.
- **Monthly Report**: Retrieve monthly cost data grouped by categories.
- **User Details**: Get details of a specific user along with total expenses.
- **About Team**: Get information about the development team.

## Project Structure
```plaintext
.
├── models
│   ├── cost_model.js       # Mongoose schema for costs
│   └── user_model.js       # Mongoose schema for users
├── routes
│   ├── cost_routes.js      # Routes for cost-related endpoints
│   └── user_routes.js      # Routes for user-related endpoints
├── utils
│   └── db.js               # MongoDB connection utility
├── app.js                  # Main server entry point
├── package.json            # Project dependencies
├── test.js                 # Unit tests for APIs
