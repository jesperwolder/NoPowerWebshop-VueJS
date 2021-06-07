# Order service

### Denne service kræver en .env og det kan testes via localhost, hvis databasen Orders er oprettet.
### Programmet skal nok selv oprette en collection så længe den kan finde databasen
```
MONGO_USERNAME=hemmelig
MONGO_PASSWORD=hemmelig
MONGO_HOST=176.20.223.225
MONGO_PORT=27017
MONGO_DATABASE=Orders

JWT=hemmelig

AuthService=http://server.topper144p.com:3000/
ProductService=http://server.topper144p.com:3001/
```

## Se routing.md for information omkring requests