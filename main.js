// Elementos del DOM
const uploadArea = document.getElementById('uploadArea');
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

// Event Listeners
uploadArea.addEventListener('click', () => fileInput.click());
uploadArea.addEventListener('dragover', handleDragOver);
uploadArea.addEventListener('dragleave', handleDragLeave);
uploadArea.addEventListener('drop', handleDrop);
fileInput.addEventListener('change', handleFileSelect);
convertBtn.addEventListener('click', convertImage);
qualitySlider.addEventListener('input', (e) => {
    qualityValue.textContent = e.target.value;
});

formatBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        formatBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedFormat = btn.dataset.format;
    });
});

// Funciones de manejo de archivos
function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
}

function handleFileSelect(e) {
    const files = e.target.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
}

function handleFile(file) {
    // Validar tipo de archivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/tiff'];
    
    if (!validTypes.includes(file.type)) {
        alert('Por favor selecciona una imagen válida (JPG, PNG, GIF, WebP, BMP, TIFF)');
        return;
    }

    // Validar tamaño (10MB)
    if (file.size > 10 * 1024 * 1024) {
        alert('El archivo es demasiado grande. El tamaño máximo es 10MB.');
        return;
    }

    selectedFile = file;
    
    // Mostrar preview
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImg.src = e.target.result;
        preview.style.display = 'block';
    };
    reader.readAsDataURL(file);

    // Actualizar UI
    uploadArea.querySelector('p').innerHTML = `<strong>✓ ${file.name}</strong><br><small>Haz clic para cambiar</small>`;
    convertBtn.disabled = false;
    convertBtn.textContent = `Convertir a ${selectedFormat.toUpperCase()}`;
}

// Función principal de conversión
async function convertImage() {
    if (!selectedFile) {
        alert('Por favor selecciona una imagen primero');
        return;
    }

    // Mostrar loading
    loading.classList.add('active');
    convertBtn.disabled = true;
    convertBtn.textContent = 'Convirtiendo...';

    try {
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('format', selectedFormat);
        formData.append('quality', qualitySlider.value);

        const response = await fetch('/api/convert', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al convertir la imagen');
        }

        // Descargar la imagen convertida
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `converted.${selectedFormat}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        // Mostrar mensaje de éxito
        showSuccess();

    } catch (error) {
        console.error('Error:', error);
        alert('Error al convertir la imagen: ' + error.message);
    } finally {
        // Ocultar loading
        loading.classList.remove('active');
        convertBtn.disabled = false;
        convertBtn.textContent = `Convertir a ${selectedFormat.toUpperCase()}`;
    }
}

function showSuccess() {
    const originalText = convertBtn.textContent;
    convertBtn.textContent = '✓ ¡Descarga completada!';
    convertBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    
    setTimeout(() => {
        convertBtn.textContent = originalText;
        convertBtn.style.background = 'linear-gradient(135deg, var(--primary), var(--secondary))';
    }, 3000);
}

// Detectar formato desde URL para páginas específicas
function detectFormatFromURL() {
    const path = window.location.pathname;
    
    const formatMappings = {
        'jpg-a-png': 'png',
        'png-a-jpg': 'jpg',
        'webp-a-png': 'png',
        'webp-a-jpg': 'jpg',
        'png-a-webp': 'webp',
        'jpg-a-webp': 'webp'
    };

    for (const [key, format] of Object.entries(formatMappings)) {
        if (path.includes(key)) {
            selectedFormat = format;
            formatBtns.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.format === format) {
                    btn.classList.add('active');
                }
            });
            break;
        }
    }
}

// Ejecutar al cargar
detectFormatFromURL();

// Analytics tracking (opcional - agregar tu código de analytics)
function trackConversion(format) {
    // Google Analytics, Plausible, etc.
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'format': format
        });
    }
}
