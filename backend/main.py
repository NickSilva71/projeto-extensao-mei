from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
import datetime
import models
from database import engine, SessionLocal

# Recria todas as tabelas no banco de dados
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API MEI - Promoção de Vendas B2B",
    description="Sistema completo de gestão de portfólio, CRM e geração de propostas",
    version="1.0.0"
)

# Injeção de dependência do banco de dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- SCHEMAS (PYDANTIC) ---

class ClienteCreate(BaseModel):
    nome_empresa: str
    pessoa_contato: str
    email: str
    telefone: Optional[str] = None
    status: Optional[str] = "Lead"

class CampanhaCreate(BaseModel):
    titulo_acao: str
    descricao: str
    imagem_url: Optional[str] = None
    resultados_obtidos: Optional[str] = None
    data_realizacao: datetime.date
    visivel_publico: Optional[bool] = True

class PropostaCreate(BaseModel):
    cliente_id: int
    descricao_servico: str
    valor_proposta: float
    data_validade: Optional[datetime.date] = None

# --- ROTAS PRINCIPAIS ---

@app.get("/")
def home():
    return {"mensagem": "API MEI B2B rodando com banco de dados completo!"}

# --- ROTAS DE CLIENTES (CRM) ---

@app.get("/api/clientes")
def listar_clientes(db: Session = Depends(get_db)):
    return db.query(models.Cliente).all()

@app.post("/api/clientes")
def criar_cliente(cliente: ClienteCreate, db: Session = Depends(get_db)):
    novo_cliente = models.Cliente(**cliente.dict())
    db.add(novo_cliente)
    db.commit()
    db.refresh(novo_cliente)
    return novo_cliente

# --- ROTAS DE PORTFÓLIO (VITRINE PÚBLICA) ---

@app.get("/api/campanhas")
def listar_campanhas(db: Session = Depends(get_db)):
    # Retorna apenas as campanhas marcadas como visíveis ao público
    return db.query(models.Campanha).filter(models.Campanha.visivel_publico == True).all()

@app.post("/api/campanhas")
def cadastrar_campanha(campanha: CampanhaCreate, db: Session = Depends(get_db)):
    nova_campanha = models.Campanha(**campanha.dict())
    db.add(nova_campanha)
    db.commit()
    db.refresh(nova_campanha)
    return nova_campanha

# --- ROTAS DE PROPOSTAS COMERCIAIS ---

@app.get("/api/propostas")
def listar_propostas(db: Session = Depends(get_db)):
    return db.query(models.Proposta).all()

@app.post("/api/propostas")
def criar_proposta(proposta: PropostaCreate, db: Session = Depends(get_db)):
    # Verifica se o cliente existe antes de criar a proposta
    cliente_existe = db.query(models.Cliente).filter(models.Cliente.id == proposta.cliente_id).first()
    if not cliente_existe:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    
    nova_proposta = models.Proposta(**proposta.dict())
    db.add(nova_proposta)
    db.commit()
    db.refresh(nova_proposta)
    return nova_proposta