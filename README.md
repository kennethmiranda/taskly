# 🌟 SE2-Project: Task Management System 🌟

Welcome to the **SE2 Project**! This repository hosts the source code for a **Task Management System**, designed to help users efficiently create, manage, and organize tasks. Built using **Next.js**, **TypeScript**, **MySQL**, and **NextAuth**, this system ensures secure user authentication and a seamless experience.

---

## 🚀 Features

- **Task Management**: Create, update, and organize tasks with:
  - Titles
  - Descriptions
  - Due dates
  - Priorities
  - Statuses (e.g., To-Do, In Progress, Completed)
- **User Authentication**: Secure sign-in via **NextAuth** with OAuth providers like Google, GitHub, and Discord.
- **User-Specific Data**: Each user has exclusive access to their tasks.
- **Responsive UI**: Modern, user-friendly interface built with **ShadCN UI** and **Next.js**.

---

## 🛠️ Technologies Used

| **Area**        | **Technology**                                                                                  |
| --------------- | ----------------------------------------------------------------------------------------------- |
| Frontend        | [Next.js](https://nextjs.org/) (React Framework), [TypeScript](https://www.typescriptlang.org/) |
| Backend         | [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/)                        |
| Database        | [MySQL](https://www.mysql.com/)                                                                 |
| Authentication  | [NextAuth.js](https://next-auth.js.org/)                                                        |
| Package Manager | [pnpm](https://pnpm.io/)                                                                        |

---

## 🎉 Getting Started

Follow these steps to set up the project on your local machine.

### 📋 Prerequisites

- **Node.js** (v20.12.2)
- **pnpm** (for dependency management)
- A running **MySQL server**

### ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kennethmiranda/SE2-Project.git
   cd SE2-Project
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   - Duplicate `.env.example` and rename it `.env.local`.
   - Configure the following variables:

     ```
     NEXTAUTH_SECRET=
     NEXTAUTH_URL=http://localhost:3000

     # GitHub OAuth
     GITHUB_ID=
     GITHUB_SECRET=
     GITHUB_URL="http://localhost:3000/api/auth/callback/github"

     # Google OAuth
     GOOGLE_ID=
     GOOGLE_SECRET=
     GOOGLE_URL="http://localhost:3000/api/auth/callback/google"

     # Discord OAuth
     DISCORD_ID=
     DISCORD_SECRET=
     DISCORD_URL="http://localhost:3000/api/auth/callback/discord"

     # Database
     PORT=
     DBHOST=
     DBUSER=
     DBPASSWORD=
     DBNAME=
     ```

4. Set up the database:

   - Navigate to the `database` directory.
   - Execute the SQL scripts from `schema.sql` to create the necessary tables (`users`, `tasks`, `files`, etc.).
   - Ensure your database connection details are correct in the `.env.local` file.

5. Run the development servers:

   - **Frontend**: Open a terminal and run:
     ```bash
     pnpm run dev
     ```
   - **Backend**: In another terminal, navigate to the `backend` directory and run:
     ```bash
     node ./server.js
     ```

6. Open your browser and navigate to `http://localhost:3000` to start using the app.

---

## 📖 Usage

### 📝 Task Management

- Log in to view your task list.
- Create tasks with details like a title, description, due date, and priority.
- Update task attributes or delete tasks as needed.
- Change task statuses to reflect progress (e.g., To-Do → In Progress → Completed).

### 🔐 Authentication

- Log in using your Email, Google, GitHub, or Discord via **NextAuth**.
- Your tasks are securely tied to your account and are accessible only to you.

---

## 🧑‍🤝‍🧑 Contributors

Thanks to the amazing team that made this project possible:

- **Kenneth Miranda** - Project Lead / Frontend Developer
- **Avid Andrade** - Backend Developer
- **Evan Garcia** - Database Specialist

Feel free to fork this repository, contribute, or report issues. Happy coding! 🎉
