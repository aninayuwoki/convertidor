const fs = require('fs');
const path = require('path');

console.log('🚀 Configurando estructura del proyecto...\n');

// Crear directorios
const dirs = [
    'public',
    'public/js'
];

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`✓ Creado directorio: ${dir}`);
    }
});

// Archivos a crear
const files = {
    'public/index.html': `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Convertidor de imágenes online gratis. Convierte JPG a PNG, PNG a JPG, WebP, PDF y más de 20 formatos. Rápido, seguro y sin registro.">
    <meta name="keywords" content="convertir imagen, cambiar formato imagen, JPG a PNG, PNG a JPG, convertidor imágenes gratis, WebP, PDF a imagen">
    <title>Convertidor de Imágenes Gratis - JPG, PNG, WebP, PDF y Más Formatos</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
            --primary: #6366f1;
            --primary-dark: #4f46e5;
            --secondary: #8b5cf6;
            --background: #0f172a;
            --surface: #1e293b;
            --text: #f1f5f9;
            --text-secondary: #94a3b8;
            --border: #334155;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: var(--background);
            color: var(--text);
            line-height: 1.6;
            min-height: 100vh;
        }
        header {
            background: var(--surface);
            border-bottom: 1px solid var(--border);
            padding: 1rem 0;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        nav {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        .logo {
            font-size: 1.5rem;
            font-weight: bold;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .hero {
            max-width: 1200px;
            margin: 0 auto;
            padding: 4rem 2rem;
            text-align: center;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            line-height: 1.2;
        }
        .subtitle {
            font-size: 1.25rem;
            color: var(--text-secondary);
            margin-bottom: 3rem;
        }
        .converter-card {
            background: var(--surface);
            border-radius: 1rem;
            padding: 2rem;
            max-width: 600px;
            margin: 0 auto;
            border: 1px solid var(--border);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        }
        .upload-area {
            border: 2px dashed var(--border);
            border-radius: 0.5rem;
            padding: 3rem 2rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
            margin-bottom: 1.5rem;
        }
        .upload-area:hover {
            border-color: var(--primary);
            background: rgba(99, 102, 241, 0.05);
        }
        .upload-icon { font-size: 3rem; margin-bottom: 1rem; opacity: 0.5; }
        input[type="file"] { display: none; }
        .format-selector {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 0.5rem;
            margin-bottom: 1.5rem;
        }
        .format-btn {
            padding: 0.75rem;
            background: var(--background);
            border: 1px solid var(--border);
            border-radius: 0.5rem;
            color: var(--text);
            cursor: pointer;
            transition: all 0.3s;
        }
        .format-btn:hover {
            border-color: var(--primary);
            background: rgba(99, 102, 241, 0.1);
        }
        .format-btn.active {
            background: var(--primary);
            border-color: var(--primary);
            color: white;
        }
        .quality-control { margin-bottom: 1.5rem; }
        .quality-control label {
            display: block;
            margin-bottom: 0.5rem;
            color: var(--text-secondary);
        }
        input[type="range"] {
            width: 100%;
            height: 6px;
            border-radius: 5px;
            background: var(--background);
            outline: none;
            -webkit-appearance: none;
        }
        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: var(--primary);
            cursor: pointer;
        }
        .convert-btn {
            width: 100%;
            padding: 1rem;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            border: none;
            border-radius: 0.5rem;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
        }
        .convert-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
        }
        .convert-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .loading { display: none; text-align: center; padding: 1rem; }
        .loading.active { display: block; }
        .spinner {
            border: 3px solid var(--border);
            border-top: 3px solid var(--primary);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .preview { margin-top: 1.5rem; display: none; }
        .preview img {
            max-width: 100%;
            border-radius: 0.5rem;
            border: 1px solid var(--border);
        }
        .features {
            max-width: 1200px;
            margin: 0 auto;
            padding: 4rem 2rem;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }
        .feature {
            background: var(--surface);
            padding: 2rem;
            border-radius: 1rem;
            border: 1px solid var(--border);
            text-align: center;
        }
        .feature-icon { font-size: 2.5rem; margin-bottom: 1rem; }
        .feature h3 { margin-bottom: 0.5rem; color: var(--primary); }
        footer {
            background: var(--surface);
            border-top: 1px solid var(--border);
            padding: 2rem;
            text-align: center;
            color: var(--text-secondary);
            margin-top: 4rem;
        }
        @media (max-width: 768px) {
            h1 { font-size: 2rem; }
            .subtitle { font-size: 1rem; }
        }
    </style>
</head>
<body>
    <header>
        <nav><div class="logo">🖼️ ImageConverter</div></nav>
    </header>
    <main>
        <section class="hero">
            <h1>Convertidor de Imágenes Online Gratis</h1>
            <p class="subtitle">Convierte tus imágenes entre JPG, PNG, WebP, PDF y más formatos.</p>
            <div class="converter-card">
                <div class="upload-area" id="uploadArea">
                    <div class="upload-icon">📁</div>
                    <p><strong>Haz clic o arrastra tu imagen aquí</strong></p>
                    <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem;">Soporta JPG, PNG, WebP, GIF (Máx. 10MB)</p>
                    <input type="file" id="fileInput" accept="image/*">
                </div>
                <div class="format-selector">
                    <button class="format-btn active" data-format="png">PNG</button>
                    <button class="format-btn" data-format="jpg">JPG</button>
                    <button class="format-btn" data-format="webp">WebP</button>
                    <button class="format-btn" data-format="avif">AVIF</button>
                    <button class="format-btn" data-format="tiff">TIFF</button>
                    <button class="format-btn" data-format="gif">GIF</button>
                </div>
                <div class="quality-control">
                    <label>Calidad: <span id="qualityValue">90</span>%</label>
                    <input type="range" id="qualitySlider" min="1" max="100" value="90">
                </div>
                <button class="convert-btn" id="convertBtn" disabled>Selecciona una imagen primero</button>
                <div class="loading" id="loading">
                    <div class="spinner"></div>
                    <p style="margin-top: 1rem;">Convirtiendo...</p>
                </div>
                <div class="preview" id="preview">
                    <h3>Vista previa:</h3>
                    <img id="previewImg" src="" alt="Preview">
                </div>
            </div>
        </section>
        <section class="features">
            <div class="feature">
                <div class="feature-icon">⚡</div>
                <h3>Súper Rápido</h3>
                <p>Conversión instantánea sin demoras.</p>
            </div>
            <div class="feature">
                <div class="feature-icon">🔒</div>
                <h3>100% Seguro</h3>
                <p>Tus imágenes se procesan de forma segura.</p>
            </div>
            <div class="feature">
                <div class="feature-icon">🎯</div>
                <h3>Alta Calidad</h3>
                <p>Mantén la mejor calidad en cada conversión.</p>
            </div>
            <div class="feature">
                <div class="feature-icon">📱</div>
                <h3>Funciona en Todo</h3>
                <p>Compatible con todos los dispositivos.</p>
            </div>
        </section>
    </main>
    <footer>
        <p>&copy; 2024 ImageConverter. Todos los derechos reservados.</p>
    </footer>
    <script src="/js/main.js"></script>
</body>
</html>`,

    'public/404.html': `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Página no encontrada</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #0f172a;
            color: #f1f5f9;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            text-align: center;
            padding: 2rem;
        }
        h1 {
            font-size: 8rem;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 1rem;
        }
        h2 { font-size: 2rem; margin-bottom: 1rem; color: #94a3b8; }
        p { font-size: 1.1rem; color: #94a3b8; margin-bottom: 2rem; }
        .btn {
            display: inline-block;
            padding: 1rem 2rem;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            text-decoration: none;
            border-radius: 0.5rem;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div>
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p>La página que buscas no existe.</p>
        <a href="/" class="btn">Volver al inicio</a>
    </div>
</body>
</html>`,

    'public/converter.html': `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Convertir Imagen - ImageConverter</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #0f172a;
            color: #f1f5f9;
            line-height: 1.6;
        }
        header {
            background: #1e293b;
            border-bottom: 1px solid #334155;
            padding: 1rem 0;
        }
        nav {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo {
            font-size: 1.5rem;
            font-weight: bold;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-decoration: none;
        }
        main {
            max-width: 800px;
            margin: 0 auto;
            padding: 3rem 2rem;
        }
        h1 { font-size: 2.5rem; text-align: center; margin-bottom: 2rem; }
        .converter-card {
            background: #1e293b;
            border-radius: 1rem;
            padding: 2rem;
            border: 1px solid #334155;
        }
        .upload-area {
            border: 2px dashed #334155;
            border-radius: 0.5rem;
            padding: 3rem 2rem;
            text-align: center;
            cursor: pointer;
            margin-bottom: 1.5rem;
        }
        input[type="file"] { display: none; }
        .format-selector {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 0.5rem;
            margin-bottom: 1.5rem;
        }
        .format-btn {
            padding: 0.75rem;
            background: #0f172a;
            border: 1px solid #334155;
            border-radius: 0.5rem;
            color: #f1f5f9;
            cursor: pointer;
        }
        .format-btn.active {
            background: #6366f1;
            color: white;
        }
        .convert-btn {
            width: 100%;
            padding: 1rem;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            border: none;
            border-radius: 0.5rem;
            font-size: 1.1rem;
            cursor: pointer;
        }
        .convert-btn:disabled { opacity: 0.5; }
    </style>
</head>
<body>
    <header>
        <nav>
            <a href="/" class="logo">🖼️ ImageConverter</a>
            <a href="/" style="color: #94a3b8; text-decoration: none;">← Volver</a>
        </nav>
    </header>
    <main>
        <h1>Convertir Imagen</h1>
        <div class="converter-card">
            <div class="upload-area" id="uploadArea">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📁</div>
                <p><strong>Haz clic para subir imagen</strong></p>
                <input type="file" id="fileInput" accept="image/*">
            </div>
            <div class="format-selector">
                <button class="format-btn active" data-format="png">PNG</button>
                <button class="format-btn" data-format="jpg">JPG</button>
                <button class="format-btn" data-format="webp">WebP</button>
                <button class="format-btn" data-format="avif">AVIF</button>
            </div>
            <button class="convert-btn" id="convertBtn" disabled>Selecciona imagen</button>
        </div>
    </main>
    <script src="/js/main.js"></script>
</body>
</html>`,

    'public/sitemap.xml': `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://tudominio.com/</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>`,

    'public/robots.txt': `User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://tudominio.com/sitemap.xml`,

    'public/favicon.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="20" fill="url(#grad)"/>
  <path d="M30 35 L45 35 L45 50 L60 35 L75 35 L75 65 L60 65 L60 50 L45 65 L30 65 Z" fill="white"/>
</svg>`,

    'public/js/main.js': `const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const convertBtn = document.getElementById('convertBtn');
const formatBtns = document.querySelectorAll('.format-btn');
const qualitySlider = document.getElementById('qualitySlider');
const qualityValue = document.getElementById('qualityValue');
const loading = document.getElementById('loading');
const preview = document.getElementById('preview');
const previewImg = document.getElementById('previewImg');

let selectedFile = null;
let selectedFormat = 'png';

uploadArea?.addEventListener('click', () => fileInput.click());
fileInput?.addEventListener('change', handleFileSelect);
convertBtn?.addEventListener('click', convertImage);

if (qualitySlider) {
    qualitySlider.addEventListener('input', (e) => {
        qualityValue.textContent = e.target.value;
    });
}

formatBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        formatBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedFormat = btn.dataset.format;
    });
});

function handleFileSelect(e) {
    const files = e.target.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
}

function handleFile(file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    
    if (!validTypes.includes(file.type)) {
        alert('Por favor selecciona una imagen válida');
        return;
    }

    if (file.size > 10 * 1024 * 1024) {
        alert('El archivo es muy grande (máx. 10MB)');
        return;
    }

    selectedFile = file;
    
    if (preview && previewImg) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImg.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    uploadArea.querySelector('p').innerHTML = \`<strong>✓ \${file.name}</strong>\`;
    convertBtn.disabled = false;
    convertBtn.textContent = \`Convertir a \${selectedFormat.toUpperCase()}\`;
}

async function convertImage() {
    if (!selectedFile) return;

    if (loading) loading.classList.add('active');
    convertBtn.disabled = true;
    convertBtn.textContent = 'Convirtiendo...';

    try {
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('format', selectedFormat);
        formData.append('quality', qualitySlider?.value || 90);

        const response = await fetch('/api/convert', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Error al convertir');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = \`converted.\${selectedFormat}\`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        convertBtn.textContent = '✓ ¡Descargado!';
        setTimeout(() => {
            convertBtn.textContent = \`Convertir a \${selectedFormat.toUpperCase()}\`;
        }, 2000);

    } catch (error) {
        alert('Error: ' + error.message);
    } finally {
        if (loading) loading.classList.remove('active');
        convertBtn.disabled = false;
    }
}`
};

// Crear archivos
for (const [filepath, content] of Object.entries(files)) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`✓ Creado: ${filepath}`);
}

console.log('\n✅ ¡Estructura del proyecto creada exitosamente!');
console.log('\nAhora ejecuta:');
console.log('  npm start\n');
