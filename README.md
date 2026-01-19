# Project Structure

This project has been organized into three main folders:

- **frontend/**: The main user-facing Casting Website (Next.js Application).
- **admin-panel/**: The Admin Panel application (Next.js Application).
- **backend/**: Database scripts, migrations, and backend-related configuration.

## Getting Started

### Frontend
1. Navigate to the folder: `cd frontend`
2. Install dependencies (if needed): `npm install`
3. Run the development server: `npm run dev`

### Admin Panel
1. Navigate to the folder: `cd admin-panel`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev` (You may need to run on a different port if frontend is running, e.g., `npm run dev -- -p 3001`)

### Backend
Contains SQL scripts for Supabase. execute these in the Supabase SQL Editor as needed.
