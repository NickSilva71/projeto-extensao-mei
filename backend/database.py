from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Cria um arquivo local chamado mei_b2b.db
SQLALCHEMY_DATABASE_URL = "sqlite:///./mei_b2b.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()