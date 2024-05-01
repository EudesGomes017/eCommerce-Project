#Project-Movie

O Projeto Ecommerce FullStack Angular and Spring Boot 

 <img src="/src/assets/angular.gif" alt="aprensentação do projeto">


## Tecnologias utilizadas Frontend
-Angular
-BootSStrap
-Typescript

## Tecnologias utilizadas Backend
-Spring boot
-Spring Data / JPA
-Spring security
-Docker
-MySql

## Repository
```

          <!-- loop over ther collection of products -->
          <div *ngFor="let tempProduct of products" class="col-md-3">

            <div class="product-box">
              <img src="{{ tempProduct.imageUrl}}" class="img-responsive">
              <h1>{{tempProduct.name}}</h1>
              <div class="price">{{tempProduct.unitPrice | currency:'USD'}}</div>
              <a href="#" class="primary-btn">Add to cart</a>



            </div>

          </div>
```

## Aprendizados
Este projeto me proporcionou a oportunidade de aprimorar minhas habilidades na criação de APIs, fornecendo controladores para que meu frontend faça as requisições necessárias.

## Dificuldades
Uma das principais dificuldades enfrentadas foi desenvolver a lógica para frontend  para deixar responsivo.
