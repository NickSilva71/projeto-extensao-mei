# 🚀 Portal B2B & CRM para Promoção de Vendas (MEI)

> **Projeto de Extensão Universitária**  
> **Disciplina:** Atividades Práticas Interdisciplinares de Extensão IV  
> **Curso:** Engenharia da Computação — Centro Universitário Maurício de Nassau (UNINASSAU)  
> **Tema Central:** Tecnologia para Inclusão Digital e Empoderamento Comunitário

---

## 📌 Contexto e Aplicação do Projeto

O projeto foi concebido para atender às necessidades reais do Microempreendedor Individual (MEI) atuante no segmento de **Promoção de Vendas** (CNAE 7319-0/02)[cite: 4] com forma de atuação registrada prioritariamente via **Internet**.

Sediado no município de **Paudalho - PE** (Chã de Cruz), o empreendimento opera na Região Metropolitana e na Zona da Mata Norte de Pernambuco. Por atuar no modelo *Business-to-Business* (B2B), a empresa necessita de ferramentas digitais próprias para prospectar clientes corporativos (marcas, comércios e supermercados), apresentar histórico de ações promocionais e emitir orçamentos formais de maneira profissional.

---

## 🎯 Objetivos

### Objetivo Geral
Desenvolver e implantar um **Portal Web de Portfólio B2B** integrado a um **Gerador de Propostas Comerciais** e um **CRM Simplificado**, promovendo a inclusão digital, a autonomia comercial e a modernização operacional do MEI.

### Objetivos Específicos
* 💼 **Gestão de Leads (CRM):** Organizar a prospecção de clientes corporativos e manter o histórico de negociações.
* 🖼️ **Portfólio Interativo:** Criar uma vitrine pública para exibição de campanhas promocionais e demonstrações realizadas no Ponto de Venda (PDV).
* 📄 **Automação de Orçamentos:** Gerar propostas comerciais padronizadas com os dados jurídicos do MEI.
* 📊 **Indicadores Comerciais:** Fornecer dados para acompanhamento da taxa de conversão de propostas e atendimento.

---

## 🛠️ Tecnologias Utilizadas

### Back-end & Banco de Dados
* **Python 3.10+** — Linguagem principal de desenvolvimento.
* **FastAPI** — Framework web assíncrono e de alto desempenho para a construção da API RESTful.
* **SQLAlchemy** — ORM para mapeamento objeto-relacional do banco de dados.
* **SQLite** — Banco de dados relacional leve para armazenamento local das informações.

### Front-end *(em desenvolvimento)*
* **HTML5 / CSS3 / JavaScript (ES6+)** ou **React / Next.js** — Estruturação de interface responsiva e moderna.

---

## 🗂️ Estrutura da Base de Dados

O banco de dados relacional é composto por três tabelas principais:
1. `clientes_corporativos` — Cadastro e acompanhamento de funil de vendas (CRM).
2. `campanhas_portfolio` — Registros de campanhas promocionais para exibição pública.
3. `propostas_comerciais` — Orçamentos vinculados aos clientes do CRM.

---

## 💻 Como Executar o Projeto Localmente

### Pré-requisitos
* Python 3.10 ou superior instalado.
* Git configurado.

### Passo a Passo

```bash
# 1. Clonar o repositório
git clone [https://github.com/SEU-USUARIO/projeto-extensao-mei.git](https://github.com/SEU-USUARIO/projeto-extensao-mei.git)

# 2. Acessar a pasta do backend
cd projeto-extensao-mei/backend

# 3. Criar e ativar o ambiente virtual
python -m venv venv
# No Windows:
venv\Scripts\activate

# 4. Instalar as dependências
pip install -r requirements.txt

# 5. Executar o servidor de desenvolvimento
uvicorn main:app --reload
