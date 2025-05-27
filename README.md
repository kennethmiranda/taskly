# :ballot_box_with_check: Taskly: Task Management System

**Taskly** is a task management web application designed to help users efficiently create, manage, and organize their tasks. Built using **Next.js**, **TypeScript**, and **MySQL**, this system offers user authentication with NextAuth and provides a seamless experience across various devices. The app features task creation, updates, priorities, statuses, file management, calendar views, and personalized user settings.

<details><summary><b>📁 Table of Contents</b></summary>

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🎉 Getting Started](#-getting-started)
  - [📋 Prerequisites](#-prerequisites)
  - [⚙️ Installation](#️-installation)
  - [🌐 OAuth Setup](#-oauth-setup)
- [🌟 App Showcase](#-app-showcase)
- [🚀 Roadmap](#-roadmap)
- [👥 Contributors](#-contributors)
- [📚 Acknowledgements](#-acknowledgements)

</details>

## 🌟 Features

- **Task Management**: Create, update, and organize tasks with:
  - Titles
  - Descriptions
  - Due dates
  - Priorities
  - Statuses (e.g., To-Do, In Progress, Completed)
- **Task Calendar**: Visualize tasks in a calendar format for better planning.
- **File Management**: Upload, download, and remove files associated with tasks.
- **Settings Page**: Customize your profile (name, picture, notifications) and toggle dark/light mode.
- **User Authentication**: Secure sign-in via **NextAuth** with credentials and OAuth providers like Google, GitHub, and Discord.
- **User-Specific Data**: Each user has exclusive access to their tasks.
- **Responsive UI**: Modern, user-friendly interface built with **ShadCN UI** and **Next.js**.

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (React Framework), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com), [shadcn UI](https://ui.shadcn.com/docs)
- **Backend**: [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/), [JavaScript]()
- **Database**: [MySQL](https://www.mysql.com/)
- **Authentication** [NextAuth.js](https://next-auth.js.org/)

## 🎉 Getting Started

Follow these steps to set up the project on your local machine.

### 📋 Prerequisites

- **Node.js** (v20.12.2)
- **MySQL server**

### ⚙️ Installation

<details><summary><b>Show instructions</b></summary>

1. Clone the repository:

   ```bash
   git clone https://github.com/kennethmiranda/taskly.git
   cd taskly
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

     # Database
     PORT=
     DBHOST=
     DBUSER=
     DBPASSWORD=
     DBNAME=
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
   - Execute the SQL scripts from `schema.sql` to create the necessary tables (`users`, `tasks`, `files`, `user_providers`).

4. Run the development servers:

   - **Frontend**: Navigate to the `frontend` directory and run:
     ```bash
     npm run dev
     ```
   - **Backend**: In another terminal, navigate to the `backend` directory and run:
     ```bash
     node ./server.js
     ```

5. Open your browser to `http://localhost:3000` to start using the app.

</details>

### 🌐 OAuth Setup

<details><summary><b>Show instructions</b></summary>

To set up OAuth credentials, follow these steps for each provider:

- **GitHub**:

  - Visit the [GitHub Developer Settings](https://github.com/settings/developers).
  - Create a new OAuth App with the callback URL: `http://localhost:3000/api/auth/callback/github`.
  - Add the `Client ID` and `Client Secret` to your `.env.local` file.

- **Google**:

  - Go to the [Google Cloud Console](https://console.cloud.google.com/).
  - Create a new project and enable the OAuth 2.0 API.
  - Add the redirect URI: `http://localhost:3000/api/auth/callback/google`.
  - Add the `Client ID` and `Client Secret` to your `.env.local` file.

- **Discord**:

  - Access the [Discord Developer Portal](https://discord.com/developers/applications).
  - Set up a new application and navigate to the OAuth2 tab.
  - Add the redirect URI: `http://localhost:3000/api/auth/callback/discord`.
  - Add the `Client ID` and `Client Secret` to your `.env.local` file.

For more detailed documentation, refer to the [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction) / [Auth.js Documentation](https://authjs.dev/getting-started/authentication/oauth).

</details>

## 🌟 App Showcase

<details><summary><b>Previews</b></summary>

### Authentication

![OAuth Login GIF](/images/taskly-sign-in.gif)

### Task Management

**Task Table Preview**:
![Task Table Video](/images/taskly-task-table.mp4)
**Calendar**:
![Calendar GIF](/images/taskly-calendar.gif)
**Edit Task**:
![Edit Task GIF](/images/taskly-task-edit.gif)

### File Management

![Files GIF](/images/taskly-files.gif)

### Settings

![Settings GIF](/images/taskly-settings.gif)

</details>

## 🚀 Roadmap

- [ :heavy_check_mark: ] Task list/table functionality
- [ :heavy_check_mark: ] User authentication and secure task management
- [ :heavy_check_mark: ] Calendar display for tasks
- [ :heavy_check_mark: ] File upload, download, and removal for tasks
- [ :heavy_check_mark: ] Settings page for profile customization and dark/light mode toggle
- [ ] Update text pages (Terms of Service, Privacy Policy, Documentation, FAQ)
- [ ] Implement streaks to track how often a user signs in
- [ ] Implement "Share Task" feature with authentication
- [ ] Email notifications for due date reminders
- [ ] File storage page to display all user files
- [ ] Deploy web app and publish to production
- [ ] Implement cloud storage for files

## 👥 Contributors

Thanks to the amazing team that made this project possible:

<a href="https://github.com/kennethmiranda/taskly/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=kennethmiranda/taskly" />
</a>

- **Kenneth Miranda** - Project Lead / Frontend Developer
- **Avid Andrade** - Backend Developer
- **Evan Garcia** - Database Specialist

## 📚 Acknowledgements

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [MySQL](https://www.mysql.com)
- [NextAuth.js](https://next-auth.js.org)
- [ShadCN UI](https://ui.shadcn.com/docs)

##

<div align="left">
  <a href="kennymiranda000@gmail.com" target="_blank">
    <img src="https://img.shields.io/static/v1?message=Email&logo=gmail&label=&color=D14836&logoColor=white&labelColor=&style=for-the-badge" height="35" alt="gmail logo"  />
  </a>
  <a href="https://www.linkedin.com/in/kenneth-miranda-xyz" target="_blank">
    <img src="https://img.shields.io/static/v1?message=LinkedIn&logo=linkedin&label=&color=0077B5&logoColor=white&labelColor=&style=for-the-badge" height="35" alt="linkedin logo"  />
  </a>
</div>
