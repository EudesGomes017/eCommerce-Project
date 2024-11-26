#Ecommerce FullStack - Angular & Spring Boot


 <img src="assets/angular.gif" alt="aprensentação do projeto">


Este projeto é uma aplicação de ecommerce desenvolvida utilizando Angular para o frontend e Spring Boot para o backend. O objetivo do sistema é permitir que os usuários façam compras online, com funcionalidades como visualização de produtos, adição ao carrinho, pagamento via Stripe e autenticação segura.


Tecnologias Utilizadas
Frontend
Angular: Framework JavaScript moderno para a criação de aplicativos de página única (SPA).
TypeScript: Superset de JavaScript, utilizado para garantir um código mais estruturado e com tipagem estática.
Bootstrap: Framework CSS para garantir uma interface responsiva e moderna.
RxJS: Biblioteca para programação reativa, utilizada para gerenciar requisições assíncronas e eventos no frontend.
Backend
Spring Boot: Framework Java para a criação de APIs RESTful, facilitando o desenvolvimento de aplicações baseadas em microserviços.
Spring Data JPA: Para mapeamento objeto-relacional e persistência em bancos de dados relacionais.
Spring Security: Para autenticação e autorização, garantindo que apenas usuários autenticados possam acessar determinadas rotas.
Docker: Para contêinerização da aplicação, garantindo que o ambiente de desenvolvimento seja replicável e escalável.
MySQL: Banco de dados relacional utilizado para persistência dos dados da aplicação.
Outros Recursos
Stripe: Integração para processamento de pagamentos, permitindo que os usuários façam compras de forma segura.
TLS/SSL com Certificado Autoassinado: Para garantir que a comunicação entre o cliente e o servidor seja criptografada.
Guarda de Rotas (Route Guards): Implementação para controlar o acesso às rotas, garantindo que somente usuários autenticados possam acessar certas páginas.
Funcionalidades
Cadastro e Autenticação de Usuários: Utiliza Spring Security para autenticação JWT, garantindo uma experiência segura para os usuários.
Visualização de Produtos: Os produtos são exibidos em uma galeria com suas respectivas informações, como nome, preço e imagem.
Carrinho de Compras: Funcionalidade para adicionar produtos ao carrinho e realizar o checkout.
Processamento de Pagamentos: Integração com a API Stripe para pagamentos com cartão de crédito.
Responsividade: Interface totalmente responsiva, adaptável a dispositivos móveis e desktops.
Estrutura do Projeto
Frontend (Angular)
A estrutura do frontend foi criada com Angular e segue a arquitetura padrão de módulos, componentes, e serviços. Os principais módulos são:

AppModule: Módulo principal que carrega os outros módulos e configura a aplicação.
AuthModule: Responsável por login, logout e guarda de rotas (protegendo páginas com autenticação).
ProductModule: Gerencia a exibição e interatividade dos produtos.
CartModule: Gerencia o carrinho de compras e a interação com o backend para o processamento de pedidos.
Backend (Spring Boot)
A estrutura do backend foi criada com Spring Boot, utilizando a arquitetura baseada em camadas. As principais camadas incluem:

Controller: Responsável por expor as APIs REST para o frontend.
Service: Contém a lógica de negócios, interagindo com o banco de dados e realizando operações de manipulação de dados.
Repository: Responsável pela persistência dos dados utilizando Spring Data JPA.
Security: Configurações de segurança para autenticação, autorização e criptografia.
Exemplo de Código (Frontend - Angular)
Aqui está um exemplo de como a galeria de produtos foi implementada no Angular:

html
Copiar código
<!-- Loop sobre a coleção de produtos -->
<div *ngFor="let tempProduct of products" class="col-md-3">
  <div class="product-box">
    <img [src]="tempProduct.imageUrl" class="img-responsive">
    <h1>{{ tempProduct.name }}</h1>
    <div class="price">{{ tempProduct.unitPrice | currency:'USD' }}</div>
    <button (click)="addToCart(tempProduct)" class="primary-btn">Adicionar ao carrinho</button>
  </div>
</div>
Como Executar o Projeto
Pré-requisitos
Node.js e npm: Para executar o frontend Angular.
Java 11+: Para rodar o backend Spring Boot.
MySQL: Para o banco de dados relacional.
Docker: Caso queira executar a aplicação em containers.
Passo a Passo para Configuração
Backend (Spring Boot)
Clone o repositório:

bash
Copiar código
git clone https://github.com/usuario/ecommerce-fullstack.git
cd ecommerce-backend
Configure as variáveis de ambiente para o banco de dados no arquivo application.properties:

properties
Copiar código
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db
spring.datasource.username=root
spring.datasource.password=senha
Execute o backend com o Maven:

bash
Copiar código
mvn spring-boot:run
Frontend (Angular)
Clone o repositório:

bash
Copiar código
git clone https://github.com/usuario/ecommerce-fullstack.git
cd ecommerce-frontend
Instale as dependências do projeto:

bash
Copiar código
npm install
Inicie o servidor de desenvolvimento:

bash
Copiar código
ng serve
A aplicação estará disponível em http://localhost:4200.

Contribuindo
Sinta-se à vontade para contribuir com este projeto! Se você encontrou algum bug ou tem uma sugestão de melhoria, por favor, abra um issue ou envie um pull request.

Licença
Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para mais detalhes.

Esse modelo de README é organizado, detalhado e inclui todas as informações essenciais sobre o projeto, como tecnologias utilizadas, funcionalidades, estrutura do código e como rodar a aplicação. Com isso, o seu projeto fica mais claro e acessível para outros desenvolvedores que queiram contribuir ou utilizar o código.

