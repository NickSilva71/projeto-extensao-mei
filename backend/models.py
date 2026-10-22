from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, ForeignKey, Date
from sqlalchemy.orm import relationship
from database import Base
import datetime

# 1. Tabela de CRM: Clientes Corporativos
class Cliente(Base):
    __tablename__ = "clientes_corporativos"

    id = Column(Integer, primary_key=True, index=True)
    nome_empresa = Column(String(150), nullable=False)
    pessoa_contato = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, index=True, nullable=False)
    telefone = Column(String(20))
    status = Column(String(50), default="Lead")  # Ex: Lead, Em Negociação, Cliente Ativo
    criado_em = Column(DateTime, default=datetime.datetime.utcnow)

    # Relacionamento com as propostas comerciais
    propostas = relationship("Proposta", back_populates="cliente")

# 2. Tabela de Portfólio: Campanhas Promocionais
class Campanha(Base):
    __tablename__ = "campanhas_portfolio"

    id = Column(Integer, primary_key=True, index=True)
    titulo_acao = Column(String(200), nullable=False)
    descricao = Column(Text, nullable=False)
    imagem_url = Column(String(255), nullable=True)
    resultados_obtidos = Column(Text, nullable=True)  # Ex: "1000 abordagens e 300 amostras entregues"
    data_realizacao = Column(Date, nullable=False)
    visivel_publico = Column(Boolean, default=True)
    criado_em = Column(DateTime, default=datetime.datetime.utcnow)

# 3. Tabela do Gerador: Propostas Comerciais
class Proposta(Base):
    __tablename__ = "propostas_comerciais"

    id = Column(Integer, primary_key=True, index=True)
    cliente_id = Column(Integer, ForeignKey("clientes_corporativos.id", ondelete="CASCADE"), nullable=False)
    descricao_servico = Column(Text, nullable=False)
    valor_proposta = Column(Float, nullable=False)
    status = Column(String(50), default="Enviada")  # Ex: Enviada, Aprovada, Recusada
    data_validade = Column(Date, nullable=True)
    criado_em = Column(DateTime, default=datetime.datetime.utcnow)

    # Relacionamento com o cliente
    cliente = relationship("Cliente", back_populates="propostas")