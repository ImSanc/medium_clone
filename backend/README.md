# Initialize Hono project 
- npm create hono@latest

# Database
- As this is a serverless project we will have to create connection pool for connecting to DB as serverless architecture can have multiple servers around the world they might try connecting from around the world but DB only have limited connections.

-Initialize prisma 
npm i prisma
npx prisma init 

- We need to put the original DB url in .env file (NOT THE CONNECTION POOL) as CLI uses DB url for creating schema.
- Connection pool url will go into wrangler.toml file in [vars] section 

- Migrate your Db
npx prisma migrate dev --name <migration name>

- create prisma clients but as this is serverless architecture we will not need engine 
npx prisma generate --no-engine

- Add accelerate extension to your project 
npm install @prisma/extension-accelerate