// Функция для добавления новых элементов
function addNewItem(formulaNumber) {
    const additionalInputs = document.getElementById(`additional-inputs-${formulaNumber}`);

    // Новый HTML код для добавления уровня и количества предметов 📙
    const inputFields = `
        <div class="input-group">
            <label>Уровень 📙:</label>
            <select class="level-item">
                <option value="70">70</option>
                <option value="5">1 - 5</option>
                <option value="10">6 - 10</option>
                <option value="15">11 - 15</option>
                <option value="20">16 - 20</option>
                <option value="25">21 - 25</option>
                <option value="30">26 - 30</option>
                <option value="35">31 - 35</option>
                <option value="40">36 - 40</option>
                <option value="45">41 - 45</option>
                <option value="50">46 - 50</option>
                <option value="55">51 - 55</option>
                <option value="60">56 - 60</option>
                <option value="65">61 - 65</option>
                <option value="66">66 - 69</option>
            </select>
        </div>
        <div class="input-group">
            <label>Количество 📙:</label>
            <input type="number" class="quantity-item" min="1">
        </div>`;

    // Вставляем новый блок
    additionalInputs.insertAdjacentHTML('beforeend', inputFields);

    // После добавления новых полей пересчитываем результаты
    calculateTotal(formulaNumber);
}

// Функция для добавления полей "Количество 🧪"
function addPotionInputFields(containerId) {
    const container = document.getElementById(containerId);

    // Новый HTML код для добавления поля "Количество 🧪"
    const inputField = `
        <div class="input-group">
            <label>Количество 🧪:</label>
            <input type="number" class="potion-quantity" min="1">
        </div>`;

    // Добавление нового блока
    container.insertAdjacentHTML('beforeend', inputField);
}

// Модифицированная функция удаления полей
function removeInputFields(containerId) {
    const container = document.getElementById(containerId);
    if (container.lastElementChild) {
        container.lastElementChild.remove();
    }
}

// Функция для перерасчёта итогов для добавленных элементов
function calculateAdditionalTotal(formulaNumber) {
    const itemQuantities = document.querySelectorAll(`#formula-${formulaNumber} .quantity-item`);
    const itemLevels = document.querySelectorAll(`#formula-${formulaNumber} .level-item`);

    console.log("Количество элементов:", itemQuantities.length, itemLevels.length);

    let totalValue = 0;
    const levelTotals = {};

    for (let i = 0; i < itemQuantities.length; i++) {
        const quantity = parseInt(itemQuantities[i].value) || 0;
        const level = parseInt(itemLevels[i].value) || 0;

        console.log(`Обработка элемента ${i + 1}: Количество = ${quantity}, Уровень = ${level}`);

        // Применяем priceTable1 или priceTable2 в зависимости от формулы
        const adjustedLevel = formulaNumber === 1 ? (priceTable1[level] || 0) : (priceTable2[level] || 0);

        // Применяем формулу: (уровень / 3) * 4 * количество
        const pricePerItem = (adjustedLevel / 3) * 4;
        const levelTotal = pricePerItem * quantity;

        totalValue += levelTotal;
        if (level in levelTotals) {
            levelTotals[level] += levelTotal;
        } else {
            levelTotals[level] = levelTotal;
        }
    }

    return { totalValue, levelTotals };
}

function calculateTotal(formulaNumber) {
    const quantities = document.querySelectorAll(`#formula-${formulaNumber} .quantity`);
    const levels = document.querySelectorAll(`#formula-${formulaNumber} .level`);

    // Получаем множители
    const multiplier = parseFloat(document.getElementById(`guild-multiplier-${formulaNumber}`).value) || 1;
    const portalmultiplier = parseFloat(document.getElementById(`portal-multiplier-${formulaNumber}`).value) || 1.0;
    const difficultymultiplier = parseFloat(document.getElementById(`difficulty-multiplier-${formulaNumber}`).value) || 1.5;

    let totalValue = 0;
    const levelTotals = {};

    // Обработка полей 💍
    for (let i = 0; i < quantities.length; i++) {
        const quantity = parseInt(quantities[i].value) || 0;
        const level = parseInt(levels[i].value) || 0;

        const price = formulaNumber === 1 ? priceTable1[level] || 0 : priceTable2[level] || 0;
        const levelTotal = quantity * price;

        if (quantity > 0) {
            totalValue += levelTotal;
            if (level in levelTotals) {
                levelTotals[level] += levelTotal;
            } else {
                levelTotals[level] = levelTotal;
            }
        }
    }

    // Обработка "+📙" блоков
    const itemQuantities = document.querySelectorAll(`#formula-${formulaNumber} .quantity-item`);
    const itemLevels = document.querySelectorAll(`#formula-${formulaNumber} .level-item`);
    const levelTotalsExtra = {};

    for (let i = 0; i < itemQuantities.length; i++) {
        const quantity = parseInt(itemQuantities[i].value) || 0;
        const level = parseInt(itemLevels[i].value) || 0;

        if (quantity > 0) {
            const adjustedLevel = formulaNumber === 1 ? (priceTable1[level] || 0) : (priceTable2[level] || 0);
            const pricePerItem = (adjustedLevel / 3) * 4;
            const levelTotal = pricePerItem * quantity;

            if (level in levelTotalsExtra) {
                levelTotalsExtra[level] += levelTotal;
            } else {
                levelTotalsExtra[level] = levelTotal;
            }
        }
    }

    // Обработка "+🧪" блоков
    const potionQuantities = document.querySelectorAll(`#formula-${formulaNumber} .potion-quantity`);
    let potionTotal = 0;

    potionQuantities.forEach(potionQuantity => {
        const quantity = parseInt(potionQuantity.value) || 0;
        potionTotal += 500 * quantity;
    });

    // Итоговый расчёт с учётом всех множителей
    let adjustedTotal = totalValue * multiplier * portalmultiplier * difficultymultiplier;

    Object.keys(levelTotalsExtra).forEach(level => {
        adjustedTotal += levelTotalsExtra[level] * multiplier * portalmultiplier * difficultymultiplier;
    });

    adjustedTotal += potionTotal * multiplier * portalmultiplier * difficultymultiplier;

    // Отображение результата
    const resultElement = document.getElementById(`result-${formulaNumber}`);
    resultElement.innerHTML = `<strong>Результат:</strong> ${formatCurrency(adjustedTotal)} (${adjustedTotal.toFixed(2)})`;

    // Отображаем результаты для обычных вещей 💍
    Object.keys(levelTotals).forEach(level => {
        if (levelTotals[level] > 0) {
            resultElement.innerHTML += `<div class="result-small">📘📒 ${level} уровня: ${formatCurrency(levelTotals[level])} (${levelTotals[level].toFixed(2)})</div>`;
        }
    });

    // Отображаем результаты для "+📙" блоков
    Object.keys(levelTotalsExtra).forEach(level => {
        if (levelTotalsExtra[level] > 0) {
            resultElement.innerHTML += `<div class="result-small">📙 ${level} уровня: ${formatCurrency(levelTotalsExtra[level])} (${levelTotalsExtra[level].toFixed(2)})</div>`;
        }
    });

    // Отображаем результаты для "+🧪" блоков
    if (potionTotal > 0) {
        resultElement.innerHTML += `<div class="result-small">Стоимость 🧪: ${formatCurrency(potionTotal)} (${(potionTotal).toFixed(2)})</div>`;
    }
}
