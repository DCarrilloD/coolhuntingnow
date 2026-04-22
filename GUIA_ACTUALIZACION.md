# 🚀 Guía de Actualización: CoolhuntingNow

Esta guía documenta la arquitectura técnica de la plataforma y el flujo de trabajo necesario para realizar cambios, optimizaciones y despliegues en producción.

---

## 🏗️ Arquitectura del Proyecto

La plataforma utiliza una arquitectura **híbrida y desacoplada** para garantizar el máximo rendimiento y facilidad de gestión:

1.  **Frontend (Astro + Tailwind CSS)**: Localizado en la carpeta `coolhunting-frontend`. Astro genera un sitio estático ultra-rápido, mientras que Tailwind permite un diseño premium y responsive.
2.  **Backend (Strapi CMS)**: Repositorio de contenidos. Permite al equipo editorial gestionar Insights, Equipo, Ecosistema y Configuración Global sin tocar una sola línea de código.
3.  **Optimización de Medios (Cloudinary)**: Todas las imágenes se procesan dinámicamente. El frontend solicita versiones optimizadas (formato, calidad y tamaño) directamente a los servidores de Cloudinary para maximizar la puntuación en Google PageSpeed.
4.  **Despliegue (Vercel)**: Alojamiento de alto rendimiento que reconstruye el sitio automáticamente cada vez que se detectan cambios en el código.

---

## 🛠️ Cómo realizar cambios en el Frontend

Si necesitas realizar cambios visuales o funcionales que no dependen del CMS (como cambiar el diseño del header o añadir nuevas secciones):

1.  **Ubicación de archivos**:
    *   `src/pages/`: Contiene las rutas del sitio (index, equipo, cada insight individual).
    *   `src/components/`: Contiene los elementos reutilizables (tarjetas, héroe, bloques de contenido).
    *   `src/layouts/`: El diseño global del sitio (Header, Footer, tipografías).
    *   `src/lib/strapi.ts`: El "cerebro" que conecta con el backend y optimiza las imágenes.

2.  **Flujo de Trabajo Recomendado**:
    *   Realiza las modificaciones en los archivos de la carpeta `src`.
    *   Si utilizas **Antigravity**, puedes pedirle cambios específicos (ej: *"Pon el texto de los botones en negrita"*) y él se encargará de modificar los archivos y sincronizar las carpetas automáticamente.

---

## 🚢 Despliegue en Producción (Vercel)

El proceso de despliegue es automático y se basa en **Git**. Aquí tienes los pasos para actualizar la web en vivo:

### 1. Sincronización
Antes de subir los cambios, asegúrate de que la carpeta de despliegue (la carpeta `Front` que Vercel está vigilando) tenga la última versión del código.
> [!NOTE]
> Si trabajas con Antigravity, él ya realiza este paso por ti cada vez que termina una tarea.

### 2. Subida vía Git
Una vez que el código en la carpeta `Front` es el correcto:
1. Abre una terminal en esa carpeta.
2. Ejecuta los comandos estándar de Git:
   ```bash
   git add .
   git commit -m "Descripción de las mejoras realizadas"
   git push origin main
   ```

### 3. Actualización Automática
Al hacer el `git push`, **Vercel detecta el cambio automáticamente** y comienza un nuevo "Build". En unos 2-3 minutos, la web en producción se actualizará con los nuevos cambios sin necesidad de intervención manual.

---

## ⚡ Optimización de Rendimiento (PageSpeed)

Para mantener la puntuación **90+** en PageSpeed, sigue estas reglas al programar:
- **Usa el helper `optimizeImage`**: Nunca uses URLs de imagen directas. Pásalas siempre por la función `optimizeImage(url, width)` definida en `strapi.ts`.
- **Contraste**: Mantén opacidades altas (mínimo `white/70`) para textos sobre fondos oscuros.
- **Fuentes**: La carga de Google Fonts está configurada para ser asíncrona y no bloquear el renderizado. Evita añadir más familias de fuentes sin optimizar.

---

**Coolhunting Group | Decoding the DNA of Tomorrow**
