# Currency Conversion

## Currency Conversion Service using Nestjs, Typeorm & Postgresql

### Local Setup

```sh
npm run typeorm:run-migrations  # Apply migrations to db
npm run start:dev               # Start the project
docker-compose up               # docker-compose up (Run postgres)
docker-compose down             # docker-compose down (Shutdown postgres)
```

### Documentation

```sh
SWAGGER DOCUMENTATION: http://localhost:3000/api
```

### Pulling from Docker hub

```sh
docker pull ozandozel/smart_wallet_ruut_ozandozel:latest
```

### Entity Descriptions

User has email and password fields. It also has wallets for different currencies.

Currency just consists of the name and description for each different currency.

Exchange is a currency pair. It shows what is the current rate between `from` and `to` fields. Markup is the markup rate that we will use when the offer is created.

Each wallet belongs to a user. It also connected to the currency model. It holds the balance information as well.

Offer can be created by a user to transfer a certain amount from one wallet to the other. Amount corresponds that will be reduced from source wallet. Rate is the calculated rate using that exchange's rate and markup values.
