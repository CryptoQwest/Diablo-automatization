// Функция для выполнения обсчёта
function executeCalculation() {
    // Получаем данные новых убитых
    const newKilled1 = parseInt(document.getElementById('death1Input').value) || 0;
    const newKilled2 = parseInt(document.getElementById('death2Input').value) || 0;

    // Получаем данные последних убитых
    const lastKilled1 = parseInt(document.getElementById('lastInput1').value) || 0;
    const lastKilled2 = parseInt(document.getElementById('lastInput2').value) || 0;

    // Множители
    const guildMultiplier = parseFloat(document.getElementById('guild-multiplier-3').value) || 1.0;
    const portalMultiplier = parseFloat(document.getElementById('portal-multiplier-3').value) || 1.0;

    // Рассчитываем количество рун
    const runCount = ((newKilled1 - lastKilled1) / 100 + (newKilled2 - lastKilled2) / 10) * guildMultiplier * portalMultiplier;

    // Вводные данные для книги и песочных часов
    const bookInput = parseFloat(document.getElementById('bookInput').value) || 0;
    const hourglassInput = parseFloat(document.getElementById('hourglassInput').value) || 0;

    // Обновляем поля для книги и песочных часов
    document.getElementById('bookInput').value = (bookInput + runCount).toFixed(2);
    document.getElementById('hourglassInput').value = (hourglassInput + runCount).toFixed(2);

    // Обновляем данные для "входящих убитых"
    const incomingKilled1 = parseInt(document.getElementById('incomingKilled1Input').value) || 0;
    const incomingKilled2 = parseInt(document.getElementById('incomingKilled2Input').value) || 0;

    // Рассчитываем и обновляем количество убитых
    const totalKilled1 = newKilled1 - incomingKilled1;
    const totalKilled2 = newKilled2 - incomingKilled2;

    document.getElementById('totalKilled1Input').value = totalKilled1;
    document.getElementById('totalKilled2Input').value = totalKilled2;

    // Теперь обновляем последние убитые, чтобы они отображали последние данные
    document.getElementById('lastKilled1Input').value = newKilled1; // Обновляем последние убитые для первого
    document.getElementById('lastKilled2Input').value = newKilled2; // Обновляем последние убитые для второго

    // Обновляем новые введенные данные
    document.getElementById('newInputs1').value = newKilled1;
    document.getElementById('newInputs2').value = newKilled2;

    // Для корректного подсчета разницы в "последних убитых" необходимо, чтобы старые значения оставались неизменными
    const diffKilled1 = newKilled1 - lastKilled1; // Разница для 💀
    const diffKilled2 = newKilled2 - lastKilled2; // Разница для ☠️

    // Применяем изменения для отображения разницы
    document.getElementById('lastKilled1Input').value = diffKilled1; // Отображаем разницу для 💀
    document.getElementById('lastKilled2Input').value = diffKilled2; // Отображаем разницу для ☠️
}

// Функция для сохранения данных
function saveData() {
    const username = document.getElementById('username').value;
    if (username) {
        const data = {
            death1: document.getElementById('death1Input').value,
            death2: document.getElementById('death2Input').value,
            last1: document.getElementById('lastInput1').value,
            last2: document.getElementById('lastInput2').value,
            book: document.getElementById('bookInput').value,
            hourglass: document.getElementById('hourglassInput').value,
            incoming1: document.getElementById('incomingKilled1Input').value,
            incoming2: document.getElementById('incomingKilled2Input').value,
            total1: document.getElementById('totalKilled1Input').value,
            total2: document.getElementById('totalKilled2Input').value,
            new1: document.getElementById('newInputs1').value,
            new2: document.getElementById('newInputs2').value,
            lastKilled1: document.getElementById('lastKilled1Input').value,
            lastKilled2: document.getElementById('lastKilled2Input').value
        };
        localStorage.setItem(`userData_${username}`, JSON.stringify(data));
        alert('Данные успешно сохранены.');
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
            document.getElementById('death1Input').value = data.death1 || 0;
            document.getElementById('death2Input').value = data.death2 || 0;
            document.getElementById('lastInput1').value = data.last1 || 0;
            document.getElementById('lastInput2').value = data.last2 || 0;
            document.getElementById('bookInput').value = data.book || 0;
            document.getElementById('hourglassInput').value = data.hourglass || 0;
            document.getElementById('incomingKilled1Input').value = data.incoming1 || 0;
            document.getElementById('incomingKilled2Input').value = data.incoming2 || 0;
            document.getElementById('totalKilled1Input').value = data.total1 || 0;
            document.getElementById('totalKilled2Input').value = data.total2 || 0;
            document.getElementById('newInputs1').value = data.new1 || 0;
            document.getElementById('newInputs2').value = data.new2 || 0;
            document.getElementById('lastKilled1Input').value = data.lastKilled1 || 0;
            document.getElementById('lastKilled2Input').value = data.lastKilled2 || 0;
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
