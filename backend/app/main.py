from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import io
import sys
from contextlib import redirect_stdout, redirect_stderr
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from .database import engine, Base, SessionLocal
from . import schemas, crud

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
    status: str = "success"
    output: str

def get_session_local():
    yield SessionLocal()

def execute_code(code: str) -> Dict[str, Any]:
    stdout = io.StringIO()
    stderr = io.StringIO()

    with redirect_stdout(stdout):
        # Safe namespace
        exec_globals = {}
        exec_locals = {}

        # Compile and execute
        compiled = compile(code, "<string>", "exec")
        exec(compiled, exec_globals, exec_locals)
        return stdout.getvalue()

# Submit code: check for errors, persist to DB
@app.post("/api/submit_code", response_model=CodeResponse)
async def submit_code(request: CodeRequest):
    try:
        output = execute_code(request.code)
    except Exception as e:
        return CodeResponse(status="error", output=str(e))

    # Create entry in DB
    db = SessionLocal()
    crud.create_code(db, schemas.CodeCreate(code=request.code, output=output))
    db.close()
    return CodeResponse(output=output)

# Test code endpoint: allow users to test their code first
@app.post("/api/test_code", response_model=CodeResponse)
async def test_code(request: CodeRequest):
    try:
        output = execute_code(request.code)
        return CodeResponse(output=output)
    except Exception as e:
        return CodeResponse(status="error", output=str(e))

    
# Fetch all submitted codes to display
@app.get("/api/codes", response_model=List[schemas.Code])
async def read_codes(skip: int = 0, limit: int = 100, db: Session = Depends(get_session_local)):
    codes = crud.get_codes(db, skip=skip, limit=limit)
    return codes

