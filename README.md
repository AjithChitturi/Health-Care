# Proactive Health Risk Assessment Platform

This project is a web-based platform for proactive health risk assessment, featuring:

- **Backend:** Django REST API for user authentication, questionnaire, report generation, and admin review.
- **Frontend:** Vite + React (TypeScript) for user and admin portals, multi-step forms, dashboards, and report viewing/downloading.

## Getting Started

### Backend (Django)
1. Create and activate the virtual environment:
   ```powershell
   python -m venv backend_env
   .\backend_env\Scripts\activate
   ```
2. Install dependencies:
   ```powershell
   pip install django djangorestframework
   ```
3. Run the server:
   ```powershell
   python manage.py runserver
   ```

### Frontend (Vite + React)
1. Install dependencies:
   ```powershell
   cd frontend
   npm install
   ```
2. Start the development server:
   ```powershell
   npm run dev
   ```

## Features
- User registration and login
- Multi-step health questionnaire
- Automated test/suggestion generation
- Admin (doctor) review and feedback
- Downloadable health reports

## Folder Structure
- `backend/` - Django backend
- `frontend/` - Vite React frontend
- `.github/` - Copilot instructions
- `.vscode/` - VS Code tasks

---
For more details, see the code and documentation in each folder.
