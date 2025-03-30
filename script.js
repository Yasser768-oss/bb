let db;
const request = indexedDB.open("imageDB", 1);

// فتح قاعدة البيانات أو إنشاؤها إذا لم تكن موجودة
request.onupgradeneeded = function(event) {
    const db = event.target.result;
    if (!db.objectStoreNames.contains("images")) {
        db.createObjectStore("images", { keyPath: "id", autoIncrement: true });
    }
};

// عند نجاح فتح القاعدة
request.onsuccess = function(event) {
    db = event.target.result;
    console.log("تم فتح قاعدة البيانات بنجاح");
    displayImagesFromDB(); // عرض الصور عند فتح القاعدة
};

// عند حدوث خطأ في فتح القاعدة
request.onerror = function(event) {
    console.error("خطأ في فتح قاعدة البيانات", event);
};

// تخزين الصور في قاعدة البيانات (IndexedDB)
function storeImageInDB(imageData) {
    const transaction = db.transaction(["images"], "readwrite");
    const store = transaction.objectStore("images");

    // إضافة الصورة إلى قاعدة البيانات
    store.add({ data: imageData });

    transaction.oncomplete = function() {
        console.log("تم إضافة الصورة إلى قاعدة البيانات");
    };

    transaction.onerror = function() {
        console.error("خطأ في إضافة الصورة إلى قاعدة البيانات");
    };
}

// عرض الصور من قاعدة البيانات
function displayImagesFromDB() {
    const gallery = document.getElementById('imageGallery');
    gallery.innerHTML = '';

    const transaction = db.transaction(["images"], "readonly");
    const store = transaction.objectStore("images");
    const request = store.getAll();

    request.onsuccess = function() {
        const images = request.result;
        images.forEach(image => {
            if (image && image.data) {
                const imgElement = document.createElement('img');
                imgElement.src = image.data;
                imgElement.alt = `صورة شخصية ${image.id}`;

                const deleteBtn = document.createElement('button');
                deleteBtn.innerText = "❌";
                deleteBtn.onclick = function() {
                    deleteImageFromDB(image.id);
                };

                const imgContainer = document.createElement('div');
                imgContainer.className = 'image-container';
                imgContainer.appendChild(imgElement);
                imgContainer.appendChild(deleteBtn);

                gallery.appendChild(imgContainer);
            }
        });
    };

    request.onerror = function() {
        console.error("خطأ في جلب الصور من قاعدة البيانات");
    };
}

// حذف صورة من قاعدة البيانات
function deleteImageFromDB(id) {
    const transaction = db.transaction(["images"], "readwrite");
    const store = transaction.objectStore("images");

    // جلب جميع الصور باستخدام getAll
    const getRequest = store.getAll();
    getRequest.onsuccess = function() {
        const images = getRequest.result;
        const imageToDelete = images.find(image => image.id === id);

        if (imageToDelete) {
            // إذا كانت الصورة موجودة، حذفها
            const deleteRequest = store.delete(id);
            deleteRequest.onsuccess = function() {
                console.log("تم حذف الصورة");
                displayImagesFromDB(); // تحديث المعرض بعد الحذف
            };
            deleteRequest.onerror = function() {
                console.error("خطأ في حذف الصورة");
            };
        } else {
            console.error("الصورة غير موجودة في قاعدة البيانات");
        }
    };

    getRequest.onerror = function() {
        console.error("خطأ في التحقق من وجود الصورة");
    };
}

// رفع الصور
function uploadImages() {
    const input = document.getElementById('imageUpload');
    const files = Array.from(input.files);

    if (files.length === 0) {
        alert('الرجاء اختيار صورة واحدة على الأقل');
        return;
    }

    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            console.log("بيانات الصورة:", e.target.result);
            storeImageInDB(e.target.result);
            displayImagesFromDB();
        };
        reader.onerror = function(error) {
            console.error("خطأ في قراءة الملف:", error);
            alert("حدث خطأ أثناء قراءة الملف.");
        };
        reader.readAsDataURL(file);
    });

    input.value = '';
}

// تسجيل الدخول
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // تحقق من وجود البيانات في localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email === email && user.password === password) {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
}

// إنشاء حساب جديد
function register() {
    const email = document.getElementById('new-email').value;
    const password = document.getElementById('new-password').value;

    // تحقق من وجود المستخدم مسبقًا
    const existingUser = JSON.parse(localStorage.getItem('user'));
    if (existingUser && existingUser.email === email) {
        document.getElementById('register-error').style.display = 'block';
    } else {
        const newUser = { email: email, password: password };
        localStorage.setItem('user', JSON.stringify(newUser));
        alert('تم إنشاء الحساب بنجاح');
        showLoginForm(); // العودة إلى نموذج تسجيل الدخول بعد إنشاء الحساب
    }
}

// عرض نموذج تسجيل الدخول
function showLoginForm() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

// عرض نموذج إنشاء الحساب
function showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}
