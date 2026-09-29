# Creactivos · Admin del blog

Panel para administrar <https://creactivosaudiovisual.blogspot.com/> con la Blogger API v3 (Next.js).

Funciones: listar entradas (publicadas, borradores, programadas), crear, editar, publicar / pasar a borrador y eliminar.

## Puesta en marcha

1. En Google Cloud: crea un proyecto, activa **Blogger API v3** y crea un **OAuth Client ID** (Web application) con la redirect URI `http://localhost:3000/api/blogger/callback` (y la de producción si aplica).
2. `cp .env.example .env.local` y rellena `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.
3. `npm install && npm run dev`, entra a <http://localhost:3000>.
4. Ve a **Conexión → Conectar con Google** con la cuenta dueña del blog. Copia el `BLOGGER_REFRESH_TOKEN` que se muestra a tu `.env.local` y reinicia.

El Blog ID se resuelve solo a partir de la URL del blog (o fíjalo con `BLOGGER_BLOG_ID`). Nunca subas `.env*` al repo.
