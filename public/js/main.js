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

    uploadArea.querySelector('p').innerHTML = `<strong>✓ ${file.name}</strong>`;
    convertBtn.disabled = false;
    convertBtn.textContent = `Convertir a ${selectedFormat.toUpperCase()}`;
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
        a.download = `converted.${selectedFormat}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        convertBtn.textContent = '✓ ¡Descargado!';
        setTimeout(() => {
            convertBtn.textContent = `Convertir a ${selectedFormat.toUpperCase()}`;
        }, 2000);

    } catch (error) {
        alert('Error: ' + error.message);
    } finally {
        if (loading) loading.classList.remove('active');
        convertBtn.disabled = false;
    }
}