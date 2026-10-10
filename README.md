# Creactivos Audiovisual · sitio y administración

Sitio web de Creactivos con un panel sencillo para actualizar textos, fotos, noticias y documentos sin tocar código. Hecho con Next.js.

- **Sitio público**: `/` (portada, quiénes somos, galería, noticias, contacto), `/sazon-y-fogon`, `/crea-cine-infantil`, `/minas-de-salento`, `/ruta`, `/permanencia-esal`.
- **Panel**: `/admin` (se entra desde `/login` con una contraseña). Un formulario por sección, fotos que se suben o se eligen de una biblioteca, y botón **Guardar cambios**.
- **Publicación**: pensado para [Railway](RAILWAY.md).
- **Blogger (opcional)**: desde `/blogger` se pueden crear, editar, publicar y eliminar las entradas de <https://creactivosaudiovisual.blogspot.com/>. Ver [Conectar Blogger](#conectar-blogger-opcional).

## En tu computador

```bash
cp .env.example .env.local   # rellena ADMIN_PASSWORD y ADMIN_SESSION_SECRET
npm install
npm run dev                  # http://localhost:3000
```

El contenido editado y las fotos subidas quedan en `./data` (ignorado por Git). Para publicar en Railway sigue [RAILWAY.md](RAILWAY.md).

## Cómo está organizado

| Qué | Dónde |
|---|---|
| Textos originales del sitio | `src/lib/content-defaults.ts` (a partir de `site.ts` y `blog-content.ts`) |
| Campos y validación de cada formulario del panel | `src/lib/content-schema.ts` |
| Almacenamiento (JSON + respaldos) y fotos subidas | `src/lib/content.ts`, `src/lib/uploads.ts` |
| Páginas públicas | `src/app/(site)/` |
| Panel | `src/app/admin/`, `src/components/admin/Editor.tsx` |

Para añadir un campo editable: agrégalo a `content-types.ts`, a los valores iniciales y al esquema; el formulario y la validación salen del esquema.

## Seguridad

- El panel y sus APIs exigen sesión (cookie firmada, 7 días); el sitio público no.
- Lo que se guarda se reconstruye en el servidor a partir del esquema: enlaces solo `https://`, `mailto:` o rutas del sitio; las fotos se validan por su contenido real (JPG, PNG, WEBP, GIF, máximo 8 MB) y se guardan con nombre aleatorio.
- Intentos de login limitados por conexión. Nunca subas `.env*` al repositorio.

## Conectar Blogger (opcional)

1. En [Google Cloud](https://console.cloud.google.com/): crea un proyecto y activa **Blogger API v3**.
2. Crea un **OAuth Client ID** de tipo *Web application*. En *Authorized redirect URIs* agrega `http://localhost:3000/api/blogger/callback` y, para producción, `https://TU-SITIO.up.railway.app/api/blogger/callback`. Si la pantalla de consentimiento está en modo «Testing», agrega tu cuenta de Google como usuario de prueba.
3. En las variables (`.env.local` o Railway) pon `APP_URL`, `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET`. No las compartas por chat ni las subas al repositorio.
4. Entra a `/blogger` → **Conexión → Conectar con Google** con la cuenta dueña del blog. Copia el `BLOGGER_REFRESH_TOKEN` que se muestra a las variables y reinicia (en Railway se redespliega solo al guardar la variable).

El Blog ID se resuelve solo a partir de `BLOGGER_BLOG_URL` (o fíjalo con `BLOGGER_BLOG_ID`).
