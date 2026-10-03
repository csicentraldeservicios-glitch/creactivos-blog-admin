# Publicar el sitio en Railway

El sitio público y el panel de administración son una sola aplicación. Lo que se edita en el panel (textos, fotos subidas) se guarda en un **volumen** de Railway, así que sobrevive a los despliegues.

## Antes de empezar

- Una cuenta en <https://railway.com> conectada a GitHub.
- Este repositorio en GitHub. Despliega la rama `main` (haz primero el *merge* de la rama de trabajo).

## Pasos

1. En Railway: **New Project → Deploy from GitHub repo** y elige `creactivos-blog-admin`, rama `main`.
   Railway detecta Next.js solo; `railway.json` ya trae el comando de inicio y la comprobación de salud (`/api/health`).
2. **Agrega un volumen** (imprescindible): en el servicio, **Settings → Volumes → Add Volume**, ruta de montaje `/data`.
   Sin volumen, lo que edites se borra en cada despliegue (el panel muestra un aviso amarillo si falta).
3. En **Variables** del servicio agrega:

   | Variable | Valor |
   |---|---|
   | `ADMIN_PASSWORD` | La contraseña del panel (larga) |
   | `ADMIN_SESSION_SECRET` | Una cadena aleatoria larga, por ejemplo la salida de `openssl rand -hex 32` |

   No hace falta `DATA_DIR`: la app usa el volumen montado.
4. **Settings → Networking → Generate Domain** para tener una dirección pública (`algo.up.railway.app`). Más adelante puedes añadir tu propio dominio en el mismo lugar.
5. Abre la dirección: verás el sitio. Entra a `/login` (también hay un enlace «Administrar» al pie) con tu contraseña y estás en el panel.

## Uso diario

- `/admin` muestra las secciones. Se elige una, se cambia lo necesario y se pulsa **Guardar cambios**: se publica al instante.
- Las fotos se suben desde el mismo formulario («Subir foto») o se escogen de la biblioteca.
- «Volver al contenido original de esta sección» restaura los textos con que nació el sitio.
- Cada vez que se guarda, se conserva una copia de la versión anterior en `backups/` dentro del volumen (las últimas 30).

## Importante

- **Una sola réplica.** El contenido es un archivo en el volumen; no subas el número de réplicas.
- **Copias de seguridad.** Además de `backups/`, conviene descargar de vez en cuando el contenido (`content.json` y `uploads/`) desde el volumen. Railway permite hacer copias del volumen desde su panel.
- **Contraseña.** Quien la tenga puede cambiar todo el sitio. Se limita a 8 intentos fallidos cada 10 minutos por conexión.

## Probarlo en tu computador

```bash
cp .env.example .env.local   # rellena ADMIN_PASSWORD y ADMIN_SESSION_SECRET
npm install
npm run dev                  # http://localhost:3000  (panel en /admin)
```

El contenido de prueba se guarda en `./data`, que Git ignora.
