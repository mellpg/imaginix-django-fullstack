# Imaginix: Sistema Integrado de Gestão e Vitrine Web 🧸💻

O **Imaginix** é uma aplicação web full-stack desenvolvida para simular a operação de uma loja de brinquedos moderna. O projeto evoluiu de um protótipo de interface estática para uma aplicação monolítica integrada de alta performance, utilizando o padrão arquitetural **MVT do Django** acoplado a rotas assíncronas no front-end via **JavaScript (Fetch API)**.

---

## 🚀 Funcionalidades Chave

* **Vitrine Dinâmica de Produtos:** Carregamento assíncrono de dados do banco SQLite diretamente para componentes visuais dinâmicos.
* **Mecanismo de Busca Instantânea (Instant Search):** Filtragem de estoque em memória global no front-end em tempo real (sem recarregamento de página).
* **Controle de Fluxo e Regras de Negócio:** Decremento automático de estoque com atualização assíncrona do DOM. Bloqueio automático de compras se o estoque atingir zero e exibição de alertas programáticos personalizados (Modais/Toasts).
* **Persistência e Cadastro:** Formulários de cadastro de novos itens e agendamento de serviços de oficina integrados de forma segura ao ORM do Django.

---

## 📐 Arquitetura do Sistema

O projeto foi estruturado seguindo as melhores práticas de portabilidade e segurança de dados, utilizando uma **Arquitetura Monolítica Integrada**:

* **Model:** Modelagem relacional e abstração de tabelas através do ORM do Django (`Brinquedo` e `AgendamentoServico`).
* **View:** Processamento de lógica de negócio e fornecimento de endpoints que retornam dados estruturados em JSON ou renderizam templates HTML.
* **Template:** Interface rica e dinâmica utilizando o motor de templates nativo do Django e estilização com Bootstrap 5.
* **Static Assets:** Controle centralizado de mídias e do comportamento dinâmico da página através de arquivos estáticos configurados de maneira portável.

---

## 🛠️ Tecnologias Utilizadas

* **Back-end:** Python, Django 6.x (ORM)
* **Banco de Dados:** SQLite (Desenvolvimento/Testes)
* **Front-end:** HTML5, CSS3, Bootstrap 5, JavaScript (ES6+ / Fetch API)

---

## 💻 Como Rodar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter o **Python 3.10+** instalado em sua máquina.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/imaginix-django-fullstack.git](https://github.com/seu-usuario/imaginix-django-fullstack.git)
   cd imaginix-django-fullstack
2. **Crie e ative um ambiente virtual:**
   ```bash
   No Windows: python -m venv venv
   .\venv\Scripts\activate
   No Linux/macOS:
   python3 -m venv venv
   source venv/bin/activate
3. **Instale as dependências:**
   ```bash
   pip install django
4. **Execute as migrações para estruturar o banco de dados e carregar os dados iniciais:**
   ```bash
    python manage.py migrate
5. **Inicie o servidor de desenvolvimento:**
   ```bash
   python manage.py runserver
