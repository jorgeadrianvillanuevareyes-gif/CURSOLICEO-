# LICEO · Aula — diseño original + Supabase

Esta versión conserva `app/page.tsx` y los estilos y fotografías del ZIP original proporcionado. Se adaptó a archivos estáticos para GitHub Pages, sin autenticación de ChatGPT.

## Cómo publicarlo

1. Descomprime este paquete y sube **el contenido de la carpeta** a la raíz del repositorio GitHub CURSOLICEO (no subas el ZIP ni una carpeta anidada).
2. GitHub → Settings → Pages → Deploy from a branch → main → /(root) → Save.
3. Copia la URL completa de GitHub Pages.
4. Supabase → Authentication → URL Configuration: establece Site URL y Redirect URLs con esa URL de GitHub Pages. Sin ese paso, los correos de confirmación no volverán a la página.
5. Con `jorgeadrianvillanuevareyes@gmail.com` crea tu cuenta y confirma el correo; entra a la página y completa Mi perfil para obtener el rol administrador.
6. En Mi perfil genera claves por alumno y autoriza profesores una vez que estos creen y confirmen su cuenta y soliciten rol de profesor.

## Seguridad

- Supabase está configurado con un proyecto independiente, RLS y bucket privado. No se incluye ninguna contraseña ni clave administrativa en los archivos. La clave `sb_publishable` es pública por diseño.
- El código de acceso es individual, asociado al correo y expira a los 30 días; se muestra solo una vez al administrador.
- No compartas la página con estudiantes reales hasta probar en dos cuentas distintas el alta, confirmación de correo, código de acceso, publicación, descarga y eliminación de archivos.
- El frontend usa React, lucide-react y supabase-js mediante esm.sh e import maps; requiere internet y el proveedor CDN.
- GitHub Pages aloja solamente archivos estáticos; Supabase proporciona identidad, base de datos y almacenamiento.
- El asesor de seguridad de Supabase aún señala funciones con privilegios ampliados; sus rutas realizan comprobaciones de identidad y rol. Debe auditarse y validar reglas antes de uso a escala.
- No es un sistema para manejar información académica confidencial sin una auditoría de seguridad completa y aviso de privacidad.

## Estructura

- `index.html`: entrada pública.
- `app.mjs`: interfaz React compilada directamente del componente original.
- `page.tsx`: copia de la interfaz fuente adaptada.
- `styles.css`, `logo.jpg`, `campana.jpg`, `columna.jpg`: estilos e imágenes originales.
- `backend.mjs`: integración con Supabase.
- `subjects.mjs`: materias originales.
