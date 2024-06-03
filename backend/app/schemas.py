from pydantic import BaseModel

class CodeBase(BaseModel):
    code: str
    output: str

class CodeCreate(CodeBase):
    pass

class Code(CodeBase):
    id: int

    class Config:
        orm_mode = True # orm_mode
