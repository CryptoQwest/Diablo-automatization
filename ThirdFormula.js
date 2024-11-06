// Пример обработки данных для расчётов
function executeCalculation() {
    // Получаем значения с поля ввода
    let bookInput = parseFloat(cleanFormattedNumber(document.getElementById('bookInput').value));
    let hourglassInput = parseFloat(cleanFormattedNumber(document.getElementById('hourglassInput').value));
    let lastKilled1Input = parseInt(cleanFormattedNumber(document.getElementById('lastKilled1Input').value));
    let lastKilled2Input = parseInt(cleanFormattedNumber(document.getElementById('lastKilled2Input').value));
    let incomingKilled1Input = parseInt(cleanFormattedNumber(document.getElementById('incomingKilled1Input').value));
    let incomingKilled2Input = parseInt(cleanFormattedNumber(document.getElementById('incomingKilled2Input').value));
    let totalKilled1Input = parseInt(cleanFormattedNumber(document.getElementById('totalKilled1Input').value));
    let totalKilled2Input = parseInt(cleanFormattedNumber(document.getElementById('totalKilled2Input').value));
    let lastInput1 = parseInt(cleanFormattedNumber(document.getElementById('lastInput1').value));
    let lastInput2 = parseInt(cleanFormattedNumber(document.getElementById('lastInput2').value));
    let newInput1 = parseInt(cleanFormattedNumber(document.getElementById('death1Input').value));
    let newInput2 = parseInt(cleanFormattedNumber(document.getElementById('death2Input').value));

    // Получаем множители
    let guildMultiplier = parseFloat(document.getElementById('guild-multiplier-3').value);
    let portalMultiplier = parseFloat(document.getElementById('portal-multiplier-3').value);

    // Расчёт по формуле
    let result = ((newInput1 - lastInput1) / 100 + (newInput2 - lastInput2) / 10) * guildMultiplier * portalMultiplier;
    result = result.toFixed(2); // округляем до двух знаков после запятой

    // Обновляем значения для 📖 и ⏳
    bookInput += parseFloat(result);
    hourglassInput += parseFloat(result);

    // Расчёт для новых значений:
    // Посл. убитые
    let lastKilled1 = newInput1 - lastInput1;
    let lastKilled2 = newInput2 - lastInput2;

    // Общие убитые
    let totalKilled1 = newInput1 - incomingKilled1Input;
    let totalKilled2 = newInput2 - incomingKilled2Input;

    // Сохраняем новые вводные значения
    lastInput1 = newInput1;
    lastInput2 = newInput2;

    // Обновляем отображение данных в UI
    document.getElementById('bookInput').value = bookInput.toFixed(2);
    document.getElementById('hourglassInput').value = hourglassInput.toFixed(2);
    document.getElementById('lastKilled1Input').value = lastKilled1;
    document.getElementById('lastKilled2Input').value = lastKilled2;
    document.getElementById('totalKilled1Input').value = totalKilled1;
    document.getElementById('totalKilled2Input').value = totalKilled2;
    document.getElementById('lastInput1').value = lastInput1;
    document.getElementById('lastInput2').value = lastInput2;
}


// Функция для сохранения данных
function saveData() {
    const username = document.getElementById('username').value;
    if (username) {
        const data = {
            death1: cleanFormattedNumber(document.getElementById('death1Input').value),
            death2: cleanFormattedNumber(document.getElementById('death2Input').value),
            last1: cleanFormattedNumber(document.getElementById('lastInput1').value),
            last2: cleanFormattedNumber(document.getElementById('lastInput2').value),
            book: cleanFormattedNumber(document.getElementById('bookInput').value),
            hourglass: cleanFormattedNumber(document.getElementById('hourglassInput').value),
            incoming1: cleanFormattedNumber(document.getElementById('incomingKilled1Input').value),
            incoming2: cleanFormattedNumber(document.getElementById('incomingKilled2Input').value),
            total1: cleanFormattedNumber(document.getElementById('totalKilled1Input').value),
            total2: cleanFormattedNumber(document.getElementById('totalKilled2Input').value),
            new1: cleanFormattedNumber(document.getElementById('newInputs1').value),
            new2: cleanFormattedNumber(document.getElementById('newInputs2').value),
            lastKilled1: cleanFormattedNumber(document.getElementById('lastKilled1Input').value),
            lastKilled2: cleanFormattedNumber(document.getElementById('lastKilled2Input').value)
        };
        localStorage.setItem(`userData_${username}`, JSON.stringify(data));
        alert("Данные успешно сохранены!");
    } else {
        alert('Введите имя пользователя для сохранения данных.');
    }
}

// Функция для восстановления данных
function restoreData() {
    const username = document.getElementById('username').value;
    if (username) {
        const savedData = localStorage.getItem(`userData_${username}`);
        if (savedData) {
            const data = JSON.parse(savedData);
            document.getElementById('death1Input').value = formatNumber(data.death1 || 0);
            document.getElementById('death2Input').value = formatNumber(data.death2 || 0);
            document.getElementById('lastInput1').value = formatNumber(data.last1 || 0);
            document.getElementById('lastInput2').value = formatNumber(data.last2 || 0);
            document.getElementById('bookInput').value = formatNumber(data.book || 0);
            document.getElementById('hourglassInput').value = formatNumber(data.hourglass || 0);
            document.getElementById('incomingKilled1Input').value = formatNumber(data.incoming1 || 0);
            document.getElementById('incomingKilled2Input').value = formatNumber(data.incoming2 || 0);
            document.getElementById('totalKilled1Input').value = formatNumber(data.total1 || 0);
            document.getElementById('totalKilled2Input').value = formatNumber(data.total2 || 0);
            document.getElementById('newInputs1').value = formatNumber(data.new1 || 0);
            document.getElementById('newInputs2').value = formatNumber(data.new2 || 0);
            document.getElementById('lastKilled1Input').value = formatNumber(data.lastKilled1 || 0);
            document.getElementById('lastKilled2Input').value = formatNumber(data.lastKilled2 || 0);
            alert('Данные успешно восстановлены.');
        } else {
            alert('Нет сохраненных данных для данного пользователя.');
        }
    } else {
        alert('Введите имя пользователя для восстановления данных.');
    }
}

// Функция для редактирования данных
function editData() {
    // Разблокировать все поля ввода, кроме 💀: и ☠️:
    document.querySelectorAll('.input-field').forEach(input => {
        if (!input.id.includes('death1Input') && !input.id.includes('death2Input')) {
            input.removeAttribute('disabled');
        }
    });

    document.getElementById('saveEditButton').style.display = 'inline-block'; // Показать кнопку "Сохранить"
    document.getElementById('editButton').style.display = 'inline-block'; // Показать кнопку "Редактировать"
}

// Функция для сохранения редактирования
function saveEdit() {
    // Заблокировать все поля ввода, кроме 💀: и ☠️:
    document.querySelectorAll('.input-field').forEach(input => {
        if (!input.id.includes('death1Input') && !input.id.includes('death2Input')) {
            input.setAttribute('disabled', 'disabled');
        }
    });

    document.getElementById('saveEditButton').style.display = 'none'; // Скрыть кнопку "Сохранить"
    document.getElementById('editButton').style.display = 'inline-block'; // Показать кнопку "Редактировать"
}

function cleanFormattedNumber(inputValue) {
    return inputValue.replace(/\s+/g, ''); // Удаляем пробелы
}

function cleanFormattedNumber(inputValue) {
    return inputValue.replace(/\s+/g, ''); // Удаляем пробелы
}
