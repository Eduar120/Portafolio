# Portafolio de Carlos Eduardo Delgado Idrobo

Portafolio profesional creado con React, TypeScript y Vite. Está preparado para publicarse en GitHub Pages.

## Ejecutar localmente

Requiere Node.js 20 o superior.

```bash
pnpm install
pnpm dev
```

También puedes usar `npm install` y `npm run dev` si no tienes pnpm.

## Crear una versión de producción

```bash
pnpm build
pnpm preview
```

## Publicar en GitHub Pages

1. Crea un repositorio público en GitHub.
2. Sube todos los archivos de este proyecto a la rama `main`.
3. En GitHub, abre `Settings → Pages`.
4. En `Build and deployment`, selecciona `GitHub Actions`.
5. Cada nuevo cambio enviado a `main` activará el despliegue automático.

El workflow está en `.github/workflows/deploy.yml`. La configuración de Vite utiliza rutas relativas para que las imágenes funcionen dentro de la URL del repositorio.

## Datos de contacto

El botón “Conectar conmigo” abre un correo dirigido a `eduardoidrobo122@gmail.com`.
