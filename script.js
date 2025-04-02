function calculate() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;
    
    let result, explanation;
    
    switch(operation) {
        case 'add':
            result = num1 + num2;
            explanation = `جمع ${num1} و ${num2}:
            تخيل أن لديك ${num1} تفاحة، وأعطاك صديقك ${num2} تفاحة أخرى.
            الآن لديك ${result} تفاحات في المجموع! 🍎🍏`;
            break;
        case 'subtract':
            result = num1 - num2;
            explanation = `طرح ${num2} من ${num1}:
            إذا كان لديك ${num1} قطعة حلوى، وأكلت ${num2} قطعة،
            سيبقى لديك ${result} قطع حلوى. 🍬`;
            break;
        case 'multiply':
            result = num1 * num2;
            explanation = `ضرب ${num1} في ${num2}:
            إذا كان لديك ${num1} صناديق، وفي كل صندوق ${num2} أقلام،
            فلديك ${result} قلماً في المجموع. ✏️`;
            break;
        case 'divide':
            if(num2 === 0) {
                result = "لا يمكن القسمة على صفر!";
                explanation = "لا يمكن تقسيم الأشياء إلى أجزاء صفرية!";
            } else {
                result = num1 / num2;
                explanation = `قسمة ${num1} على ${num2}:
                إذا قسمت ${num1} قطعة حلوى بين ${num2} أطفال،
                سيحصل كل طفل على ${result.toFixed(2)} قطعة. 🍫`;
            }
            break;
        default:
            result = "عملية غير صالحة";
            explanation = "الرجاء اختيار عملية صحيحة";
    }
    
    document.getElementById('result').innerHTML = `<strong>الناتج:</strong> ${result}`;
    document.getElementById('explanation').innerText = explanation;
}
