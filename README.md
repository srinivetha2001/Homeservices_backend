## Node.js GraphQL + MongoDB (Auth-first)

### Quick start
- Copy `env.example` to `.env` and adjust values.
- Ensure MongoDB is running and `MONGO_URI` is correct.
- Install deps and start:

```bash
npm install
npm run dev
```

GraphQL Playground: `http://localhost:4000/graphql`

### Auth
- Register:
```graphql
mutation Register($input: RegisterInput!) {
  register(input: $input) { accessToken user { id email name } }
}
```
Vars:
```json
{ "input": { "email": "user@example.com", "name": "User", "password": "StrongPass123!" } }
```

- Login:
```graphql
mutation Login($input: LoginInput!) {
  login(input: $input) { accessToken user { id email } }
}
```

- Me (needs `Authorization: Bearer <token>`):
```graphql
query { me { id email name roles } }
```

### Scripts
- `npm run dev` — Start dev server with HMR
- `npm run build` — Type-check and build to `dist/`
- `npm start` — Run compiled server
- `npm run typecheck` — Type-check only

### Project structure
```
src/
  config/env.ts        # env + validation
  db/connect.ts        # Mongo connection
  models/User.ts       # User model
  schema/              # GraphQL schema & resolvers
  utils/               # jwt, password helpers
  types/context.ts     # GraphQL context type
  server.ts            # Express + Apollo wiring
  index.ts             # entrypoint
```

### Security & best practices
- Validated env via `envalid`
- Password hashing via `bcryptjs`
- JWT-based access token
- `helmet`, `cors`, `morgan` middlewares
- Minimal attack surface in GraphQL (auth-aware `context`)


