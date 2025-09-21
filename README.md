<<<<<<< HEAD
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/063f5506-7059-4599-b886-bfdfb0b56c21

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/063f5506-7059-4599-b886-bfdfb0b56c21) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/063f5506-7059-4599-b886-bfdfb0b56c21) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
=======
🚀 Overview

Profile Enhancer Suite is a full-stack application that connects recruiters and students.

Recruiters can post job descriptions (JDs).

Students can upload resumes against those JDs.

The system then analyzes resumes, stores results in a database, and makes them ready for ML model training (for future improvements like candidate ranking, recommendations, etc.).

Built with FastAPI (Python backend) and MongoDB, the platform is modular and extendable for advanced resume analysis pipelines.

✨ Features

👨‍💼 Recruiter Portal

Post job titles & descriptions

View all jobs and associated resumes

🎓 Student Portal

Upload resumes for a specific job

Get automated resume analysis (keyword matching, skill extraction, scoring, etc.)

📊 Resume Analyzer (Pluggable)

Currently uses a simple keyword matcher

Can be extended to use NLP/ML models (Spacy, Transformers, etc.)

💾 Database Integration

MongoDB stores job descriptions, resumes, and analysis results

Designed for future training dataset extraction

📂 File Uploads

Resumes stored locally (uploads/resumes/)

Ready for S3/Cloud migration

🔌 API-First Design

REST endpoints for Jobs & Resumes

Interactive API docs via Swagger (/docs) and ReDoc (/redoc)
>>>>>>> b0bfc66ec1f234d18476f7ff0ce22fd08221915e
