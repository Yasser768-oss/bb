function calculate() {
    const input = document.getElementById('input').value;
    const resultElement = document.getElementById('result');
    const explanationElement = document.getElementById('explanation');
    
    try {
        let result = eval(input);
        resultElement.innerHTML = `النتيجة: ${result}`;
        
        // شرح العملية
        explanationElement.innerHTML = `تم إجراء العملية: ${input}`;
    } catch (error) {
        resultElement.innerHTML = "خطأ! تأكد من صيغة العملية.";
        explanationElement.innerHTML = "";
    }
}

function chat() {
    const chatInput = document.getElementById('chat-input').value;
    const chatWindow = document.getElementById('chat-window');

    // إضافة السؤال إلى نافذة الدردشة
    const userMessage = document.createElement('div');
    userMessage.classList.add('user-message');
    userMessage.textContent = "أنت: " + chatInput;
    chatWindow.appendChild(userMessage);

    // الرد من البوت (هنا يمكننا إضافة تحليلات بسيطة)
    const botMessage = document.createElement('div');
    botMessage.classList.add('bot-message');

    // تحليل السؤال والإجابة عليه
    if (chatInput.includes("جمع") || chatInput.includes("+")) {
        botMessage.textContent = "الرياضيات هي عملية جمع الأعداد مثل 3 + 2 = 5!";
    } else if (chatInput.includes("طرح") || chatInput.includes("-")) {
        botMessage.textContent = "الطرح هو إزالة عدد من عدد آخر مثل 5 - 3 = 2!";
    } else if (chatInput.includes("ضرب") || chatInput.includes("*")) {
        botMessage.textContent = "الضرب هو إضافة نفس الرقم عدة مرات مثل 3 * 2 = 6!";
    } else if (chatInput.includes("قسمة") || chatInput.includes("/")) {
        botMessage.textContent = "القسمة هي توزيع الأعداد بالتساوي مثل 6 ÷ 2 = 3!";
    } else if (chatInput.includes("جذر")) {
        botMessage.textContent = "الجذر التربيعي هو إيجاد الرقم الذي إذا ضرب بنفسه يعطيك العدد الأصلي.";
    } else {
        botMessage.textContent = "أنا هنا لمساعدتك! اسألني أي شيء عن الرياضيات!";
    }

    chatWindow.appendChild(botMessage);
    document.getElementById('chat-input').value = '';
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
