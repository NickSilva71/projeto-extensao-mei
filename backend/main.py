from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
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

# Configuração de CORS para permitir que o Front-end faça requisições para a API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite chamadas de qualquer origem em ambiente de desenvolvimento
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
    return {"mensagem": "API MEI B2B rodando com suporte a CORS!"}

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
    cliente_existe = db.query(models.Cliente).filter(models.Cliente.id == proposta.cliente_id).first()
    if not cliente_existe:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    
    nova_proposta = models.Proposta(**proposta.dict())
    db.add(nova_proposta)
    db.commit()
    db.refresh(nova_proposta)
    return nova_proposta

# --- ROTAS DE EXCLUSÃO (DELETE) ---

@app.delete("/api/clientes/{cliente_id}")
def deletar_cliente(cliente_id: int, db: Session = Depends(get_db)):
    cliente = db.query(models.Cliente).filter(models.Cliente.id == cliente_id).first()
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    db.delete(cliente)
    db.commit()
    return {"mensagem": "Cliente excluído com sucesso"}

@app.delete("/api/campanhas/{campanha_id}")
def deletar_campanha(campanha_id: int, db: Session = Depends(get_db)):
    campanha = db.query(models.Campanha).filter(models.Campanha.id == campanha_id).first()
    if not campanha:
        raise HTTPException(status_code=404, detail="Campanha não encontrada")
    db.delete(campanha)
    db.commit()
    return {"mensagem": "Campanha excluída com sucesso"}

@app.delete("/api/propostas/{proposta_id}")
def deletar_proposta(proposta_id: int, db: Session = Depends(get_db)):
    proposta = db.query(models.Proposta).filter(models.Proposta.id == proposta_id).first()
    if not proposta:
        raise HTTPException(status_code=404, detail="Proposta não encontrada")
    db.delete(proposta)
    db.commit()
    return {"mensagem": "Proposta excluída com sucesso"}

# --- ESQUEMAS PARA ATUALIZAÇÃO (PUT) ---

class ClienteUpdate(BaseModel):
    nome_empresa: str
    pessoa_contato: str
    email: str
    telefone: Optional[str] = None
    status: Optional[str] = "Lead"

class CampanhaUpdate(BaseModel):
    titulo_acao: str
    descricao: str
    resultados_obtidos: Optional[str] = None
    data_realizacao: str
    visivel_publico: Optional[bool] = True

class PropostaUpdate(BaseModel):
    cliente_id: int
    descricao_servico: str
    valor_proposta: float
    data_validade: Optional[str] = None
    status: Optional[str] = "Pendente"

# --- ROTAS DE EDIÇÃO (PUT) ---

@app.put("/api/clientes/{cliente_id}")
def atualizar_cliente(cliente_id: int, cliente_data: ClienteUpdate, db: Session = Depends(get_db)):
    cliente = db.query(models.Cliente).filter(models.Cliente.id == cliente_id).first()
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    
    # Extrai os dados enviados na requisição
    dados = cliente_data.model_dump() if hasattr(cliente_data, 'model_dump') else cliente_data.dict()
    for chave, valor in dados.items():
        setattr(cliente, chave, valor)
        
    db.commit()
    db.refresh(cliente)
    return cliente


@app.put("/api/campanhas/{campanha_id}")
def atualizar_campanha(campanha_id: int, campanha_data: CampanhaUpdate, db: Session = Depends(get_db)):
    campanha = db.query(models.Campanha).filter(models.Campanha.id == campanha_id).first()
    if not campanha:
        raise HTTPException(status_code=404, detail="Campanha não encontrada")
    
    dados = campanha_data.model_dump() if hasattr(campanha_data, 'model_dump') else campanha_data.dict()
    for chave, valor in dados.items():
        setattr(campanha, chave, valor)
        
    db.commit()
    db.refresh(campanha)
    return campanha


@app.put("/api/propostas/{proposta_id}")
def atualizar_proposta(proposta_id: int, proposta_data: PropostaUpdate, db: Session = Depends(get_db)):
    proposta = db.query(models.Proposta).filter(models.Proposta.id == proposta_id).first()
    if not proposta:
        raise HTTPException(status_code=404, detail="Proposta não encontrada")
    
    dados = proposta_data.model_dump() if hasattr(proposta_data, 'model_dump') else proposta_data.dict()
    for chave, valor in dados.items():
        setattr(proposta, chave, valor)
        
    db.commit()
    db.refresh(proposta)
    return proposta