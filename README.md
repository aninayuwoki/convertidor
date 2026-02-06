# 🖼️ Image Converter - Convertidor de Imágenes Online

Aplicación web para convertir imágenes entre diferentes formatos (JPG, PNG, WebP, AVIF, TIFF, GIF, BMP) con optimización SEO para aparecer en búsquedas de Google.

## 🚀 Características

- ✅ Conversión entre múltiples formatos de imagen
- ✅ Control de calidad ajustable
- ✅ Interfaz moderna y responsiva
- ✅ Optimizado para SEO
- ✅ Procesamiento rápido con Sharp
- ✅ Sin necesidad de registro
- ✅ 100% Gratis

## 📋 Requisitos

- Node.js 18+ 
- npm o yarn

## 🛠️ Instalación Local

1. Clona el repositorio:
```bash
git clone <tu-repo>
cd image-converter
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta en modo desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:3000`

## 🌐 Despliegue en Render

### Opción 1: Desde GitHub (Recomendado)

1. Sube tu código a GitHub
2. Ve a [Render.com](https://render.com) y crea una cuenta
3. Click en "New +" → "Web Service"
4. Conecta tu repositorio de GitHub
5. Configura:
   - **Name**: image-converter (o el que prefieras)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

6. Click en "Create Web Service"
7. Espera a que se despliegue (3-5 minutos)
8. ¡Listo! Tu app estará en `https://tu-app.onrender.com`

### Opción 2: Desde CLI

```bash
# Instala Render CLI
npm install -g @render/cli

# Autentícate
render login

# Despliega
render deploy
```

## 📁 Estructura del Proyecto

```
image-converter/
├── public/
│   ├── index.html          # Página principal
│   ├── converter.html      # Páginas de conversión específicas
│   ├── sitemap.xml         # Mapa del sitio para SEO
│   ├── robots.txt          # Instrucciones para bots
│   ├── favicon.svg         # Ícono del sitio
│   ├── 404.html            # Página de error
│   └── js/
│       └── main.js         # JavaScript principal
├── server.js               # Servidor Express
├── package.json            # Dependencias
└── README.md              # Este archivo
```

## 🔧 Configuración

### Variables de Entorno (Opcional)

Crea un archivo `.env` en la raíz:

```env
PORT=3000
NODE_ENV=production
```

En Render, estas se configuran en la pestaña "Environment".

## 🎯 SEO - Cómo Posicionarte en Google

### 1. Actualiza el Dominio

En todos los archivos HTML, reemplaza `https://tudominio.com` con tu dominio real de Render o un dominio personalizado.

### 2. Google Search Console

1. Ve a [Google Search Console](https://search.google.com/search-console)
2. Agrega tu propiedad (URL de Render)
3. Verifica la propiedad
4. Envía el sitemap: `https://tu-dominio.com/sitemap.xml`

### 3. Dominio Personalizado (Opcional pero Recomendado)

En Render:
1. Ve a Settings → Custom Domain
2. Agrega tu dominio (ej: `imageconverter.com`)
3. Configura los DNS en tu proveedor de dominio

### 4. Estrategia de Contenido

El proyecto ya incluye:
- ✅ Meta tags optimizados
- ✅ Schema.org markup
- ✅ URLs amigables para SEO
- ✅ Páginas individuales para conversiones populares
- ✅ FAQ section
- ✅ Sitemap.xml
- ✅ Robots.txt

### 5. Palabras Clave Incluidas

- "convertir imagen gratis"
- "cambiar formato de imagen online"
- "JPG a PNG"
- "PNG a JPG"
- "WebP a PNG"
- "convertidor de imágenes"

## 📊 Analytics (Opcional)

Para agregar Google Analytics, añade en el `<head>` de tus HTML:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=TU-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'TU-ID');
</script>
```

## 🐛 Solución de Problemas

### Error: "Cannot find module 'sharp'"

```bash
npm rebuild sharp
```

### La app no se despliega en Render

- Verifica que `package.json` tenga `"engines": { "node": ">=18.0.0" }`
- Revisa los logs en Render Dashboard

### Imágenes muy grandes fallan

- Ajusta el límite en `server.js` (línea 31)
- Por defecto es 10MB

## 📝 Licencia

MIT License - Usa libremente para proyectos personales o comerciales

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Soporte

Si tienes problemas o preguntas, abre un issue en GitHub.

## 🎉 Próximas Características

- [ ] Conversión por lotes (múltiples imágenes)
- [ ] Compresión de imágenes
- [ ] Redimensionamiento
- [ ] Marca de agua
- [ ] Más formatos (SVG, ICO, etc.)

---

Hecho con ❤️ para la comunidad
# convertidor
