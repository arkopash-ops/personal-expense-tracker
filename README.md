## Setup
1. frontend Setup
```cmd
npm create vite@latest frontend
```
- Download Bootstrap
```cmd
npm install bootstrap@5.3.8
npm i bootstrap-icons
```

2. Backend Setup
```cmd
-- Initialize a Node project
npm init -y

-- Runtime dependencies
npm install express mongoose cors dotenv jsonwebtoken bcryptjs

-- Dev dependencies
npm install -D typescript tsx @types/node @types/express @types/cors @types/jsonwebtoken @types/bcryptjs

-- Initialize TypeScript
npx tsc --init
```

- Update package.json
```json
"scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
},
"type": "module",
```
---
## .env Variable
```env
PORT=8080
MONGO_DB_CONNECTION=mongodb://localhost:27017/expence-tracker
JWT_SECRET=myJWTSecret
```
---
## How to run Project 
1. Open Client and Server in cmd.
2. write command `npm run dev` to run.
---
## Postman Collection
https://ark-opash-9981939.postman.co/workspace/Default-workspace~87b50153-914c-4c4c-b846-f11ba97b7c44/collection/52166153-736b36d2-cb9e-47d1-935e-137b8d9ddd5f?action=share&creator=52166153