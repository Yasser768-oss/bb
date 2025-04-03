// متغيرات عامة للحاسبة
let currentInput = '0';
let previousInput = '';
let operation = null;
let resetScreen = false;

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // عناصر الواجهة
    const chatInterface = document.getElementById('chat-interface');
    const scientificCalculator = document.getElementById('scientific-calculator');
    const gamesInterface = document.getElementById('games-interface');
    const rulesInterface = document.getElementById('rules-interface');
    
    // أزرار الشريط الجانبي
    const chatBtn = document.getElementById('chat-btn');
    const calculatorBtn = document.getElementById('calculator-btn');
    const gamesBtn = document.getElementById('games-btn');
    const rulesBtn = document.getElementById('rules-btn');
    
    // عناصر الدردشة
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    
    // دالة تبديل الواجهات
    function showInterface(interfaceToShow) {
        [chatInterface, scientificCalculator, gamesInterface, rulesInterface].forEach(interface => {
            interface.style.display = 'none';
        });
        interfaceToShow.style.display = 'block';
        
        // تحديث الأزرار النشطة
        [chatBtn, calculatorBtn, gamesBtn, rulesBtn].forEach(btn => {
            btn.classList.remove('active');
        });
        
        if (interfaceToShow === chatInterface) chatBtn.classList.add('active');
        else if (interfaceToShow === scientificCalculator) calculatorBtn.classList.add('active');
        else if (interfaceToShow === gamesInterface) gamesBtn.classList.add('active');
        else if (interfaceToShow === rulesInterface) rulesBtn.classList.add('active');
    }
    
    // دالة إرسال رسالة في الدردشة
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        // عرض رسالة المستخدم
        addMessage(message, 'user');
        userInput.value = '';
        
        // معالجة السؤال وإظهار الرد
        setTimeout(() => {
            const response = processMathQuestion(message);
            addMessage(response, 'bot');
        }, 500);
    }
    
    // دالة إضافة رسالة إلى الدردشة
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // دالة معالجة الأسئلة الرياضية
    function processMathQuestion(question) {
        // تحويل السؤال إلى حروف صغيرة لتبسيط المطابقة
        const q = question.toLowerCase();
        
        // محاولة استخراج الأرقام والعملية من السؤال
        const numbers = q.match(/\d+/g) || [];
        const num1 = numbers[0] ? parseFloat(numbers[0]) : null;
        const num2 = numbers[1] ? parseFloat(numbers[1]) : null;
        
        // تحديد نوع السؤال
        if (q.includes('جمع') || q.includes('اجمع') || q.includes('+') || q.includes('sum') || q.includes('add')) {
            if (num1 !== null && num2 !== null) {
                const result = num1 + num2;
                return `ناتج جمع ${num1} و ${num2} هو ${result}.\n\nالشرح:\nالجمع هو إضافة كميات إلى بعضها. إذا كان لديك ${num1} تفاحة وأضفت إليها ${num2} تفاحة، سيكون لديك ${result} تفاحة في المجموع.`;
            }
        }
        else if (q.includes('طرح') || q.includes('اطرح') || q.includes('-') || q.includes('subtract')) {
            if (num1 !== null && num2 !== null) {
                const result = num1 - num2;
                return `ناتج طرح ${num2} من ${num1} هو ${result}.\n\nالشرح:\nالطرح هو إزالة كمية من كمية أخرى. إذا كان لديك ${num1} قطعة حلوى وأكلت ${num2} قطعة، سيبقى لديك ${result} قطعة.`;
            }
        }
        else if (q.includes('ضرب') || q.includes('اضرب') || q.includes('×') || q.includes('*') || q.includes('multiply')) {
            if (num1 !== null && num2 !== null) {
                const result = num1 * num2;
                return `ناتج ضرب ${num1} في ${num2} هو ${result}.\n\nالشرح:\nالضرب هو جمع متكرر. إذا كان لديك ${num1} صناديق وفي كل صندوق ${num2} أقلام، فلديك ${result} قلماً في المجموع.`;
            }
        }
        else if (q.includes('قسمة') || q.includes('اقسم') || q.includes('÷') || q.includes('/') || q.includes('divide')) {
            if (num1 !== null && num2 !== null) {
                if (num2 === 0) {
                    return 'خطأ! لا يمكن القسمة على صفر.\n\nالشرح:\nالقسمة على صفر غير معرّفة في الرياضيات لأنه لا يمكن تقسيم أي كمية إلى أجزاء صفرية.';
                }
                const result = num1 / num2;
                return `ناتج قسمة ${num1} على ${num2} هو ${result.toFixed(2)}.\n\nالشرح:\nالقسمة هي توزيع كمية بالتساوي. إذا قسمت ${num1} قطعة حلوى بين ${num2} أطفال، سيحصل كل طفل على ${result.toFixed(2)} قطعة.`;
            }
        }
        else if (q.includes('جذر') || q.includes('√') || q.includes('square root')) {
            if (num1 !== null) {
                const result = Math.sqrt(num1);
                return `الجذر التربيعي لـ ${num1} هو ${result.toFixed(2)}.\n\nالشرح:\nالجذر التربيعي هو العدد الذي إذا ضرب في نفسه يعطي العدد الأصلي. ${result.toFixed(2)} × ${result.toFixed(2)} ≈ ${num1}.`;
            }
        }
        else if (q.includes('قانون') || q.includes('قاعدة') || q.includes('rule') || q.includes('formula')) {
            return getMathRuleResponse(q);
        }
        
        // إذا لم يتطابق مع أي من الأنواع السابقة
        return `أنا مساعد الرياضيات الذكي! يمكنني مساعدتك في:
- الحسابات الأساسية (جمع، طرح، ضرب، قسمة)
- الجذور التربيعية
- شرح القوانين والقواعد الرياضية

جرب أن تسأل:
"ما ناتج جمع ٥ و ٧؟"
"ما هو قانون فيثاغورث؟"
"كيف أحسب الجذر التربيعي لـ ١٦؟"`;
    }
    
    // دالة الحصول على شرح للقوانين الرياضية
    function getMathRuleResponse(question) {
        const q = question.toLowerCase();
        
        if (q.includes('فيثاغورث') || q.includes('فيثاغورس') || q.includes('مثلث')) {
            return `نظرية فيثاغورث:
            
في المثلث القائم الزاوية:
الوتر² = الضلع الأول² + الضلع الثاني²

أو
c² = a² + b²

الشرح:
النظرية تربط بين أطوال أضلاع المثلث القائم. الضلع المقابل للزاوية القائمة (الوتر) يساوي الجذر التربيعي لمجموع مربعي الضلعين الآخرين.

مثال:
إذا كان طول الضلعين 3 و 4، فالوتر = √(3² + 4²) = √(9 + 16) = √25 = 5`;
        }
        else if (q.includes('مساحة') || q.includes('مساحه')) {
            if (q.includes('دائرة') || q.includes('دائره')) {
                return `مساحة الدائرة:
المساحة = π × نصف القطر²

أو
A = πr²

حيث:
- π (باي) ≈ 3.14159
- r هو نصف القطر

الشرح:
لمعرفة مساحة الدائرة، نضرب العدد π (وهو نسبة المحيط إلى القطر) في مربع نصف القطر.

مثال:
إذا كان نصف القطر 5 سم، المساحة = π × 5² = 25π ≈ 78.54 سم²`;
            }
        }
        
        return `يمكنني شرح العديد من القوانين الرياضية مثل:
- نظرية فيثاغورث
- قوانين المساحة (المربع، المستطيل، الدائرة)
- قوانين الجبر
- النسب المثلثية

جرب أن تسأل:
"ما هو قانون مساحة الدائرة؟"
"ما هي نظرية فيثاغورث؟"`;
    }
    
    // دالة بدء الألعاب
    window.startGame = function(gameType) {
        alert(`سيتم بدء لعبة ${gameType}. هذه مجرد واجهة توضيحية!`);
    };
    
    // ربط الأحداث
    chatBtn.addEventListener('click', () => showInterface(chatInterface));
    calculatorBtn.addEventListener('click', () => showInterface(scientificCalculator));
    gamesBtn.addEventListener('click', () => showInterface(gamesInterface));
    rulesBtn.addEventListener('click', () => showInterface(rulesInterface));
    
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage();
    });
    
    // إظهار واجهة الدردشة كواجهة افتراضية
    showInterface(chatInterface);
});

// وظائف الحاسبة العلمية
function updateDisplay() {
    document.getElementById('calc-display').textContent = currentInput;
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
}

function backspace() {
    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

function appendNumber(number) {
    if (currentInput === '0' || resetScreen) {
        currentInput = number.toString();
        resetScreen = false;
    } else {
        currentInput += number.toString();
    }
    updateDisplay();
}

function appendDecimal() {
    if (resetScreen) {
        currentInput = '0.';
        resetScreen = false;
        updateDisplay();
        return;
    }
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function appendOperator(op) {
    if (operation !== null) calculateResult();
    previousInput = currentInput;
    operation = op;
    resetScreen = true;
}

function calculateResult() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) return;
    
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    operation = null;
    updateDisplay();
}

function calculateSquareRoot() {
    currentInput = Math.sqrt(parseFloat(currentInput)).toString();
    updateDisplay();
}

function percentage() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}
