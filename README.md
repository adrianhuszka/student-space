## Futtatás

- Először futtasd a backend projekteket, a megfelelő sorrendben

  - API Gateway, Discovery Server
  - Szolgáltatások

- Majd a frontend projekt:

```bash
npm run dev
# vagy
yarn dev
# vagy
pnpm dev
# vagy
bun dev
```

Nyisd meg [http://localhost:3000](http://localhost:3000) böngészőben.

## Build

- `npm run build` parancs
- mappák másolása
  - `public`-> `.next/standalone`
  - `.next/static` -> `.next/standalone/static`

## DB schema

[link](https://dbdiagram.io/d/Szakdoga-661e204003593b6b6117139f)
