function executeCalculation() {
    let bookInput = parseFloat(cleanFormattedNumber(document.getElementById('bookInput').value)) || 0;
    let hourglassInput = parseFloat(cleanFormattedNumber(document.getElementById('hourglassInput').value)) || 0;
    let lastKilled1Input = parseInt(cleanFormattedNumber(document.getElementById('lastKilled1Input').value)) || 0;
    let lastKilled2Input = parseInt(cleanFormattedNumber(document.getElementById('lastKilled2Input').value)) || 0;
    let incomingKilled1Input = parseInt(cleanFormattedNumber(document.getElementById('incomingKilled1Input').value)) || 0;
    let incomingKilled2Input = parseInt(cleanFormattedNumber(document.getElementById('incomingKilled2Input').value)) || 0;
    let totalKilled1Input = parseInt(cleanFormattedNumber(document.getElementById('totalKilled1Input').value)) || 0;
    let totalKilled2Input = parseInt(cleanFormattedNumber(document.getElementById('totalKilled2Input').value)) || 0;
    let lastInput1 = parseInt(cleanFormattedNumber(document.getElementById('lastInput1').value)) || 0;
    let lastInput2 = parseInt(cleanFormattedNumber(document.getElementById('lastInput2').value)) || 0;
    let newInput1 = parseInt(cleanFormattedNumber(document.getElementById('death1Input').value)) || 0;
    let newInput2 = parseInt(cleanFormattedNumber(document.getElementById('death2Input').value)) || 0;

    let guildMultiplier = parseFloat(document.getElementById('guild-multiplier-3').value) || 1;
    let portalMultiplier = parseFloat(document.getElementById('portal-multiplier-3').value) || 1;
    let timePortalMultiplier = parseFloat(document.getElementById('time-portal-multiplier-3').value) || 1;

    let result = ((newInput1 - lastInput1) / 100 + (newInput2 - lastInput2) / 10) * guildMultiplier * portalMultiplier * timePortalMultiplier;
    result = parseFloat(result.toFixed(2));

    bookInput += result;
    hourglassInput += result;

    let lastKilled1 = newInput1 - lastInput1;
    let lastKilled2 = newInput2 - lastInput2;
    let totalKilled1 = newInput1 - incomingKilled1Input;
    let totalKilled2 = newInput2 - incomingKilled2Input;

    lastInput1 = newInput1;
    lastInput2 = newInput2;

    document.getElementById('bookInput').value = bookInput.toFixed(2);
    document.getElementById('hourglassInput').value = hourglassInput.toFixed(2);
    document.getElementById('lastKilled1Input').value = lastKilled1;
    document.getElementById('lastKilled2Input').value = lastKilled2;
    document.getElementById('totalKilled1Input').value = totalKilled1;
    document.getElementById('totalKilled2Input').value = totalKilled2;
    document.getElementById('lastInput1').value = lastInput1;
    document.getElementById('lastInput2').value = lastInput2;
}

function cleanFormattedNumber(inputValue) {
    return inputValue ? inputValue.replace(/\s+/g, '') : '';
}

function saveData() {
    const username = document.getElementById('username').value.trim();
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
            lastKilled1: cleanFormattedNumber(document.getElementById('lastKilled1Input').value),
            lastKilled2: cleanFormattedNumber(document.getElementById('lastKilled2Input').value)
        };
        localStorage.setItem(`userData_${username}`, JSON.stringify(data));
        alert("Данные успешно сохранены!");
    } else {
        alert('Введите имя пользователя для сохранения данных.');
    }
}

function restoreData() {
    const username = document.getElementById('username').value.trim();
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

function editData() {
    document.querySelectorAll('.input-field').forEach(input => {
        if (!input.id.includes('death1Input') && !input.id.includes('death2Input')) {
            input.removeAttribute('disabled');
        }
    });
    document.getElementById('saveEditButton').style.display = 'inline-block';
    document.getElementById('editButton').style.display = 'none';
}

function saveEdit() {
    document.querySelectorAll('.input-field').forEach(input => {
        if (!input.id.includes('death1Input') && !input.id.includes('death2Input')) {
            input.setAttribute('disabled', 'disabled');
        }
    });
    document.getElementById('saveEditButton').style.display = 'none';
    document.getElementById('editButton').style.display = 'inline-block';
}

function cleanFormattedNumber(inputValue) {
    return inputValue ? inputValue.replace(/\s+/g, '') : '';
}
