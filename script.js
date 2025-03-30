// حفظ الحسابات في localStorage
const users = JSON.parse(localStorage.getItem("users")) || [];

// دالة للتبديل بين نموذج التسجيل ونموذج إنشاء الحساب
function showSignupForm() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "block";
}

function showLoginForm() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("signupForm").style.display = "none";
}

// دالة لتسجيل الدخول
function login(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user)); // حفظ المستخدم المسجل
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("appContent").style.display = "block";
        displayImages(); // عرض الصور المخزنة في localStorage
    } else {
        alert("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
}

// دالة لإنشاء حساب جديد
function signup(event) {
    event.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        alert("يوجد بالفعل حساب بهذا البريد الإلكتروني.");
        return;
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users)); // حفظ الحسابات
    alert("تم إنشاء الحساب بنجاح، يمكنك الآن تسجيل الدخول.");
    showLoginForm(); // التبديل إلى نموذج تسجيل الدخول
}

// عرض الصور المحفوظة
function displayImages() {
    const gallery = document.getElementById('imageGallery');
    gallery.innerHTML = '';
    
    // جلب الصور المخزنة من localStorage
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
window.onload = function() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("appContent").style.display = "block";
        displayImages(); // عرض الصور المخزنة
    }
};
