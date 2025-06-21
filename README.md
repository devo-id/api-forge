# API Forge

**Create Realistic Mock APIs, Visually.**

Tired of your frontend development being blocked? API Forge is an open-source tool that lets you visually build realistic, stateful mock APIs that stand in for the real thing, so you can keep building.

_Why did the API go to therapy? Because it had too many unresolved issues_. With API Forge, you can give your actual API a much-needed vacation.

---

## Key Features (Current MVP)

- **Core Authentication:** Secure user registration, login, and password reset functionality.
- **Project & Endpoint Management:** Create and manage projects, and define basic API endpoints with static JSON responses.
- **Visual Interface:** An intuitive UI for managing your mock APIs.
- **Self-Hostable:** 100% open-source. Deploy it on your own infrastructure.
- **Built with a Modern Stack:** Next.js, TypeScript, PostgreSQL, Prisma, and Tailwind CSS.
- **(Coming Soon):** Stateful mocking, dynamic data with Faker.js, team collaboration.

---

## Your Local Setup

### Prerequisites

- **Node.js:** v18 or later is recommended.
- **Package Manager:** We use `npm` in these docs, but `pnpm` or `yarn` work just as well.
- **Database:** A free PostgreSQL database. We highly recommend [Supabase](https://supabase.com/) for a quick and painless setup.

### Installation & Setup

1.  **Clone the Repository**

    - First, get the code onto your machine.

      ```bash
      git clone https://github.com/devo-id/api-forge.git
      cd api-forge
      ```

2.  **Install Dependencies**

    - This installs all the necessary packages for the main application.

      ```bash
      npm install
      ```

3.  **Set Up Your Environment Variables**

    - This project uses environment variables for keys and secrets. We've included a template to make it easy.

    - **For the Prisma CLI and fallback app settings:** Create a `.env` file by copying the example:

      ```bash
      cp .env.example .env
      ```

    - **For your local development server secrets:** Create a `.env.local` file, also by copying the example:
      ```bash
      cp .env.example .env.local
      ```
    - Now, open **both** your new `.env` and `.env.local` files. You will need to fill in the values.

      - **In `.env`:** Ensure `DATABASE_URL` is set correctly. This is what the Prisma CLI uses.
      - **In `.env.local`:** Fill in all values (`DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `RESEND_API_KEY`). The values here will be used by your Next.js app and will override those in `.env` during development.

4.  **Connect to Your Database**

    - Log in to [Supabase](https://supabase.com/) and create a new project.
    - Navigate to **Project Settings > Database**.
    - Under the **Connection string** section, copy the `URI`.
    - Paste this full URL as the value for DATABASE_URL in both your .env and .env.local files.

5.  **Set Up the Resend API Key**

    - To get the `RESEND_API_KEY`, sign up at [Resend](https://resend.com/) and create an API key for free.
    - Once you have your API key, add it to your `.env.local` file.

6.  **Run the Database Migration**

    - This is the magic step. It sets up all the necessary tables in your new database.

      ```bash
      npx prisma migrate dev
      ```

      _This single command smartly updates your database schema and generates the Prisma Client your app needs to talk to it._

7.  **Run the App!**
    - You're all set! Start the development server.
      ```bash
      npm run dev
      ```

Your API Forge application should now be running at `http://localhost:3000`. Open it in your browser, create an account, and start building!

---

## How to Contribute

We're really glad you're thinking about contributing. This project exists because of people like you.

- **Find an Issue:** The best place to start is our [Issues tab](https://github.com/devo-id/api-forge/issues). Look for anything tagged with `help wanted` or `good first issue`.
- **Submit a Pull Request:** If you’ve got an idea or a fix, go ahead and fork the repo, create a new branch, and open a PR. Include a brief summary of your changes so we know what you’re working on.

We're excited to see what you build with us! Thanks for being part of the project!
