document.addEventListener('DOMContentLoaded', () => {
    const umbrellaImage = document.getElementById('umbrella-image');
    const logoPreview = document.getElementById('logo-preview');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const uploadButton = document.getElementById('upload-button');
    const logoUpload = document.getElementById('logo-upload');
    const loader = document.getElementById('loader');
    const loaderPath = loader.querySelector('path');

    const colorConfig = {
        blue: {
            image: '/images/umbrella-1.png',
            buttonColor: '#2196f3',
            backgroundColor: '#e9f1ff'
        },
        pink: {
            image: '/images/umbrella-2.png',
            buttonColor: '#e91e63',
            backgroundColor: '#fff1f5'
        },
        yellow: {
            image: '/images/umbrella-3.png',
            buttonColor: '#ffc107',
            backgroundColor: '#fffbe9'
        }
    };

    const initialConfig = colorConfig.blue;
    uploadButton.style.backgroundColor = initialConfig.buttonColor;
    document.body.style.backgroundColor = initialConfig.backgroundColor;
    if (loaderPath) {
        loaderPath.style.fill = initialConfig.buttonColor;
    }

    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            const color = swatch.dataset.color;
            const config = colorConfig[color];
            umbrellaImage.src = config.image;
            colorSwatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            uploadButton.style.backgroundColor = config.buttonColor;
            document.body.style.backgroundColor = config.backgroundColor;

            if (loaderPath) {
                loaderPath.style.fill = config.buttonColor;
            }
        });
    });

    uploadButton.addEventListener('click', () => {
        logoUpload.click();
    });

    logoUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                loader.classList.remove('hidden');
                umbrellaImage.classList.add('hidden');
                logoPreview.classList.add('hidden');

                setTimeout(() => {
                    logoPreview.src = e.target.result;
                    logoPreview.classList.remove('hidden');
                    loader.classList.add('hidden');
                    umbrellaImage.classList.remove('hidden');
                }, 3000);
            };
            reader.readAsDataURL(file);
        }
    });
});