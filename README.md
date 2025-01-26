# 🌟 SE2-Project: Task Management System 🌟

Welcome to the **SE2 Project**! This repository hosts the source code for a **Task Management System**, designed to help users efficiently create, manage, and organize tasks. Built using **Next.js**, **TypeScript**, **MySQL**, and **NextAuth**, this system ensures secure user authentication and a seamless experience.

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

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (React Framework), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com), [shadcn UI](https://ui.shadcn.com/docs)
- **Backend**: [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/)
- **Database**: [MySQL](https://www.mysql.com/)
- **Authentication** [NextAuth.js](https://next-auth.js.org/)

## 🎉 Getting Started

Follow these steps to set up the project on your local machine.

### 📋 Prerequisites

- **Node.js** (v20.12.2)
- A running **MySQL server**

### ⚙️ Installation

<details><summary><b>Show instructions</b></summary>

1. Clone the repository:

   ```bash
   git clone https://github.com/kennethmiranda/SE2-Project.git
   cd SE2-Project
   ```

2. Install dependencies and set up environment variables for both the frontend and backend:

   **Frontend**:

   ```bash
   cd frontend
   npm install
   ```

   - Create a `.env.local` file in the `frontend` directory:

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
     ```

   **Backend**:

   ```bash
   cd backend
   npm install
   ```

   - Create a `.env` file in the `backend` directory:
     ```
     PORT=
     DBHOST=
     DBUSER=
     DBPASSWORD=
     DBNAME=
     ```

3. Set up the database:

   - Navigate to the `database` directory.
   - Execute the SQL scripts from `schema.sql` to create the necessary tables (`users`, `tasks`, `files`, 'user_providers').
   - Ensure your database connection details are correct in the backend `.env` file.

4. Run the development servers:

   - **Frontend**: Open a terminal, navigate to the `frontend` directory, and run:
     ```bash
     npm run dev
     ```
   - **Backend**: In another terminal, navigate to the `backend` directory and run:
     ```bash
     node ./server.js
     ```

5. Open your browser and navigate to `http://localhost:3000` to start using the app.

</details>

## 🌐 OAuth Setup

To set up OAuth credentials, follow these steps for each provider:

- **GitHub**:

  - Visit the [GitHub Developer Settings](https://github.com/settings/developers).
  - Create a new OAuth App with the callback URL: `http://localhost:3000/api/auth/callback/github`.
  - Use the `Client ID` and `Client Secret` in your `.env.local` file.

- **Google**:

  - Go to the [Google Cloud Console](https://console.cloud.google.com/).
  - Create a new project and enable the OAuth 2.0 API.
  - Configure the redirect URI as `http://localhost:3000/api/auth/callback/google`.
  - Copy the `Client ID` and `Client Secret` to your `.env.local` file.

- **Discord**:
  - Access the [Discord Developer Portal](https://discord.com/developers/applications).
  - Set up a new application and navigate to the OAuth2 tab.
  - Add the redirect URI: `http://localhost:3000/api/auth/callback/discord`.
  - Add the `Client ID` and `Client Secret` to your `.env.local` file.

For more detailed documentation, refer to the [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction).

## 📖 Usage

### 📝 Task Management

- Log in to view your task list.
- Create tasks with details like a title, description, due date, and priority.
- Update task attributes or delete tasks as needed.
- Change task statuses to reflect progress (e.g., To-Do → In Progress → Completed).

### 🔐 Authentication

- Log in using your Credentials, Google, GitHub, or Discord via **NextAuth**.
- Your tasks are securely tied to your account and are accessible only to you.

## Contributors

Thanks to the amazing team that made this project possible:

<a href="https://github.com/kennethmiranda/SE2-Project/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=kennethmiranda/SE2-Project" />
</a>

- **Kenneth Miranda** - Project Lead / Frontend Developer
- **Avid Andrade** - Backend Developer
- **Evan Garcia** - Database Specialist

## Acknowledgements

Thanks to the tools and libraries that made this project possible:

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [MySQL](https://www.mysql.com)
- [NextAuth.js](https://next-auth.js.org)

Feel free to fork this repository, contribute, or report issues. Happy coding! 🎉
