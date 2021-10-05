# Express + GraphQL
Criação de uma API GraphQL em Node.js que simula movimentações de uma conta corrente

## Tecnologias
- Node.js
  * Uso do framework Express
- Docker
  * Uso do Docker Compose para aplicação em Node.js e o banco de dados
- Banco de Dados MongoDB
- Testes unitários feitos utilizando Jest e Supertest

## Instalação
Para utilizar o projeto é necessário ter o Docker e Docker Compose instalado.

Para começar a utilizar deve-se clonar o repositório:

```bash
git clone https://github.com/douglas-fabiano/express-graphql.git

cd express_graphql
```

Depois de clonar o repositório executar os seguintes comando para utilização:

```bash
docker-compose build
docker-compose up
```

Feito isto, o container Docker já estará funcionando, e poderá utilizar acessando o seguinte endereço:
- http://localhost:8000

## Comandos
- Para parar o container:
Pode-se usar CTRL+C ou o seguinte comando:

```bash
docker-compose stop
```

- Para retomar o uso do container:

```bash
docker-compose start
```

- Para criar os containers novamente após alterações no código:

```bash
docker-compose up --build
```

- Para rodar os containers sem travar o terminal:

```bash
docker-compose up -d
```

## Funcionamento
Ao utilizar o serviço pela primeira vez, o Banco de Dados é inicializado com 3 contas correntes para permitir a realização de testes.

Os números dessas contas são: `28920`, `15232` e `47256`. Inicialmente as contas possuem um saldo de `100`.

O projeto utiliza a interface gráfica do GraphQL para poder testar e utilizar a API.

As requisições que podem ser feitas são as seguintes:

- Checar saldo da conta:

```bash
  query {
    saldo(conta: 15232) {
      conta
      saldo
    }
  }
```

- Sacar um valor:

```bash
  mutation {
    sacar(conta: 15232, valor: 35) {
      conta
      saldo
    }
  }
```

- Depositar um valor:

```bash
  mutation {
    depositar(conta: 15232, valor: 50) {
      conta
      saldo
    }
  }
```

## Testes Unitários
O projeto também possuí testes unitários para verificar o funcionamento da API e das funções que acessam e alteram o Banco de dados.

Primeiro deve-se instalar as dependências para poder realizar os testes:

```bash
  yarn install
```

Posteriormente utilizar o comando abaixo para rodar os testes:

```bash
  yarn test
```

Obs: Para o funcionamento total dos testes, os containers do Docker acima deverão estar em funcionamento.
