# Nuevo diseño de Creactivos en Blogger

Son 6 archivos: **1 tema** (cambia el diseño de todo el blog) y **5 páginas** (el contenido de cada página interna).

## 0. Antes de empezar: una copia de seguridad
En Blogger: **Tema → ▼ (junto a «Personalizar») → Copia de seguridad → Descargar**.
Si algo sale mal, ahí mismo puedes **Restaurar**. Si prefieres probar sin riesgo, crea antes un blog de prueba y haz estos pasos allí.

## 1. Reemplazar el tema
1. **Tema → ▼ junto a «Personalizar» → Editar HTML**.
2. Haz clic dentro del código, **Ctrl+A** (seleccionar todo) y bórralo.
3. Pega todo el contenido de `tema-creactivos.xml` y pulsa el icono de **guardar** (disquete).
4. Si Blogger avisa que se quitarán gadgets de la barra lateral, acepta: el diseño nuevo no los usa.
5. Si muestra un error, copia el mensaje completo y envíamelo.

**Importante (celular):** **Tema → ⚙ (junto a «Personalizar») → «¿Quieres mostrar la versión para móviles?» → «No. Mostrar plantilla de escritorio en dispositivos móviles» → Guardar.** Si no, en el celular se ve el tema móvil de Blogger y no el nuevo.

> **Versión 3 del tema.** La primera versión dibujaba mal las entradas y las páginas (el área de contenido salía vacía). Esta usa el widget estándar de Blogger y oculta los comentarios y el enlace de suscripción en las páginas fijas. Si ya habías pegado las páginas, **no las repitas: solo reemplaza el tema.**

## 2. Reemplazar el contenido de las páginas
En **Páginas**, abre la página con el lápiz, cambia el editor de «Redactar» a **Vista HTML** (icono `<>` arriba a la izquierda), borra todo, pega el archivo y pulsa **Actualizar**.

| Archivo | Página en Blogger | Acción |
|---|---|---|
| `paginas/crea.html` | CreA Cine Infantil (`/p/crea.html`) | Reemplazar |
| `paginas/minas-de-salento.html` | Minas de Salento (`/p/minas-de-salento.html`) | Reemplazar |
| `paginas/ruta.html` | Ruta (`/p/noticias.html`) | Reemplazar |
| `paginas/permanencia-esal.html` | Permanencia ESAL (`/p/permanencia-esal.html`) | Reemplazar |
| `paginas/sazon-y-fogon.html` | **Nueva** | Crear: título «Sazón y Fogón»; en *Enlace permanente* elige «Personalizado» y escribe `sazon-y-fogon` |

Las páginas «CreActivos NIT» y «Contacto» ya no hacen falta: su contenido está ahora en la portada y el menú no las enlaza. Puedes dejarlas o eliminarlas.

## Si algo no se ve bien
- **En el editor la página se ve «sin diseño»**: es normal. El editor de Blogger no carga el CSS del tema. Para ver el resultado real, pulsa **Vista previa** o publica y abre la página.
- **Después de pegar el tema, la página o las Noticias salen vacías**: ve a **Diseño**, en la sección principal pulsa **Añadir un gadget → Entradas del blog** y guarda.
- **Al guardar el tema aparece un error de XML**: casi siempre es un pegado incompleto. El archivo tiene unas 240 líneas; pulsa Ctrl+Fin en el editor y comprueba que termina en `</html>`.

## 3. Cómo queda
- **Portada:** presentación con fotos, quiénes somos, portafolio, qué hacemos y galería (vienen dentro del tema), luego **Noticias** (tus entradas de Blogger, las más recientes primero; cada entrada nueva aparece sola) y contacto.
- **Menú:** Creactivos (con Quiénes somos, Galería, Noticias, CreA, Minas, Ruta y Contacto), Sazón y Fogón y Permanencia ESAL.

## Las imágenes
Se cargan desde el repositorio público `creactivos-blog-admin` de GitHub, a través de jsDelivr, fijadas a una versión. Funcionan mientras ese repositorio siga **público y sin borrarse**.
Para no depender de él, cuando el sitio esté en Railway haz **Buscar y reemplazar** en el tema y en las páginas:

- buscar: `https://cdn.jsdelivr.net/gh/csicentraldeservicios-glitch/creactivos-blog-admin@b28a9e381727f5417cd9316288f8be1cab1c12fd/public/img`
- reemplazar por: `https://TU-SITIO.up.railway.app/img` (tu dirección real de Railway)

## Cambiar textos
Los textos de la portada están dentro de `tema-creactivos.xml`, y los de cada página en su archivo. Edítalos en el código con cuidado de no borrar etiquetas (`<...>`), o pídeme los cambios y regenero los archivos.

## Qué no pude comprobar
No tengo acceso a tu Blogger, así que no probé el tema allí. Verifiqué que el XML esté bien formado, que use solo campos estándar de Blogger y cómo se ve (portada, página interna y entrada, en escritorio y móvil) con una simulación. Si Blogger rechaza algo al guardar, el mensaje dirá qué línea; con eso lo corrijo.
