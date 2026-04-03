# Service-Pulse: Incident Management System (ITSM)

Service-Pulse is an Incident Management System (ITSM) that standardizes the lifecycle of incidents—from logging to closure. Inspired by ServiceNow-Zurich ITSM. Built with **NestJS**, **Next.js**, and **Prisma ORM** with **PostgreSQL**.

---

## 🚀 Demo & Live Links

- **Live Demo:** [.](.)
- **Backend API Docs (Swagger):** [.](.)
- This project is split into two main repositories:
  - **Backend (Current):** [Service-Pulse Backend](https://github.com/phanngocha99/service-pulse-backend)
  - **Frontend:** [Service-Pulse Frontend](https://github.com/phanngocha99/service-pulse-frontend-webapp)

---

## 🛠 Project Setup

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone <repository-url>
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory and define your connection strings and secrets:

```bash
# Example .env content
DATABASE_URL="postgresql://user:password@localhost:5432/service_pulse"
JWT_SECRET="your_secret_key"
```

> **Note:** Ensure your `.dockerignore` is properly configured to exclude `node_modules` and build artifacts.

### 3. Install Dependencies

```bash
npm install
```

### 4. Initialize Database (Prisma)

Generate the Prisma client and run the initial migration to set up your database schema:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

---

## 💐 Running the Project

### 1. Start the Application

```bash
# Development mode
npm run start:dev
```

### 2. Launch Prisma Studio

To manage and visualize your data through a web interface:

```bash
npx prisma studio --port 5555
```

Access the dashboard at: [http://localhost:5555](http://localhost:5555)

---

## 🌱 Database Seeding

Populate your database with initial data (such as default roles, permissions, and admin users):

```bash
npx prisma db seed
```

---

## 🔄 Development Workflow (Schema Changes)

Whenever you modify the `schema.prisma` file, follow these steps to keep your database and types in sync:

1. **Create and Apply Migration:**

   ```bash
   npx prisma migrate dev --name [change-description]
   ```

   _This updates the database schema and tracks the history._

2. **Regenerate Prisma Client:**
   ```bash
   npx prisma generate
   ```

## 🐳 Docker Support

If you prefer running the infrastructure via Docker:

```bash
docker-compose up -d
```

---

## 📊 Project Metadata & Techniques

- **Version:** `0.0.1`
- **Core Framework:** NestJS `^11.0.1`
- **Language:** TypeScript `^5.7.3`
- **Database Stack:** PostgreSQL with Prisma ORM `^7.5.0`
  > **Note:** For a complete list of dependencies and scripts, please refer to the [package.json](./package.json) file.
