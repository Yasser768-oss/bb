function calculate() {
    const input = document.getElementById('input').value;
    const resultElement = document.getElementById('result');
    const explanationElement = document.getElementById('explanation');
    
    try {
        // حل العملية الرياضية
        let result = eval(input);
        
        // عرض النتيجة
        resultElement.innerHTML = `النتيجة: ${result}`;
        
        // تقديم الشرح
        explanationElement.innerHTML = `تم إجراء العملية: ${input}`;
    } catch (error) {
        resultElement.innerHTML = "خطأ! تأكد من صيغة العملية.";
        explanationElement.innerHTML = "";
    }
}
