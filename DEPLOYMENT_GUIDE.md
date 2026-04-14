# Garden View Resort - Deployment Guide

This guide walks you through deploying the Spring Boot backend to **Hugging Face Spaces** and the React frontend to **Vercel**.

## Phase 1: Deploying the Backend (Hugging Face Spaces)

Hugging Face Spaces provides free hosting for Docker containers.

### Step 1: Create a Separate Repository for the Backend

The frontend and backend currently live in the same repository. Hugging Face Spaces expects the `Dockerfile` at the root.

1.  Log in to [Hugging Face](https://huggingface.co/).
2.  Click on your profile picture -> **New Space**.
3.  **Space name**: `garden-view-resort` (or anything you prefer).
4.  **License**: Choose an appropriate license (e.g., MIT).
5.  **Select the Space SDK**: Choose **Docker** -> **Blank**.
6.  **Space hardware**: Free tier is fine.
7.  Click **Create Space**.

### Step 2: Upload Files to the Space

You need to upload the contents of your `backend` directory directly to the root of the Hugging Face Space.

You can do this by cloning the HF Space repository and copying the files over, or using the Web UI.

**Important**: Your Space root should look like this:
```
Dockerfile
pom.xml
src/
```

### Step 3: Configure Environment Variables (Secrets)

In your Hugging Face Space, click on **Settings**. Scroll down to **Variables and secrets** and click **New secret**.

Add the following secrets:
*   `JWT_SECRET`: A long, random string (e.g., `5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437`)
*   `ADMIN_EMAIL`: Your desired admin email (default: `gardenviewresort2026@gmail.com`)
*   `ADMIN_PASSWORD`: Your desired admin password (default: `gardenviewadmin26`)
*   `MAIL_PASSWORD`: Your Gmail App Password (if you want email features working)
*   `CORS_ORIGINS`: Your Vercel frontend URL, e.g., `https://your-frontend.vercel.app` (You can start with `*` during setup to allow all, but secure it later).

The space should start rebuilding automatically. Check the **Logs** tab. If successful, it will say "Running". 

> [!WARNING]
> Hugging Face Spaces go to sleep after 48 hours of inactivity on the free tier. The `huggingface` profile uses a file-based H2 database to persist data locally inside the container (`/data/gardenview`). However, when the Space rebuilds or moves to a different physical machine, **this local data will be lost**. For a true production system, consider migrating to a managed remote SQL database (like Supabase PostgreSQL or a managed MySQL database) and using the `prod` Spring profile.

## Phase 2: Deploying the Frontend (Vercel)

Vercel is perfect for React applications.

### Step 1: Push your Code to GitHub

Make sure your repository with both `src` and `backend` (and the newly updated files) is pushed to GitHub.

### Step 2: Import to Vercel

1.  Log in to [Vercel](https://vercel.com/).
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.

### Step 3: Configure Vercel

1.  **Framework Preset**: Keep it as **Vite**.
2.  **Root Directory**: Leave it as `./` (Since Vercel automatically finds Vite config when `package.json` is at the root).
3.  **Environment Variables**:
    *   Expand this section.
    *   Add `VITE_API_URL`
    *   Set the **Value** to your Hugging Face Space direct URL (e.g., `https://yourusername-garden-view-resort.hf.space`).
    *   **CRITICAL**: Do *not* include a trailing slash in the URL.
4.  Click **Deploy**.

Vercel will build your React app. It uses the `vercel.json` file added previously to configure React Router correctly so refreshing pages doesn't result in 404s.

## Phase 3: Final Integration Testing

Once Vercel finishes deploying, visit the Vercel URL.

1.  Test navigating around the site (Rooms, Restaurant, etc.).
2.  Go to the `/admin/login` page. Login with the configured `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
3.  Test making a new Booking inquiry.

**Congratulations! Your Resort application is now deployed!**
