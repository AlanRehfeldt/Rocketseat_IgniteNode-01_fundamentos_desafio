
# 01-desafio-fundamentos-node

## Descrição

Este projeto é uma API simples de gerenciamento de tarefas, construída com Node.js. A API permite criar, listar, atualizar, deletar e marcar tarefas como completas. Além disso, oferece a funcionalidade de importar tarefas a partir de um arquivo CSV.

## Instalação

Para começar a usar este projeto, siga as etapas abaixo:

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/01-desafio-fundamentos-node.git
   cd 01-desafio-fundamentos-node
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

## Uso

### Executando o Servidor

Para iniciar o servidor, execute o comando:
```sh
npm run dev
```
O servidor estará disponível em `http://localhost:3333`.

### Endpoints

#### Criar Tarefa
- **URL**: `/tasks`
- **Método**: `POST`
- **Body**:
  ```json
  {
    "title": "Título da tarefa",
    "description": "Descrição da tarefa"
  }
  ```
- **Resposta**: `201 Created`
  ```json
  {
    "id": "uuid",
    "title": "Título da tarefa",
    "description": "Descrição da tarefa",
    "completed_at": null,
    "created_at": "data de criação",
    "updated_at": "data de atualização"
  }
  ```

#### Listar Tarefas
- **URL**: `/tasks`
- **Método**: `GET`
- **Parâmetros de Query** (opcional):
  - `search`: termo para buscar no título ou descrição
- **Resposta**: `200 OK`
  ```json
  [
    {
      "id": "uuid",
      "title": "Título da tarefa",
      "description": "Descrição da tarefa",
      "completed_at": null,
      "created_at": "data de criação",
      "updated_at": "data de atualização"
    }
  ]
  ```

#### Atualizar Tarefa
- **URL**: `/tasks/:id`
- **Método**: `PUT`
- **Body** (ao menos um dos campos):
  ```json
  {
    "title": "Novo título",
    "description": "Nova descrição"
  }
  ```
- **Resposta**: `200 OK`
  ```json
  {
    "id": "uuid",
    "title": "Novo título",
    "description": "Nova descrição",
    "completed_at": null,
    "created_at": "data de criação",
    "updated_at": "data de atualização"
  }
  ```

#### Deletar Tarefa
- **URL**: `/tasks/:id`
- **Método**: `DELETE`
- **Resposta**: `204 No Content`

#### Marcar Tarefa como Completa
- **URL**: `/tasks/:id/complete`
- **Método**: `PATCH`
- **Resposta**: `200 OK`
  ```json
  {
    "id": "uuid",
    "title": "Título da tarefa",
    "description": "Descrição da tarefa",
    "completed_at": "data de conclusão",
    "created_at": "data de criação",
    "updated_at": "data de atualização"
  }
  ```

### Importar Tarefas do CSV

Para importar tarefas de um arquivo CSV, execute o comando:
```sh
npm run seed
```
O arquivo CSV deve estar no diretório raiz do projeto com o nome `tasks.csv`.

## Dependências

- [csv-parse](https://www.npmjs.com/package/csv-parse): ^5.5.6

## Licença

Este projeto está licenciado sob a licença MIT.
