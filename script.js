document.addEventListener('DOMContentLoaded', () => {
    const umbrellaImage = document.getElementById('umbrella-image');
    const logoPreview = document.getElementById('logo-preview');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const uploadButton = document.getElementById('upload-button');
    const buttonText = uploadButton.querySelector('.button-text');
    const uploadIcon = uploadButton.querySelector('.upload-icon');
    const buttonSpinner = uploadButton.querySelector('.button-spinner');
    const removeIcon = uploadButton.querySelector('.remove-icon');
    const logoUpload = document.getElementById('logo-upload');
    const loader = document.getElementById('loader');
    const loaderPath = loader.querySelector('path');

    const colorConfig = {
        blue: {
            image: '/images/umbrella-1.png',
            buttonColor: '#2196f3',
            backgroundColor: '#e9f1ff',
            imageSrc: '/images/umbrella-1.png'
        },
        pink: {
            image: '/images/umbrella-2.png',
            buttonColor: '#e91e63',
            backgroundColor: '#fff1f5',
            imageSrc: '/images/umbrella-2.png'
        },
        yellow: {
            image: '/images/umbrella-3.png',
            buttonColor: '#ffc107',
            backgroundColor: '#fffbe9',
            imageSrc: '/images/umbrella-3.png'
        }
    };

    const initialConfig = colorConfig.blue;
    uploadButton.style.backgroundColor = initialConfig.buttonColor;
    document.body.style.backgroundColor = initialConfig.backgroundColor;
    if (loaderPath) {
        loaderPath.style.fill = initialConfig.buttonColor;
    }

    function showSpinner() {
        uploadIcon.classList.add('hidden');
        buttonSpinner.classList.remove('hidden');
    }

    function hideSpinner() {
        buttonSpinner.classList.add('hidden');
        uploadIcon.classList.remove('hidden');
    }

    // Function to reset logo
    function resetLogo() {
        logoPreview.src = '';
        logoPreview.classList.add('hidden');
        buttonText.textContent = 'UPLOAD LOGO';
        removeIcon.classList.add('hidden');
    }

    // Add click handler for remove icon
    removeIcon.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering upload button click
        resetLogo();
    });

    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            const color = swatch.dataset.color;
            const config = colorConfig[color];

            // Show spinner immediately
            showSpinner();
            
            // Immediate updates
            colorSwatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            uploadButton.style.backgroundColor = config.buttonColor;
            document.body.style.backgroundColor = config.backgroundColor;
            
            if (loaderPath) {
                loaderPath.style.fill = config.buttonColor;
            }

            // Fade out current image
            umbrellaImage.classList.add('fade-out');
            if (!logoPreview.classList.contains('hidden')) {
                logoPreview.classList.add('fade-out');
            }
            
            setTimeout(() => {
                umbrellaImage.classList.add('hidden');
                logoPreview.classList.add('hidden');
                loader.classList.remove('hidden');
                setTimeout(() => loader.classList.remove('fade-out'), 50);

                setTimeout(() => {
                    umbrellaImage.src = config.imageSrc;

                    setTimeout(() => {
                        loader.classList.add('fade-out');

                        setTimeout(() => {
                            loader.classList.add('hidden');
                            umbrellaImage.classList.remove('hidden');
                            if (!logoPreview.classList.contains('hidden')) {
                                logoPreview.classList.remove('hidden');
                            }
                            hideSpinner();
                            
                            setTimeout(() => {
                                umbrellaImage.classList.remove('fade-out');
                                if (!logoPreview.classList.contains('hidden')) {
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
            // Update filename and show remove icon immediately
            buttonText.textContent = file.name;
            removeIcon.classList.remove('hidden');
            showSpinner();

            // Validate file size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                resetLogo();
                hideSpinner();
                return;
            }

            // Validate file type
            const validTypes = ['image/jpeg', 'image/png'];
            if (!validTypes.includes(file.type)) {
                alert('Only .jpg and .png files are allowed');
                resetLogo();
                hideSpinner();
                return;
            }

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
                    
                    setTimeout(() => {
                        // Update logo preview while loader is still showing
                        logoPreview.src = e.target.result;
                        
                        setTimeout(() => {
                            loader.classList.add('fade-out');
                            
                            setTimeout(() => {
                                loader.classList.add('hidden');
                                umbrellaImage.classList.remove('hidden');
                                logoPreview.classList.remove('hidden');
                                hideSpinner();
                                
                                setTimeout(() => {
                                    umbrellaImage.classList.remove('fade-out');
                                    logoPreview.classList.remove('fade-out');
                                }, 50);
                            }, 500);
                        }, 2000);
                    }, 500);
                }, 500);
            };
            reader.onerror = () => {
                alert('Failed to read file. Please try again.');
                resetLogo();
                hideSpinner();
            };
            reader.readAsDataURL(file);
        }
    });
});