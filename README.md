# LICEO · Aula — paquete verificado para GitHub Pages

**Versión 2026-10-24-r3-autonomo**. Conserva el diseño anterior de CURSO LICEO (logotipo, portada, columnas, menú, materias, registro y panel administrativo).

## Archivos
- `index.html`: la aplicación completa. NO depende de `app.mjs`, `backend.mjs`, `styles.css`, React, esm.sh ni otros servicios CDN para mostrarse.
- `404.html`: copia de respaldo para URLs inexistentes dentro de un sitio publicado.
- `diagnostico.html`: prueba pública independiente, sin bibliotecas externas.
- `VERSION.txt`: identificación visible de la versión.
- `.nojekyll`: pide a GitHub servir el proyecto sin procesamiento Jekyll.
- `logo.jpg`, `campana.jpg`, `columna.jpg`, `favicon.svg`: los recursos originales, mantenidos como copia de referencia (también van incorporados en `index.html`).

## Publicación sin mezclar versiones
1. Abre el repositorio `CURSOLICEO-` en GitHub y comprueba que estás en la rama `main`.
2. Elimina del **repositorio** los módulos antiguos `app.mjs`, `backend.mjs`, `subjects.mjs` y `styles.css` (ya no se utilizan). Elimina el `index.html` anterior, si GitHub no te ofrece reemplazarlo.
3. Sube todos los **archivos de este ZIP** directamente a la raíz de `main`, no dentro de una carpeta; haz **Commit changes**.
4. En Settings → Pages, configura `Deploy from a branch`, rama `main`, carpeta `/(root)` y guarda.
5. Abre primero `https://jorgeadrianvillanuevareyes-gif.github.io/CURSOLICEO-/diagnostico.html`. Debe verse **2026-10-24-r3-autonomo** y HTTP 200 para los archivos.
6. Luego abre `https://jorgeadrianvillanuevareyes-gif.github.io/CURSOLICEO-/` en una ventana incógnita. Si aparece una versión antigua, usa Ctrl+F5.

**Si `/diagnostico.html` devuelve 404**, es un problema del despliegue de GitHub Pages, de la rama, el nombre del repositorio o la URL. No se resuelve cambiando el código de la aplicación.

## Supabase y cuentas
- Base de datos: proyecto independiente `bveqazokitzafuyjxqkt`.
- Administrador designado: `jorgeadrianvillanuevareyes@gmail.com` (se activa cuando el propietario se registra y confirma su correo).
- Configura en Supabase → Authentication → URL Configuration el sitio y redirección `https://jorgeadrianvillanuevareyes-gif.github.io/CURSOLICEO-/`.
- El registro, la verificación de correo, los permisos y las subidas de archivos requieren pruebas reales y una auditoría de las funciones con permisos elevados antes de admitir alumnos.
- Nunca publiques contraseñas, ni la clave secreta/service_role de Supabase.

## Pruebas realizadas
Pruebas locales de escritorio, móvil, navegación, inicio de sesión simulado, publicación simulada y errores de JavaScript mediante Chromium. Las pruebas de acceso real y de GitHub Pages remotos no están verificadas hasta que el sitio nuevo esté publicado.
