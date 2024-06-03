from sqlalchemy.orm import Session
import models, schemas

def create_code(db: Session, code: schemas.CodeCreate):
    db_code = models.Code(code=code.code, output=code.output)
    db.add(db_code)
    db.commit()
    db.refresh(db_code)
    return db_code

def get_codes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Code).offset(skip).limit(limit).all()