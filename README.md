# PocketSmart AI: Your Smart Budget & Recommendation Assistant

Flask + Google Gemini app that gives budget-aware recommendations for home interiors, parties and jewelry.

## Repository structure
1. `1-Brainstorming-Ideation-Phase`
2. `2-Requirement-Analysis-Phase`
3. `3-Project-Design-Phase`
4. `4-Project-Planning-Phase`
5. `5-Project-Development-Phase` (the app)
6. `6-Project-Testing-Phase`
7. `7-Project-Documentation-Phase`
8. `8-Project-Demonstration-Phase`

## Run locally (Windows PowerShell)
```powershell
cd 5-Project-Development-Phase
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env      # then put your GEMINI_API_KEY in .env
python app.py
```
Open http://127.0.0.1:5000

## Tests
```powershell
pytest 6-Project-Testing-Phase
```
