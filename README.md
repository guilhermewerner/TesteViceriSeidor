# Teste Técnico 

Vaga Desenvolvedor Full Stack na Viceri-Seidor

Este teste técnico consiste na criação de uma aplicação web utilizando Angular para o frontend e .NET para o backend. A aplicação é destinada ao gerenciamento de super-heróis, proporcionando operações CRUD (Create, Read, Update, Delete) em uma base de dados.

## Rodando

Para rodar o código deve ser aberta a solução no Visual Studio (usado a versão Community 2022). E executar separadamente o projeto da API e do WebApp.

## API

Desenvolvida com .NET 6 e Entity Framework, e documentação com swagger. O código-fonte se encontra na pasta `TesteViceriSeidor.Api` do repositório.

A API roda usando https na porta 7168, e a documentação pode ser encontrada ao acessar https://localhost:7168/swagger/index.html no seu navegador navegador local.

- [x] Cadastro de um novo super-herói
- [x] Listagem de super-heróis
- [x] Consulta de super-herói por Id
- [x] Atualização de informações do super-herói por Id
- [x] Exclusão de um super-herói por Id
- [x] Disponibilização da documentação da API utilizando o Swagger

### Documentação com Swagger
![image](https://github.com/GuilhermeWerner/TesteViceriSeidor/blob/main/Assets/Screenshot_142.png)

## Banco de Dados

Foi utilizado o banco de dados MySQL 8.0.35, que foi configurado em um container docker rodando em uma máquina virtual de testes na minha rede local.

Escolhi o MySQL por ter mais experiencia com ele, além de possuir facil configuração no meu ambiente.

O banco de dados foi criado usando a metodologia Code First do Entity Framework, então as definições dos modelos e migrations estão juntamente ao código da API.

## WebApp

O frontend se encontra na pasta `TesteViceriSeidor.App` do repositório e foi criado usando Angular 17.

Por ser minha primeira vez fazendo um projeto Angular do zero (já fiz pequenas manutenções em alguns projetos antes), optei por manter tudo na mesma página e utilizar modais (popups) para os formulários de edição e criação de heróis.

### Página de listagem
![image](https://github.com/GuilhermeWerner/TesteViceriSeidor/blob/main/Assets/Screenshot_143.png)

### Modal de cadastro
![image](https://github.com/GuilhermeWerner/TesteViceriSeidor/blob/main/Assets/Screenshot_144.png)

### Modal de edição
![image](https://github.com/GuilhermeWerner/TesteViceriSeidor/blob/main/Assets/Screenshot_145.png)

## Observações

Esse teste foi bastante interessante e divertido de fazer, a API foi bem mais tranquila, pois já tenho experiencia com .NET, Entity Framework e até mesmo com o Swagger. 

O maior desafio foi o frontend com Angular, onde eu tive alguns problemas na listagem dinâmica de superpoderes, já que eles são obtidos do banco de dados é necessários adicioná-los dinamicamente a página, porem é preciso ter uma referência deles para validar quais estão marcados (foi usado um checkbox para cada poder) e adicionar na lista de poderes do herói para fazer o POST na API.

## Portfólio

Sobre min, eu atualmente estou fazendo faculdade na PUC Minas e estagiando com ASP.NET e .NET Core. 

Além disso, eu tenho um projeto pessoal que consiste em um site de indexação e busca de servidores de jogos online, acessível por [esse link](https://www.tribufu.com).

![image](https://github.com/GuilhermeWerner/TesteViceriSeidor/blob/main/Assets/Screenshot_146.png)

O código-fonte é fechado, porem ele foi desenvolvido usando Rust para o backend, React com NextJS para o frontend e o banco de dados é um MariaDB, além de uma camada de cache de leitura com Redis.

Outra coisa muito interessante que passei nesse projeto pessoal foi o login via OAuth, atualmente é possível fazer login no site usando um nome de usuário e senha, além de login via a sua conta Steam com OpenID e do Discord e Google com OAuth2.

Login nesse site existe para as pessoas que jogam nos meus servidores de Minecraft ou ARK Survival, onde os status deles são sincronizados em suas contas, e exibidos em um [leaderboard dinâmico](https://www.tribufu.com/pt/leaderboard)

O leaderboard só mostra o top 20 jogadores, porem atualmente existem mais de 700 contas registradas 😁.
