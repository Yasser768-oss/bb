// متغيرات التطبيق
let currentInterface = 'chat';
let currentInput = '0';
let previousInput = '';
let operation = null;
let resetScreen = false;

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تعريف العناصر
    const chatInterface = document.getElementById('chat-interface');
    const scientificCalculator = document.getElementById('scientific-calculator');
    const gamesInterface = document.getElementById('games-interface');
    const rulesInterface = document.getElementById('rules-interface');
    
    const chatBtn = document.getElementById('chat-btn');
    const calculatorBtn = document.getElementById('calculator-btn');
    const gamesBtn = document.getElementById('games-btn');
    const rulesBtn = document.getElementById('rules-btn');
    
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const calcDisplay = document.getElementById('calc-display');

    // وظيفة تبديل الواجهات
    function switchInterface(interfaceName) {
        // إخفاء جميع الواجهات
        chatInterface.style.display = 'none';
        scientificCalculator.style.display = 'none';
        gamesInterface.style.display = 'none';
        rulesInterface.style.display = 'none';
        
        // إظهار الواجهة المطلوبة
        switch(interfaceName) {
            case 'chat':
                chatInterface.style.display = 'block';
                break;
            case 'calculator':
                scientificCalculator.style.display = 'block';
                break;
            case 'games':
                gamesInterface.style.display = 'block';
                break;
            case 'rules':
                rulesInterface.style.display = 'block';
                break;
        }
        
        // تحديث الأزرار النشطة
        chatBtn.classList.remove('active');
        calculatorBtn.classList.remove('active');
        gamesBtn.classList.remove('active');
        rulesBtn.classList.remove('active');
        
        document.getElementById(`${interfaceName}-btn`).classList.add('active');
        currentInterface = interfaceName;
    }

    // وظيفة إضافة رسالة للدردشة
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // وظيفة معالجة الأسئلة الرياضية
    function processQuestion(question) {
        const q = question.toLowerCase();
        const numbers = q.match(/\d+/g) || [];
        const num1 = numbers[0] ? parseFloat(numbers[0]) : null;
        const num2 = numbers[1] ? parseFloat(numbers[1]) : null;

        if (q.includes('جمع') || q.includes('+') || q.includes('اجمع')) {
            if (num1 && num2) return `ناتج جمع ${num1} و ${num2} هو ${num1 + num2}`;
        }
        else if (q.includes('طرح') || q.includes('-') || q.includes('اطرح')) {
            if (num1 && num2) return `ناتج طرح ${num2} من ${num1} هو ${num1 - num2}`;
        }
        else if (q.includes('ضرب') || q.includes('*') || q.includes('اضرب')) {
            if (num1 && num2) return `ناتج ضرب ${num1} في ${num2} هو ${num1 * num2}`;
        }
        else if (q.includes('قسمة') || q.includes('/') || q.includes('اقسم')) {
            if (num1 && num2) {
                if (num2 === 0) return 'لا يمكن القسمة على صفر!';
                return `ناتج قسمة ${num1} على ${num2} هو ${(num1 / num2).toFixed(2)}`;
            }
        }
        else if (q.includes('جذر') || q.includes('√')) {
            if (num1) return `الجذر التربيعي لـ ${num1} هو ${Math.sqrt(num1).toFixed(2)}`;
        }
        
        return "أنا مساعد الرياضيات الذكي! يمكنك سؤالي عن العمليات الحسابية أو القوانين الرياضية.";
    }

    // وظائف الحاسبة العلمية
    function updateCalculatorDisplay() {
        calcDisplay.textContent = currentInput;
    }

    function handleNumberClick(number) {
        if (currentInput === '0' || resetScreen) {
            currentInput = number;
            resetScreen = false;
        } else {
            currentInput += number;
        }
        updateCalculatorDisplay();
    }

    function handleOperatorClick(op) {
        if (operation !== null) calculateResult();
        previousInput = currentInput;
        operation = op;
        resetScreen = true;
    }

    function calculateResult() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch(operation) {
            case '+': result = prev + current; break;
            case '-': result = prev - current; break;
            case '*': result = prev * current; break;
            case '/': result = prev / current; break;
            default: return;
        }
        
        currentInput = result.toString();
        operation = null;
        updateCalculatorDisplay();
    }

    // ربط الأحداث
    chatBtn.addEventListener('click', () => switchInterface('chat'));
    calculatorBtn.addEventListener('click', () => switchInterface('calculator'));
    gamesBtn.addEventListener('click', () => switchInterface('games'));
    rulesBtn.addEventListener('click', () => switchInterface('rules'));

    sendBtn.addEventListener('click', function() {
        const question = userInput.value.trim();
        if (question) {
            addMessage(question, 'user');
            userInput.value = '';
            
            setTimeout(() => {
                const answer = processQuestion(question);
                addMessage(answer, 'bot');
            }, 500);
        }
    });

    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendBtn.click();
    });

    // تهيئة الحاسبة العلمية
    document.querySelectorAll('.calculator-buttons .calc-btn').forEach(btn => {
        if (btn.textContent.match(/[0-9]/)) {
            btn.addEventListener('click', () => handleNumberClick(btn.textContent));
        } else if (btn.textContent.match(/[\+\-\*\/]/)) {
            btn.addEventListener('click', () => handleOperatorClick(btn.textContent));
        }
    });

    document.querySelector('.eq-btn').addEventListener('click', calculateResult);
    document.querySelector('.func-btn[onclick="clearDisplay()"]').addEventListener('click', function() {
        currentInput = '0';
        previousInput = '';
        operation = null;
        updateCalculatorDisplay();
    });

    document.querySelector('.func-btn[onclick="backspace()"]').addEventListener('click', function() {
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = '0';
        }
        updateCalculatorDisplay();
    });

    document.querySelector('.sci-btn[onclick="calculateSquareRoot()"]').addEventListener('click', function() {
        currentInput = Math.sqrt(parseFloat(currentInput)).toString();
        updateCalculatorDisplay();
    });

    // بدء التطبيق بالواجهة الرئيسية
    switchInterface('chat');
    updateCalculatorDisplay();
});
