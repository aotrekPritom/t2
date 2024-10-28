# Node.js(Express js) TypeScript Prisma with PostgreSQL Application(Book Store Server)

This is a sample Prisma (ORM) Node.js application written in TypeScript and using postgreSql as a database.With secure user authentication (jwt).

## Requirements

Before you run locally, ensure that you must have the following requirements:

- Node.js installed
- npm package manager installed
- typescript installed
- PostgreSQL installed and running locally

## Getting Started

1. **First clone the repository:**

   ```bash
   git clone https://github.com/roy-Pritom/Book-Store-Server
   cd change the directory
2. **Install Dependencies:**

   ```bash
   npm install
   make sure all package properly installed.
   (If you face any problem with prisma then follow the instruction)
   For prisma go to prisma.io
   install prisma and Prisma client properly for ts and postgreSql version.
3. **Set supabase for server (optional)**

   ```bash
   If you want to host on supabase free
   Create a account on supabase.Then create a project and remember the password.In project setting database section there is a Connection string copy the uri for connect to your server.
4. **Configuration(.env):**

   ```bash
   Create a .env file in the root of your project
   DATABASE_URL=put_your_postgre_userename_and_password
   postgresql://<username>:<password>@localhost:5432/mydb?schema=public
   PORT=server_port
   ACCESS_TOKEN_SECRET=your jwt access token secret
   ACCESS_TOKEN_EXPIRESIN=your jwt access token expire time
   REFRESH_TOKEN_SECRET=your jwt refresh token secret
   REFRESH_TOKEN_EXPIRESIN=your jwt refresh token expire time
5. **Build the typescript code:**

   ```bash
   npm run build
6. **Run Application(development):**

   ```bash
   npm run start:dev
7. **Prisma migrate:**

   ```bash
   npx prisma migrate dev --name init
8. **Run Application(production):**

   ```bash
   npm run start:prod
9. **See code problems(eslint):**

   ```bash
   npm run lint
10. **Schema Model:**

   ```bash
   User
   Author
   Book
   ```
11. **Schema Model Relation:**

- **User Model:**
  - One-to-One relationship with Author .


- **Author Model:**
  - One-to-One relationship with User.
  - One-to-Many relationship with Travel Book (each author can have multiple books).

- **Book Model:**
  - One-to-One relationship with Author (each book have one author).

12. **Api end points:**
   ```
   Author Registration
   Endpoint: /authors
   Method:POST
   put appropriate json data

   User Login
   Endpoint: /auth/login
   Method:POST

   Get All Paginated and Filtered Authors
   Endpoint: /authors?your_query
   Method:GET
   Request Headers:Authorization: <JWT_TOKEN>

   Get Single Author
   Endpoint: /authors/:id
   Method: GET
   Headers:Authorization: <JWT_TOKEN>

   Update Author
   Endpoint: /authors/:id
   Method:PUT
   Request Headers:Authorization: <JWT_TOKEN>

   Delete Author
   Endpoint: /authors/:id
   Method:DELETE
   Request Headers:Authorization: <JWT_TOKEN>

   Retrieve a list of all books written by a specific author
   Endpoint: /authors/:id/books
   Method:DELETE
   Request Headers:Authorization: <JWT_TOKEN>
   
   *Book

   Get All Paginated and Filtered Books
   Endpoint: /books?your_query
   Method:GET
   Request Headers:Authorization: <JWT_TOKEN>

   Get Single Book
   Endpoint: /books/:id
   Method: GET
   Headers:Authorization: <JWT_TOKEN>

   Update Book
   Endpoint: /books/:id
   Method:PUT
   Request Headers:Authorization: <JWT_TOKEN>

   Delete Book
   Endpoint: /books/:id
   Method:DELETE
   Request Headers:Authorization: <JWT_TOKEN>

   Retrieve a list of all books by a specific author.
   Endpoint: /books/author/:id
   Method:DELETE
   Request Headers:Authorization: <JWT_TOKEN>
   ```

