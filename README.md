# API Forge

**Create Realistic Mock APIs, Visually.**

Tired of your frontend development being blocked? API Forge is an open-source tool that lets you visually build realistic, stateful mock APIs that stand in for the real thing, so you can keep building.

_Why did the API go to therapy? Because it had too many unresolved issues_. With API Forge, you can give your actual API a much-needed vacation.

---

## Features That Actually Help

- **Visual Editor:** Click, type, and create endpoints. If you can use a computer, you can build a mock API.
- **Truly Stateful Mocking:** Create APIs that remember changes from `POST`, `PUT`, and `DELETE` requests. It's like having a real database.
- **(Coming Soon) Dynamic Data:** Use Faker.js schemas to generate realistic data.
- **100% Open Source & Self-Hostable:** Deploy it on your own infrastructure. Your data, your rules.
- **Built with a Modern Stack:** Next.js, TypeScript, PostgreSQL, Prisma, and Tailwind CSS. All the good stuff.

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
    - Create your local environment file by copying the example:

    ```bash
    cp .env.example .env.local
    ```

    - Now, open the new `.env.local` file and fill in your secrets. You'll get the database URL in the next step.

4.  **Connect to Your Database**

    - Log in to [Supabase](https://supabase.com/) and create a new project.
    - Navigate to **Project Settings > Database**.
    - Under the **Connection string** section, copy the `URI`.
    - Paste this full URL as the value for `DATABASE_URL` in your `.env.local` file.

5.  **Run the Database Migration**

    - This is the magic step. It sets up all the necessary tables in your new database.

    ```bash
    npx prisma migrate dev
    ```

    _This single command smartly updates your database schema and generates the Prisma Client your app needs to talk to it._

6.  **Run the App!**
    - You're all set! Start the development server.
    ```bash
    npm run dev
    ```

Your API Forge application should now be running at `http://localhost:3000`. Create an account and start building!

---

## How to Contribute

We're really glad you're thinking about contributing. This project exists because of people like you.

- **Find an Issue:** The best place to start is our [Issues tab](https://github.com/devo-id/api-forge/issues). Look for anything tagged with `help wanted` or `good first issue`.
- **Submit a Pull Request:** If you’ve got an idea or a fix, go ahead and fork the repo, create a new branch, and open a PR. Include a brief summary of your changes so we know what you’re working on.

We're excited to see what you build with us! Thanks for being part of the project!
