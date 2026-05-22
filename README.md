# albumcolegium.github.io

## Base de datos

- Esquema SQL: `db/schema.sql`
- Seed inicial: `db/seed.sql`

## Frontend

- La lógica compartida ahora vive en [app.js](/Users/martin_sztajn/Desktop/albumcolegium.github.io/app.js).
- `index.html` espera un cliente de Supabase cargado por CDN.

## Para dejarlo compartido

1. Crear un proyecto en Supabase.
2. Ejecutar `db/schema.sql`.
3. Ejecutar `db/seed.sql`.
4. Reemplazar en [app.js](/Users/martin_sztajn/Desktop/albumcolegium.github.io/app.js) los placeholders `PUT_SUPABASE_URL_HERE` y `PUT_SUPABASE_ANON_KEY_HERE`.

Con eso, `usuarios`, `figuritas`, `usuario_figuritas`, `intercambios`, `mensajes` y `comentarios` quedan sincronizados entre usuarios.
