// تأكد من أن هذه الأسطر موجودة في بداية الملف
document.addEventListener('DOMContentLoaded', function() {
    // عناصر الدردشة
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // دالة إرسال الرسالة
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
        }, 1000);
    }

    // دالة إضافة الرسالة
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // ربط الأحداث
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage();
    });

    // باقي الكود...
});
    
    // أزرار الشريط الجانبي
    const chatBtn = document.getElementById('chat-btn');
    const calculatorBtn = document.getElementById('calculator-btn');
    const gamesBtn = document.getElementById('games-btn');
    const rulesBtn = document.getElementById('rules-btn');
    
    // عناصر الدردشة
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    
    // تغيير الواجهات
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
    
    // أحداث الأزرار
    chatBtn.addEventListener('click', () => showInterface(chatInterface));
    calculatorBtn.addEventListener('click', () => {
        showInterface(scientificCalculator);
        initScientificCalculator();
    });
    gamesBtn.addEventListener('click', () => {
        showInterface(gamesInterface);
        initGames();
    });
    rulesBtn.addEventListener('click', () => {
        showInterface(rulesInterface);
        initMathRules();
    });
    
    // إرسال رسالة في الدردشة
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
        }, 1000);
    }
    
    // إضافة رسالة إلى الدردشة
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        
        // معالجة النص ليكون مناسباً للرياضيات
        let processedText = text;
        
        // تحويل المعادلات الرياضية البسيطة
        processedText = processedText.replace(/\^(\d+)/g, '<sup>$1</sup>');
        processedText = processedText.replace(/_(\d+)/g, '<sub>$1</sub>');
        processedText = processedText.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
        
        messageDiv.innerHTML = processedText;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // معالجة الأسئلة الرياضية
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
                return `ناتج جمع ${num1} و ${num2} هو *${result}*.\n\n*الشرح:*\nالجمع هو إضافة كميات إلى بعضها. إذا كان لديك ${num1} تفاحة وأضفت إليها ${num2} تفاحة، سيكون لديك ${result} تفاحة في المجموع.`;
            }
        }
        else if (q.includes('طرح') || q.includes('اطرح') || q.includes('-') || q.includes('subtract')) {
            if (num1 !== null && num2 !== null) {
                const result = num1 - num2;
                return `ناتج طرح ${num2} من ${num1} هو *${result}*.\n\n*الشرح:*\nالطرح هو إزالة كمية من كمية أخرى. إذا كان لديك ${num1} قطعة حلوى وأكلت ${num2} قطعة، سيبقى لديك ${result} قطعة.`;
            }
        }
        else if (q.includes('ضرب') || q.includes('اضرب') || q.includes('×') || q.includes('*') || q.includes('multiply')) {
            if (num1 !== null && num2 !== null) {
                const result = num1 * num2;
                return `ناتج ضرب ${num1} في ${num2} هو *${result}*.\n\n*الشرح:*\nالضرب هو جمع متكرر. إذا كان لديك ${num1} صناديق وفي كل صندوق ${num2} أقلام، فلديك ${result} قلماً في المجموع.`;
            }
        }
        else if (q.includes('قسمة') || q.includes('اقسم') || q.includes('÷') || q.includes('/') || q.includes('divide')) {
            if (num1 !== null && num2 !== null) {
                if (num2 === 0) {
                    return '*خطأ!* لا يمكن القسمة على صفر.\n\n*الشرح:*\nالقسمة على صفر غير معرّفة في الرياضيات لأنه لا يمكن تقسيم أي كمية إلى أجزاء صفرية.';
                }
                const result = num1 / num2;
                return `ناتج قسمة ${num1} على ${num2} هو *${result.toFixed(2)}*.\n\n*الشرح:*\nالقسمة هي توزيع كمية بالتساوي. إذا قسمت ${num1} قطعة حلوى بين ${num2} أطفال، سيحصل كل طفل على ${result.toFixed(2)} قطعة.`;
            }
        }
        else if (q.includes('جذر') || q.includes('√') || q.includes('square root')) {
            if (num1 !== null) {
                const result = Math.sqrt(num1);
                return `الجذر التربيعي لـ ${num1} هو *${result.toFixed(2)}*.\n\n*الشرح:*\nالجذر التربيعي هو العدد الذي إذا ضرب في نفسه يعطي العدد الأصلي. ${result.toFixed(2)} × ${result.toFixed(2)} ≈ ${num1}.`;
            }
        }
        else if (q.includes('قانون') || q.includes('قاعدة') || q.includes('rule') || q.includes('formula')) {
            return getMathRuleResponse(q);
        }
        
        // إذا لم يتطابق مع أي من الأنواع السابقة
        return `أنا مساعد الرياضيات الذكي! يمكنني مساعدتك في:\n- *الحسابات الأساسية* (جمع، طرح، ضرب، قسمة)\n- *الجذور التربيعية*\n- *شرح القوانين والقواعد الرياضية*\n\nجرب أن تسأل:\n"ما ناتج جمع ٥ و ٧؟"\n"ما هو قانون فيثاغورث؟"\n"كيف أحسب الجذر التربيعي لـ ١٦؟"`;
    }
    
    // الحاسبة العلمية
    function initScientificCalculator() {
        scientificCalculator.innerHTML = `
            <h2><i class="fas fa-calculator"></i> الحاسبة العلمية</h2>
            <div class="calculator-display" id="calc-display">0</div>
            <div class="calculator-buttons">
                <button class="calc-btn func-btn" onclick="clearDisplay()">C</button>
                <button class="calc-btn func-btn" onclick="backspace()">⌫</button>
                <button class="calc-btn func-btn" onclick="percentage()">%</button>
                <button class="calc-btn op-btn" onclick="appendOperator('/')">÷</button>
                
                <button class="calc-btn" onclick="appendNumber(7)">7</button>
                <button class="calc-btn" onclick="appendNumber(8)">8</button>
                <button class="calc-btn" onclick="appendNumber(9)">9</button>
                <button class="calc-btn op-btn" onclick="appendOperator('*')">×</button>
                
                <button class="calc-btn" onclick="appendNumber(4)">4</button>
                <button class="calc-btn" onclick="appendNumber(5)">5</button>
                <button class="calc-btn" onclick="appendNumber(6)">6</button>
                <button class="calc-btn op-btn" onclick="appendOperator('-')">-</button>
                
                <button class="calc-btn" onclick="appendNumber(1)">1</button>
                <button class="calc-btn" onclick="appendNumber(2)">2</button>
                <button class="calc-btn" onclick="appendNumber(3)">3</button>
                <button class="calc-btn op-btn" onclick="appendOperator('+')">+</button>
                
                <button class="calc-btn" onclick="appendNumber(0)">0</button>
                <button class="calc-btn" onclick="appendDecimal()">.</button>
                <button class="calc-btn sci-btn" onclick="calculateSquareRoot()">√</button>
                <button class="calc-btn eq-btn" onclick="calculateResult()">=</button>
                
                <button class="calc-btn sci-btn" onclick="calculatePower()">x^y</button>
                <button class="calc-btn sci-btn" onclick="calculateSin()">sin</button>
                <button class="calc-btn sci-btn" onclick="calculateCos()">cos</button>
                <button class="calc-btn sci-btn" onclick="calculateTan()">tan</button>
                
                <button class="calc-btn sci-btn" onclick="calculateLog()">log</button>
                <button class="calc-btn sci-btn" onclick="calculateLn()">ln</button>
                <button class="calc-btn sci-btn" onclick="calculateFactorial()">x!</button>
                <button class="calc-btn sci-btn" onclick="calculatePi()">π</button>
            </div>
            <div class="calculator-help">
                <p>استخدم الحاسبة العلمية لإجراء العمليات المعقدة مثل الجذور، الأسس، والدوال المثلثية.</p>
            </div>
        `;
    }
    
    // الألعاب التعليمية
    function initGames() {
        gamesInterface.innerHTML = `
            <h2><i class="fas fa-gamepad"></i> الألعاب التعليمية</h2>
            <div class="games-grid">
                <div class="game-card" onclick="startGame('addition')">
                    <img src="assets/images/addition-game.jpg" alt="لعبة الجمع">
                    <h3>تحدي الجمع</h3>
                    <p>اجمع الأعداد بسرعة!</p>
                </div>
                
                <div class="game-card" onclick="startGame('subtraction')">
                    <img src="assets/images/subtraction-game.jpg" alt="لعبة الطرح">
                    <h3>مغامرة الطرح</h3>
                    <p>اختبار مهاراتك في الطرح</p>
                </div>
                
                <div class="game-card" onclick="startGame('multiplication')">
                    <img src="assets/images/multiplication-game.jpg" alt="لعبة الضرب">
                    <h3>سباق الضرب</h3>
                    <p>حسّن حفظك لجدول الضرب</p>
                </div>
                
                <div class="game-card" onclick="startGame('division')">
                    <img src="assets/images/division-game.jpg" alt="لعبة القسمة">
                    <h3>مملكة القسمة</h3>
                    <p>تعلّم القسمة المطولة</p>
                </div>
                
                <div class="game-card" onclick="startGame('fractions')">
                    <img src="assets/images/fractions-game.jpg" alt="لعبة الكسور">
                    <h3>عالم الكسور</h3>
                    <p>افهم الكسور بطريقة ممتعة</p>
                </div>
                
                <div class="game-card" onclick="startGame('shapes')">
                    <img src="assets/images/shapes-game.jpg" alt="لعبة الأشكال">
                    <h3>مغامرة الأشكال</h3>
                    <p>تعرف على الأشكال الهندسية</p>
                </div>
            </div>
        `;
    }
    
    // القوانين الرياضية
    function initMathRules() {
        rulesInterface.innerHTML = `
            <h2><i class="fas fa-book"></i> القوانين والقواعد الرياضية</h2>
            
            <div class="rule-category">
                <h3>الجبر</h3>
                
                <div class="rule-item">
                    <h4>قانون التوزيع</h4>
                    <p>a × (b + c) = a×b + a×c</p>
                    <p>ينطبق هذا القانون على ضرب عدد بمجموع عددين.</p>
                </div>
                
                <div class="rule-item">
                    <h4>المعادلة التربيعية</h4>
                    <p>لحل ax² + bx + c = 0:</p>
                    <p>x = [-b ± √(b² - 4ac)] / 2a</p>
                </div>
            </div>
            
            <div class="rule-category">
                <h3>الهندسة</h3>
                
                <div class="rule-item">
                    <h4>نظرية فيثاغورث</h4>
                    <p>في المثلث القائم: a² + b² = c²</p>
                    <p>حيث c هو الوتر، وa، b هما الضلعان الآخران.</p>
                </div>
                
                <div class="rule-item">
                    <h4>مساحة الدائرة</h4>
                    <p>المساحة = πr²</p>
                    <p>حيث r هو نصف القطر، وπ ≈ 3.14159</p>
                </div>
            </div>
            
            <div class="rule-category">
                <h3>حساب المثلثات</h3>
                
                <div class="rule-item">
                    <h4>النسب المثلثية</h4>
                    <p>في المثلث القائم:</p>
                    <p>sin(θ) = المقابل / الوتر</p>
                    <p>cos(θ) = المجاور / الوتر</p>
                    <p>tan(θ) = المقابل / المجاور</p>
                </div>
            </div>
            
            <div class="rule-category">
                <h3>التفاضل والتكامل</h3>
                
                <div class="rule-item">
                    <h4>قواعد الاشتقاق</h4>
                    <p>قاعدة القوة: إذا كانت f(x) = x^n، فإن f'(x) = nx^(n-1)</p>
                    <p>قاعدة السلسلة: مشتقة f(g(x)) هي f'(g(x)) × g'(x)</p>
                </div>
            </div>
        `;
    }
    
    // وظائف الحاسبة العلمية (سيتم تعريفها كوظائف عامة)
    window.clearDisplay = function() {
        document.getElementById('calc-display').innerText = '0';
    };
    
    window.backspace = function() {
        const display = document.getElementById('calc-display');
        if (display.innerText.length === 1) {
            display.innerText = '0';
        } else {
            display.innerText = display.innerText.slice(0, -1);
        }
    };
    
    // ... (سيتم إضافة باقي وظائف الحاسبة)
    
    // بدء تشغيل الواجهة الرئيسية
    showInterface(chatInterface);
    
    // أحداث الدردشة
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage();
    });
});

// وظائف إضافية للدردشة
function getMathRuleResponse(question) {
    const q = question.toLowerCase();
    
    if (q.includes('فيثاغورث') || q.includes('فيثاغورس') || q.includes('مثلث')) {
        return `*نظرية فيثاغورث*:\n\nفي المثلث القائم الزاوية:\n\n*الوتر² = الضلع الأول² + الضلع الثاني²*\n\nأو\n\n*c² = a² + b²*\n\n*الشرح:*\nالنظرية تربط بين أطوال أضلاع المثلث القائم. الضلع المقابل للزاوية القائمة (الوتر) يساوي الجذر التربيعي لمجموع مربعي الضلعين الآخرين.\n\n*مثال:*\nإذا كان طول الضلعين 3 و 4، فالوتر = √(3² + 4²) = √(9 + 16) = √25 = 5`;
    }
    else if (q.includes('مساحة') || q.includes('مساحه')) {
        if (q.includes('دائرة') || q.includes('دائره')) {
            return `*مساحة الدائرة*:\n\n*المساحة = π × نصف القطر²*\n\nأو\n\n*A = πr²*\n\nحيث:\n- π (باي) ≈ 3.14159\n- r هو نصف القطر\n\n*الشرح:*\nلمعرفة مساحة الدائرة، نضرب العدد π (وهو نسبة المحيط إلى القطر) في مربع نصف القطر.\n\n*مثال:*\nإذا كان نصف القطر 5 سم، المساحة = π × 5² = 25π ≈ 78.54 سم²`;
        }
        else if (q.includes('مربع')) {
            return `*مساحة المربع*:\n\n*المساحة = الضلع × الضلع*\n\nأو\n\n*A = s²*\n\n*الشرح:*\nلمعرفة مساحة المربع، نضرب طول الضلع في نفسه.\n\n*مثال:*\nإذا كان طول الضلع 4 سم، المساحة = 4 × 4 = 16 سم²`;
        }
    }
    
    return `يمكنني شرح العديد من القوانين الرياضية مثل:\n- *نظرية فيثاغورث*\n- *قوانين المساحة* (المربع، المستطيل، الدائرة)\n- *قوانين الجبر*\n- *النسب المثلثية*\n\nجرب أن تسأل:\n"ما هو قانون مساحة الدائرة؟"\n"ما هي نظرية فيثاغورث؟"`;
}

// وظائف الألعاب
function startGame(gameType) {
    alert(`سيتم بدء لعبة ${gameType}. هذه مجرد واجهة توضيحية - سيتم تطوير اللعبة بالكامل لاحقاً!`);
}
