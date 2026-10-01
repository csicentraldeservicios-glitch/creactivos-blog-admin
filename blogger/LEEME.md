# Páginas listas para Blogger

Cada archivo `.html` es el contenido completo de una página (con su CSS incluido y limitado a un contenedor `.cr`, así no altera el resto del tema de Blogger).

| Archivo | Página en Blogger | Acción |
|---|---|---|
| `inicio.html` | `/p/inicio.html` | Crear página nueva con ese nombre de URL |
| `sazon-y-fogon.html` | `/p/sazon-y-fogon.html` | Crear página nueva |
| `crea-cine-infantil.html` | `/p/crea.html` | Reemplazar el contenido de «CreA Cine Infantil» |
| `minas-de-salento.html` | `/p/minas-de-salento.html` | Reemplazar el contenido de «Minas de Salento» |
| `ruta.html` | `/p/noticias.html` | Reemplazar el contenido de «Ruta» |
| `permanencia-esal.html` | `/p/permanencia-esal.html` | Reemplazar el contenido de «Permanencia ESAL» |

Las páginas «CreActivos NIT» (`/p/portafolio.html`) y «Contacto» (`/p/contacto.html`) ya están resumidas dentro de `inicio.html`; puedes dejarlas como están o redirigir el menú a `inicio`.

## Cómo cargar una página

1. En Blogger: **Páginas → Página nueva** (o abre la existente).
2. Cambia el editor a **Vista HTML** (ícono `< >` arriba a la izquierda).
3. Borra lo que haya, pega el contenido del archivo y pulsa **Publicar** (o **Vista previa** primero).
4. En **Diseño → Páginas** (o **Diseño → Menú**) ajusta los enlaces del menú.

Prueba primero con una **página nueva** o un borrador, y no reemplaces las páginas existentes hasta que la hayas visto bien.

## Imágenes

Las imágenes salen de este repositorio (público) a través de jsDelivr, fijadas a un commit, por lo que funcionan sin subir nada a Blogger. Si prefieres alojarlas en Blogger:

1. Sube cada foto desde el editor de una entrada y copia su dirección.
2. Crea `blogger/imagenes.json` con `{ "galeria-musicos.jpg": "https://..." }` (una línea por foto).
3. Vuelve a generar los archivos (abajo).

## Regenerar los archivos

Si cambias textos o fotos en `src/lib/site.ts` o `src/lib/blog-content.ts`:

```bash
npm run export:blogger
```

Variables opcionales: `IMG_BASE` (carpeta de imágenes) y `OUT_DIR` (carpeta de salida). Las direcciones de las páginas están al inicio de `scripts/export-blogger.mjs` (`LINKS`).

## Límites

- Blogger puede reescribir o quitar etiquetas al guardar si pegas HTML en la vista «Redactar» en lugar de «HTML».
- Blogger muestra por su cuenta el título de la página; por eso las páginas internas no llevan un título grande propio.
- Esto no cambia el tema (cabecera, barra lateral, colores generales) del blog; solo el contenido de las páginas. Un tema completo es posible, pero reemplaza todo el diseño y conviene hacerlo aparte.
