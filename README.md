# Creactivos Audiovisual · sitio y administración

Sitio web de Creactivos con un panel sencillo para actualizar textos, fotos, noticias y documentos sin tocar código. Hecho con Next.js.

- **Sitio público**: `/` (portada, quiénes somos, galería, noticias, contacto), `/sazon-y-fogon`, `/crea-cine-infantil`, `/minas-de-salento`, `/ruta`, `/permanencia-esal`.
- **Panel**: `/admin` (se entra desde `/login` con una contraseña). Un formulario por sección, fotos que se suben o se eligen de una biblioteca, y botón **Guardar cambios**.
- **Publicación**: pensado para [Railway](RAILWAY.md).

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
