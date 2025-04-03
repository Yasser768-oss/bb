// متغيرات التطبيق
const OPENROUTER_API_KEY = "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"; // استبدل بمفتاح API الخاص بك
let currentInterface = 'chat';

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تعريف العناصر
    const interfaces = {
        chat: document.getElementById('chat-interface'),
        calculator: document.getElementById('scientific-calculator'),
        games: document.getElementById('games-interface'),
        rules: document.getElementById('rules-interface')
    };
    
    const buttons = {
        chat: document.getElementById('chat-btn'),
        calculator: document.getElementById('calculator-btn'),
        games: document.getElementById('games-btn'),
        rules: document.getElementById('rules-btn')
    };
    
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // وظيفة تبديل الواجهات
    function switchInterface(interfaceName) {
        Object.values(interfaces).forEach(ui => ui.style.display = 'none');
        interfaces[interfaceName].style.display = 'block';
        
        Object.values(buttons).forEach(btn => btn.classList.remove('active'));
        buttons[interfaceName].classList.add('active');
        
        currentInterface = interfaceName;
    }

    // وظيفة إضافة رسالة للدردشة
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        // معالجة النص لتحويل المعادلات الرياضية
        let processedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                               .replace(/\n/g, '<br>');
        
        messageDiv.innerHTML = processedText;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // وظيفة التواصل مع OpenRouter API
    async function getAIResponse(prompt) {
        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'HTTP-Referer': window.location.href,
                    'X-Title': 'Math Assistant'
                },
                body: JSON.stringify({
                    model: "openai/gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: "أنت مساعد رياضيات ذكي يتحدث العربية بطلاقة. قدم إجابات واضحة ومبسطة تناسب الأطفال مع أمثلة عملية. ركز على المفاهيم الرياضية الأساسية والحسابات. استخدم تنسيق Markdown للتمييز بين الأجزاء المهمة."
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 1000
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('Error calling OpenRouter API:', error);
            return "**عذرًا**، حدث خطأ أثناء معالجة سؤالك. يرجى المحاولة مرة أخرى لاحقًا.\n\nإذا استمرت المشكلة، يمكنك طرح سؤالك بشكل مختلف أو تجربة قسم القوانين الرياضية للحصول على إجابات جاهزة.";
        }
    }

    // إرسال الرسالة واستقبال الرد
    async function sendMessage() {
        const question = userInput.value.trim();
        if (!question) return;
        
        addMessage(question, 'user');
        userInput.value = '';
        
        // إظهار مؤشر أن البوت يكتب
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message bot-message typing-indicator';
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        try {
            const response = await getAIResponse(question);
            chatMessages.removeChild(typingIndicator);
            addMessage(response, 'bot');
        } catch (error) {
            chatMessages.removeChild(typingIndicator);
            addMessage("**عذرًا**، تعذر الاتصال بخدمة المساعدة الذكية. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.", 'bot');
        }
    }

    // وظائف الحاسبة العلمية
    let calcState = {
        currentInput: '0',
        previousInput: '',
        operation: null,
        resetScreen: false
    };

    function updateCalculatorDisplay() {
        document.getElementById('calc-display').textContent = calcState.currentInput;
    }

    function handleNumberClick(number) {
        if (calcState.currentInput === '0' || calcState.resetScreen) {
            calcState.currentInput = number;
            calcState.resetScreen = false;
        } else {
            calcState.currentInput += number;
        }
        updateCalculatorDisplay();
    }

    function handleOperatorClick(op) {
        if (calcState.operation !== null) calculateResult();
        calcState.previousInput = calcState.currentInput;
        calcState.operation = op;
        calcState.resetScreen = true;
    }

    function calculateResult() {
        let result;
        const prev = parseFloat(calcState.previousInput);
        const current = parseFloat(calcState.currentInput);
        
        if (isNaN(prev) return;
        
        switch(calcState.operation) {
            case '+': result = prev + current; break;
            case '-': result = prev - current; break;
            case '*': result = prev * current; break;
            case '/': 
                if (current === 0) {
                    addMessage("**خطأ**: لا يمكن القسمة على صفر!", 'bot');
                    return;
                }
                result = prev / current; 
                break;
            default: return;
        }
        
        calcState.currentInput = result.toString();
        calcState.operation = null;
        updateCalculatorDisplay();
        
        // إظهار الشرح في الدردشة
        const explanation = `ناتج العملية: ${prev} ${calcState.operation} ${current} = ${result}`;
        addMessage(explanation, 'bot');
    }

    // ربط الأحداث
    Object.entries(buttons).forEach(([name, btn]) => {
        btn.addEventListener('click', () => switchInterface(name));
    });

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // أحداث الحاسبة العلمية
    document.querySelectorAll('.calculator-buttons .calc-btn').forEach(btn => {
        if (btn.textContent.match(/[0-9]/)) {
            btn.addEventListener('click', () => handleNumberClick(btn.textContent));
        } else if (btn.textContent.match(/[\+\-\*\/]/)) {
            btn.addEventListener('click', () => handleOperatorClick(btn.textContent));
        }
    });

    document.querySelector('.eq-btn').addEventListener('click', calculateResult);
    document.querySelector('.func-btn[onclick="clearDisplay()"]').addEventListener('click', function() {
        calcState = {
            currentInput: '0',
            previousInput: '',
            operation: null,
            resetScreen: false
        };
        updateCalculatorDisplay();
    });

    document.querySelector('.func-btn[onclick="backspace()"]').addEventListener('click', function() {
        if (calcState.currentInput.length > 1) {
            calcState.currentInput = calcState.currentInput.slice(0, -1);
        } else {
            calcState.currentInput = '0';
        }
        updateCalculatorDisplay();
    });

    document.querySelector('.sci-btn[onclick="calculateSquareRoot()"]').addEventListener('click', function() {
        const num = parseFloat(calcState.currentInput);
        if (num < 0) {
            addMessage("**خطأ**: لا يمكن حساب الجذر التربيعي لعدد سالب!", 'bot');
            return;
        }
        calcState.currentInput = Math.sqrt(num).toString();
        updateCalculatorDisplay();
        addMessage(`الجذر التربيعي لـ ${num} هو ${calcState.currentInput}`, 'bot');
    });

    // بدء التطبيق
    switchInterface('chat');
    updateCalculatorDisplay();
});
