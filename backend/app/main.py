from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import subprocess
from sqlalchemy.orm import Session
from typing import List
from database import engine, Base, SessionLocal
import models, schemas, crud

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

class CodeRequest(BaseModel):
    code: str

class CodeResponse(BaseModel):
    output: str

def get_session_local():
    yield SessionLocal()

# Test code endpoint: allow users to test their code first
@app.post("/api/test_code", response_model=CodeResponse)
async def test_code(request: CodeRequest):
    try:
        result = subprocess.run(
            ["python3", "-c", request.code],
            capture_output=True,
            text=True,
            timeout=10
        )
        output = result.stdout if result.returncode == 0 else result.stderr
        return CodeResponse(output=output)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Submit code: check for errors, persist to DB
@app.post("/api/submit_code", response_model=CodeResponse)
async def submit_code(request: CodeRequest):
    try:
        db = SessionLocal()
        result = subprocess.run(
            ["python3", "-c", request.code],
            capture_output=True,
            text=True,
            timeout=10
        )
        output = result.stdout if result.returncode == 0 else result.stderr
        if result.returncode == 0:
            crud.create_code(db, schemas.CodeCreate(code=request.code, output=output))
        db.close()
        return CodeResponse(output=output)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# Fetch all submitted codes to display
@app.get("/api/codes", response_model=List[schemas.Code])
async def read_codes(skip: int = 0, limit: int = 100, db: Session = Depends(get_session_local)):
    print(f"Skip: {skip}, Limit: {limit}")
    codes = crud.get_codes(db, skip=skip, limit=limit)
    print(f"Codes: {codes}")
    return codes

