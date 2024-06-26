# GerenciamentoUsuariosFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.3.

# CRUD de Usuários e Departamentos (Angular + Java)

Este projeto é um aplicativo de gerenciamento de usuários e departamentos, desenvolvido em Angular e integrado com uma API Java. Ele permite listar, cadastrar, editar e excluir dados de usuários e departamentos.

## Estrutura do Projeto

### 1. Layout

O componente `Layout` organiza a aplicação e pode incluir elementos como cabeçalho, rodapé e barra lateral.

### 2. Componentes

- **Home Component:**
  - Página inicial da aplicação.
- **Usuários (User) Component:**
  - Exibe a lista de usuários.
  - Funcionalidades: adicionar, editar e excluir usuários.
- **Departamentos (Department) Component:**
  - Exibe a lista de departamentos.
  - Funcionalidades: adicionar e excluir departamentos.

### 3. Modais

- **Cadastrar Usuários (User Register) Modal:**
  - Formulário para registrar novos usuários.
- **Editar Usuários (Edit User) Modal:**
  - Permite editar informações de um usuário existente.
- **Cadastrar Departamentos (Department Register) Modal:**
  - Formulário para registrar novos departamentos.

### 4. Modelos (Models)

- **User Model:**
  - Define a estrutura de dados para usuários (campos como nome, e-mail, etc.).
- **Department Model:**
  - Define a estrutura de dados para departamentos.

### 5. Ambiente (Environment)

- O arquivo `environment.ts` contém configurações de variáveis de ambiente, como URLs da API.

## Configuração

1. Clone o repositório da API Java: [user-manager](https://github.com/leomiclos/user-manager).
2. Siga as instruções para configurar e executar a API.
3. Instale as dependências do projeto Angular (listadas no `package.json`).
4. Execute o aplicativo Angular usando `ng serve`.

## Observações

- Personalize os estilos e layouts conforme necessário.
- Implemente as funcionalidades de CRUD nos componentes relevantes.
- Adicione mais detalhes específicos à medida que desenvolve a aplicação.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
