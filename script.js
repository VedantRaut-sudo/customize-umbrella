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
            
            colorSwatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            uploadButton.style.backgroundColor = config.buttonColor;
            document.body.style.backgroundColor = config.backgroundColor;
            
            
            if (loaderPath) {
                loaderPath.style.fill = config.buttonColor;
            }
            umbrellaImage.classList.add('fade-out');
            logoPreview.classList.add('fade-out');
            
            setTimeout(() => {
                umbrellaImage.classList.add('hidden');
                logoPreview.classList.add('hidden');
                loader.classList.remove('hidden');
                setTimeout(() => loader.classList.remove('fade-out'), 50);
                

                setTimeout(() => {
                    umbrellaImage.src = config.image;


                    setTimeout(() => {
                        loader.classList.add('fade-out');
                        

                        setTimeout(() => {
                            loader.classList.add('hidden');
                            umbrellaImage.classList.remove('hidden');
                            if (logoPreview.src) {
                                logoPreview.classList.remove('hidden');
                            }
                            setTimeout(() => {
                                umbrellaImage.classList.remove('fade-out');
                                if (logoPreview.src) {
                                    logoPreview.classList.remove('fade-out');
                                }
                            }, 50);
                        }, 500);
                    }, 2000);
                }, 500);
            }, 500);
        });
    });

    uploadButton.addEventListener('click', () => {
        logoUpload.click();
    });

    logoUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Show loader first
                loader.classList.remove('hidden');
                loader.classList.remove('fade-out');
                umbrellaImage.classList.add('fade-out');
                logoPreview.classList.add('fade-out');
                
                setTimeout(() => {
                    umbrellaImage.classList.add('hidden');
                    logoPreview.classList.add('hidden');
                    
                    // After delay, fade out loader and show images
                    setTimeout(() => {
                        // Update logo preview while loader is still showing
                        logoPreview.src = e.target.result;
                        
                        // Start fade out of loader
                        setTimeout(() => {
                            loader.classList.add('fade-out');
                            
                            // After loader fades out, show both images
                            setTimeout(() => {
                                loader.classList.add('hidden');
                                umbrellaImage.classList.remove('hidden');
                                logoPreview.classList.remove('hidden');
                                
                                // Small delay for fade in
                                setTimeout(() => {
                                    umbrellaImage.classList.remove('fade-out');
                                    logoPreview.classList.remove('fade-out');
                                }, 50);
                            }, 500);
                        }, 2000);
                    }, 500);
                }, 500);
            };
            reader.readAsDataURL(file);
        }
    });
});