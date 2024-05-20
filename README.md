### **Descrição**
Este projeto é uma API desenvolvida em Node.js com TypeScript para gerenciar marcação de consultas médicas. Ele inclui funcionalidades como autenticação JWT, agendamento de consultas, geração de PDFs e documentação Swagger.

### **Funcionalidades Principais**
Autenticação de usuários com JWT.
CRUD de consultas médicas.
Geração de PDFs com detalhes das consultas.
Documentação completa com Swagger.

### **Tecnologias Utilizadas**
Node.js
TypeScript
Express.js
PostgreSQL
TypeORM
JWT para autenticação
bcrypt.js para criptografia de senhas
PDFKit para geração de PDFs
Swagger para documentação da API

### **Configuração do Projeto**
Clone o repositório: git clone git@github.com:Guuzih/Marca-o-de-consulta.git
Instale as dependências: **npm install**
Compile o TypeScript: **npx tsc**
Inicialize o servidor: **node dist/server.js**

**Estrutura do Projeto**

├── src/
│   ├── config/
│   │   └── database.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── appointmentController.ts
│   ├── middlewares/
│   │   └── authMiddleware.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── Appointment.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── appointmentRoutes.ts
│   ├── utils/
│   │   ├── pdfGenerator.ts
│   ├── app.ts
│   ├── server.ts

**Rotas Principais**
/api/auth/register - Registro de usuários.
/api/auth/login - Login de usuários.
/api/appointments - CRUD de consultas médicas.
/api/appointments/:id/pdf - Visualização do PDF com detalhes da consulta.
Documentação da API
A documentação completa da API está disponível em **http://localhost:3000/api-docs** após iniciar o servidor.

**Testes**
Certifique-se de testar todas as funcionalidades antes de colocar em produção.
Você pode adicionar exemplos de requisições na documentação Swagger para facilitar o entendimento.

**Observações**
Para segurança em produção, lembre-se de configurar corretamente o JWT_SECRET e as credenciais do banco de dados no arquivo .env.
Certifique-se de seguir as boas práticas de segurança e proteção de dados ao lidar com informações sensíveis dos usuários.