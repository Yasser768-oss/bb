// دالة لتسجيل الدخول
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // التحقق من صحة البريد الإلكتروني وكلمة المرور
    if (email && password) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('uploadSection').style.display = 'block';
        document.getElementById('userInfo').textContent = `مرحباً، ${email}`;
        document.getElementById('logoutBtn').style.display = 'inline-block';
        displayImages();
    } else {
        alert('يرجى إدخال البريد الإلكتروني وكلمة المرور');
    }
}

// دالة لتسجيل الخروج
function logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('uploadSection').style.display = 'none';
    document.getElementById('userInfo').textContent = '';
    document.getElementById('logoutBtn').style.display = 'none';
    alert('تم تسجيل الخروج');
}

// عرض الصور المحفوظة
function displayImages() {
    const gallery = document.getElementById('imageGallery');
    gallery.innerHTML = '';
    
    // جلب الصور من localStorage
    const images = JSON.parse(localStorage.getItem('bbImages')) || [];
    
    images.forEach((imageData, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = imageData;
        imgElement.alt = `صورة شخصية ${index + 1}`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'حذف';
        deleteBtn.onclick = function() {
            deleteImage(index);
        };

        const imgContainer = document.createElement('div');
        imgContainer.className = 'image-container';
        imgContainer.appendChild(imgElement);
        imgContainer.appendChild(deleteBtn);

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

// حذف صورة
function deleteImage(index) {
    const images = JSON.parse(localStorage.getItem('bbImages')) || [];
    images.splice(index, 1);
    localStorage.setItem('bbImages', JSON.stringify(images));
    displayImages();
}

// عرض الصور عند تحميل الصفحة
window.onload = function() {
    const email = localStorage.getItem('email');
    if (email) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('uploadSection').style.display = 'block';
        document.getElementById('userInfo').textContent = `مرحباً، ${email}`;
        document.getElementById('logoutBtn').style.display = 'inline-block';
        displayImages();
    }
};
