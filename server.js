const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configuración de multer para subida de archivos
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/bmp',
      'image/tiff',
      'image/svg+xml',
      'application/pdf'
    ];
    
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Formato de archivo no soportado'));
    }
  }
});

// Rutas principales
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/convertir-jpg-a-png', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'converter.html'));
});

app.get('/convertir-png-a-jpg', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'converter.html'));
});

app.get('/convertir-webp-a-png', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'converter.html'));
});

app.get('/convertir-pdf-a-imagen', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'converter.html'));
});

// API de conversión
app.post('/api/convert', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se ha subido ningún archivo' });
    }

    const { format, quality } = req.body;
    const outputFormat = format || 'png';
    const imageQuality = parseInt(quality) || 90;

    let convertedImage;
    let mimeType;
    let extension;

    // Convertir usando Sharp
    const sharpInstance = sharp(req.file.buffer);

    switch (outputFormat.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
        convertedImage = await sharpInstance
          .jpeg({ quality: imageQuality })
          .toBuffer();
        mimeType = 'image/jpeg';
        extension = 'jpg';
        break;

      case 'png':
        convertedImage = await sharpInstance
          .png({ quality: imageQuality })
          .toBuffer();
        mimeType = 'image/png';
        extension = 'png';
        break;

      case 'webp':
        convertedImage = await sharpInstance
          .webp({ quality: imageQuality })
          .toBuffer();
        mimeType = 'image/webp';
        extension = 'webp';
        break;

      case 'avif':
        convertedImage = await sharpInstance
          .avif({ quality: imageQuality })
          .toBuffer();
        mimeType = 'image/avif';
        extension = 'avif';
        break;

      case 'tiff':
        convertedImage = await sharpInstance
          .tiff({ quality: imageQuality })
          .toBuffer();
        mimeType = 'image/tiff';
        extension = 'tiff';
        break;

      case 'gif':
        convertedImage = await sharpInstance
          .gif()
          .toBuffer();
        mimeType = 'image/gif';
        extension = 'gif';
        break;

      case 'bmp':
        // Sharp no soporta BMP directamente, convertir a PNG
        convertedImage = await sharpInstance
          .png()
          .toBuffer();
        mimeType = 'image/png';
        extension = 'png';
        break;

      default:
        return res.status(400).json({ error: 'Formato no soportado' });
    }

    // Enviar la imagen convertida
    res.set({
      'Content-Type': mimeType,
      'Content-Disposition': `attachment; filename="converted.${extension}"`,
      'Content-Length': convertedImage.length
    });

    res.send(convertedImage);

  } catch (error) {
    console.error('Error en conversión:', error);
    res.status(500).json({ 
      error: 'Error al convertir la imagen',
      details: error.message 
    });
  }
});

// Ruta para información de formatos
app.get('/api/formats', (req, res) => {
  res.json({
    formats: [
      { value: 'jpg', label: 'JPG/JPEG', mime: 'image/jpeg' },
      { value: 'png', label: 'PNG', mime: 'image/png' },
      { value: 'webp', label: 'WebP', mime: 'image/webp' },
      { value: 'avif', label: 'AVIF', mime: 'image/avif' },
      { value: 'tiff', label: 'TIFF', mime: 'image/tiff' },
      { value: 'gif', label: 'GIF', mime: 'image/gif' },
      { value: 'bmp', label: 'BMP', mime: 'image/bmp' }
    ]
  });
});

// Sitemap
app.get('/sitemap.xml', (req, res) => {
  res.set('Content-Type', 'application/xml');
  res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'));
});

// Robots.txt
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.sendFile(path.join(__dirname, 'public', 'robots.txt'));
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Algo salió mal!',
    message: err.message 
  });
});

// 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});

module.exports = app;
