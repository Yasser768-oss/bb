function chat() {
    const chatInput = document.getElementById('chat-input').value;
    const chatWindow = document.getElementById('chat-window');

    // إضافة السؤال إلى نافذة الدردشة
    const userMessage = document.createElement('div');
    userMessage.classList.add('user-message');
    userMessage.textContent = "أنت: " + chatInput;
    chatWindow.appendChild(userMessage);

    // الرد من البوت (هنا يمكننا إضافة تحليلات وتفسير مفصل)
    const botMessage = document.createElement('div');
    botMessage.classList.add('bot-message');

    if (chatInput.includes("جمع") || chatInput.includes("+")) {
        botMessage.textContent = "الرياضيات هي عملية جمع الأعداد مثل 3 + 2 = 5!";
    } else if (chatInput.includes("نكت") || chatInput.includes("ألعاب")) {
        botMessage.textContent = "هل تعرفون لماذا الرياضيات لا تحب اللعب؟ لأنها دائمًا تكون جادة!";
    } else if (chatInput.includes("ما هو الجذر التربيعي")) {
        botMessage.textContent = "الجذر التربيعي هو إيجاد الرقم الذي إذا ضرب بنفسه يعطيك العدد الأصلي. مثلًا الجذر التربيعي لـ 9 هو 3.";
    } else {
        botMessage.textContent = "أريد أن أساعدك! أخبرني عن سؤالك!";
    }

    chatWindow.appendChild(botMessage);
    document.getElementById('chat-input').value = '';
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function showTip(type) {
    const suggestions = {
        math: "مفاهيم الرياضيات تشمل الجبر والهندسة... يمكنني مساعدتك في كل شيء!",
        games: "هل ترغب في لعبة رياضية؟ حاول حل الألغاز الرياضية!",
        jokes: "لماذا لا تحب الرياضيات؟ لأنها دائمًا في حالة تقاطع!"
    };

    alert(suggestions[type]);
}
