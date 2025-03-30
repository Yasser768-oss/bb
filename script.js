// عرض الصور المحفوظة
function displayImages() {
    const gallery = document.getElementById('imageGallery');
    gallery.innerHTML = '';
    
    // يمكنك استبدال هذا الجزء بجلب الصور من الخادم لاحقاً
    const images = JSON.parse(localStorage.getItem('bbImages')) || [];
    
    images.forEach((imageData, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = imageData;
        imgElement.alt = `صورة شخصية ${index + 1}`;
        
        const imgContainer = document.createElement('div');
        imgContainer.className = 'image-container';
        imgContainer.appendChild(imgElement);
        
        gallery.appendChild(imgContainer);
    });
}

// رفع الصور
function uploadImages() {
    const input = document.getElementById('imageUpload');
    const files = input.files;
    
    if (files.length === 0) {
        alert('الرجاء اختيار صورة واحدة على الأقل');
        return;
    }
    
    const images = JSON.parse(localStorage.getItem('bbImages')) || [];
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            images.push(e.target.result);
            localStorage.setItem('bbImages', JSON.stringify(images));
            displayImages();
        };
        
        reader.readAsDataURL(file);
    }
    
    input.value = '';
}

// عرض الصور عند تحميل الصفحة
window.onload = displayImages;