// استبدل هذا الكود بالكامل في ملف script.js
const firebaseConfig = {
  apiKey: "AIzaSyYourActualAPIKey", // استبدل بمفتاحك الفعلي
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123def456"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore(); // إذا كنت تستخدم Firestore

// تسجيل حساب جديد
document.getElementById('registerBtn').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    showError("كلمات المرور غير متطابقة");
    return;
  }

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    console.log("تم إنشاء الحساب:", userCredential.user);
    showSuccess("تم إنشاء الحساب بنجاح!");
    
    // إعادة توجيه أو تحديث الواجهة
    window.location.href = "profile.html";
    
  } catch (error) {
    console.error("خطأ في التسجيل:", error);
    showError(getFirebaseError(error));
  }
});

// دالة لعرض الأخطاء
function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  
  const form = document.querySelector('form');
  form.appendChild(errorDiv);
  
  setTimeout(() => errorDiv.remove(), 5000);
}

// دالة لعرض نجاح
function showSuccess(message) {
  alert(message); // أو استخدم واجهة أفضل
}

// ترجمة أخطاء Firebase
function getFirebaseError(error) {
  const errorMap = {
    "auth/invalid-api-key": "مفتاح API غير صالح - يرجى التحقق من إعدادات Firebase",
    "auth/email-already-in-use": "البريد الإلكتروني مستخدم بالفعل",
    "auth/weak-password": "كلمة المرور ضعيفة (يجب أن تكون 6 أحرف على الأقل)",
    "auth/invalid-email": "بريد إلكتروني غير صالح"
  };
  return errorMap[error.code] || error.message;
}
