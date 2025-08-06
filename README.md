# Budget Management API

A RESTful API for managing personal budgets, built with Node.js, Express, Firebase Firestore (NoSQL database), and Firebase Authentication (Email/Password).

## 🚀 Features

* **User Authentication** via Firebase Auth (Email/Password)
* **CRUD operations** for:

  * **Expenses**
  * **Categories**
  * **Saving Goals**
* **Expense Summary**: Total spent and breakdown by category
* **Protected endpoints**: All operations require a valid Firebase ID token

## 🛠️ Tech Stack

* **Runtime & Framework**: Node.js + Express
* **Database**: Firebase Firestore
* **Authentication**: Firebase Authentication (Email/Password)
* **Environment Variables**: dotenv
* **CORS**: cors middleware

## 📋 Prerequisites

* Node.js (v14+ recommended)
* npm (comes with Node.js)
* A Firebase project with **Firestore** & **Authentication (Email/Password)** enabled
* Postman (optional, for API testing)

## 🔧 Setup & Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/budget-api.git
   cd budget-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Firebase**

   * In the Firebase Console, create a new project or use an existing one.
   * Under **Authentication → Sign-in method**, enable **Email/Password**.
   * Under **Firestore Database**, create a database in production or test mode.
   * Generate a **Service Account Key**:

     1. Go to **Project Settings → Service Accounts**.
     2. Click **Generate new private key** and download the JSON file.

4. **Create a `.env` file** in the project root with the following variables:

   ```dotenv
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=your-client-email@your-project.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_CONTENT\n-----END PRIVATE KEY-----\n"
   PORT=5000
   ```

   > **Note:** Make sure to escape newlines (`\n`) in the private key.

5. **Start the server**

   ```bash
   npm start
   ```

   The API will run on `http://localhost:5000` (or the port you specified).

## 📐 API Endpoints

> **All protected endpoints** require an `Authorization` header:
>
> ```http
> Authorization: Bearer <FIREBASE_ID_TOKEN>
> ```

### Auth (Token Test)

* `GET /api/auth/me`
  Returns the decoded Firebase user object.

### Categories

| Method | Endpoint              | Description           |
| ------ | --------------------- | --------------------- |
| GET    | `/api/categories`     | List all categories   |
| POST   | `/api/categories`     | Create a new category |
| PUT    | `/api/categories/:id` | Update a category     |
| DELETE | `/api/categories/:id` | Delete a category     |

### Expenses

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| GET    | `/api/expenses`     | List all expenses    |
| POST   | `/api/expenses`     | Create a new expense |
| PUT    | `/api/expenses/:id` | Update an expense    |
| DELETE | `/api/expenses/:id` | Delete an expense    |

### Saving Goals

| Method | Endpoint         | Description              |
| ------ | ---------------- | ------------------------ |
| GET    | `/api/goals`     | List all saving goals    |
| POST   | `/api/goals`     | Create a new saving goal |
| PUT    | `/api/goals/:id` | Update a saving goal     |
| DELETE | `/api/goals/:id` | Delete a saving goal     |

### Summary

* `GET /api/summary`
  Returns an object with:

  * **total**: Sum of all expenses
  * **byCategory**: Breakdown of expense totals keyed by `categoryId`

## 🧪 Testing with Postman

1. **Import the Postman collection**:

   * Copy the JSON from `BudgetManagementAPI.postman_collection.json`.
   * In Postman, go to **File → Import → Raw Text** and paste.
2. **Set environment variables** in Postman:

   * `base_url`: `http://localhost:5000/api`
   * `token`: `<YOUR_FIREBASE_ID_TOKEN>`
3. **Run requests** in the collection to test each endpoint.

## 📄 Postman Collection

The repository includes a `BudgetManagementAPI.postman_collection.json` file. Import it to Postman for quick testing.

## 🎓 Lecturer Activity: Integrate with Android Studio Frontend

**Objective:** Students will integrate this Node.js API with a native Android Studio frontend using **Firebase Authentication** and **Retrofit**.

### ✅ Instructions for Students

1. **Clone this API repo and ensure it's running locally**

   ```bash
   git clone https://github.com/lecturer-org/budget-api.git
   cd budget-api && npm install && npm start
   ```

2. **In Android Studio:**

   * Create a new project or open an existing one.
   * Enable **Firebase Authentication** (Email/Password) in your app.
   * Use **Retrofit** and **OkHttp** to connect to API endpoints.
   * On login, retrieve the Firebase **ID token** and attach it to the `Authorization` header (`Bearer <token>`).

3. **Required Activities:**

   * Create a login/register screen using Firebase Auth.
   * Build screens to:

     * View and create expenses
     * View categories and saving goals
     * Display summary screen (total & per category)

4. **Bonus Tasks:**

   * Add filters (by date or category)
   * Create charts using MPAndroidChart for summary data
   * Deploy API to Render or Firebase Hosting and switch to production URL

### ☁️ Hosting API on Render

1. **Push your project to GitHub** (if not already):

   ```bash
   git init
   git remote add origin https://github.com/your-username/budget-api.git
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

2. **Go to [https://render.com](https://render.com)** and sign in.

3. **Create a new Web Service**:

   * Connect your GitHub repo
   * Choose branch (e.g. `main`)
   * Runtime: `Node`
   * Start command: `npm start`
   * Add environment variables from `.env`

4. **Deploy and copy your Render URL** (e.g., `https://budget-api.onrender.com`)

5. **In Android Studio:**

   * Replace `base_url` in your Retrofit client with your Render URL:

     ```kotlin
     val retrofit = Retrofit.Builder()
         .baseUrl("https://budget-api.onrender.com/api/")
         .addConverterFactory(GsonConverterFactory.create())
         .build()
     ```

Now your app is connected to the live API!

## 📜 License

This project is licensed under the MIT License. Feel free to use and modify!
