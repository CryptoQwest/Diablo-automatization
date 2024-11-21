// Функция для добавления новых элементов
function addNewItem(formulaNumber) {
    const additionalInputs = document.getElementById(`additional-inputs-${formulaNumber}`);

    // Новый HTML код для добавления уровня и количества предметов 📙
    const inputFields = `
        <div class="input-group">
            <label>Уровень 📙:</label>
            <select class="level-item">
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
                <option value="70">70</option>
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

// Основная функция для перерасчёта итогов
function calculateTotal(formulaNumber) {
    const quantities = document.querySelectorAll(`#formula-${formulaNumber} .quantity`);
    const levels = document.querySelectorAll(`#formula-${formulaNumber} .level`);

    let totalValue = 0;
    const levelTotals = {};

    // Обработка полей, которые уже есть в DOM
    for (let i = 0; i < quantities.length; i++) {
        const quantity = parseInt(quantities[i].value) || 0;
        const level = parseInt(levels[i].value) || 0;

        // Используем priceTable1 для первой формулы и priceTable2 для второй
        const price = formulaNumber === 1 ? priceTable1[level] || 0 : priceTable2[level] || 0;
        const levelTotal = quantity * price;

        if (quantity > 0) { // Только если количество больше 0, добавляем
            totalValue += levelTotal;
            if (level in levelTotals) {
                levelTotals[level] += levelTotal;
            } else {
                levelTotals[level] = levelTotal;
            }
        }
    }

    // Получаем элементы для "+📙" блоков
    const itemQuantities = document.querySelectorAll(`#formula-${formulaNumber} .quantity-item`);
    const itemLevels = document.querySelectorAll(`#formula-${formulaNumber} .level-item`);

    // Объект для хранения результатов "+📙"
    const levelTotalsExtra = {};

    // Обработка элементов для "+📙" блоков
    for (let i = 0; i < itemQuantities.length; i++) {
        const quantity = parseInt(itemQuantities[i].value) || 0;
        const level = parseInt(itemLevels[i].value) || 0;

        if (quantity > 0) { // Только если количество больше 0, добавляем
            // Добавление к уровням с "+📙"
            const adjustedLevel = formulaNumber === 1 ? (priceTable1[level] || 0) : (priceTable2[level] || 0); // Используем правильную таблицу
            const pricePerItem = (adjustedLevel / 3) * 4;
            const levelTotal = pricePerItem * quantity;

            if (level in levelTotalsExtra) {
                levelTotalsExtra[level] += levelTotal;
            } else {
                levelTotalsExtra[level] = levelTotal;
            }
        }
    }

    // Множитель гильдии и портала
    const multiplier = parseFloat(document.getElementById(`guild-multiplier-${formulaNumber}`).value) || 1;
    const portalmultiplier = parseFloat(document.getElementById(`portal-multiplier-${formulaNumber}`).value) || 1.0;

    // Расчёт итоговой суммы с учётом множителей для обычных вещей и "+📙"
    let adjustedTotal = totalValue * multiplier * portalmultiplier;
    Object.keys(levelTotalsExtra).forEach(level => {
        adjustedTotal += levelTotalsExtra[level] * multiplier * portalmultiplier; // Учитываем множители для "+📙"
    });

    // Отображаем итоговый результат
    const resultElement = document.getElementById(`result-${formulaNumber}`);
    resultElement.innerHTML = `<strong>Результат:</strong> ${formatCurrency(adjustedTotal)} (${adjustedTotal.toFixed(2)})`;

    // Выводим результаты для обычных вещей (💍)
    Object.keys(levelTotals).forEach(level => {
        if (levelTotals[level] > 0) {
            resultElement.innerHTML += `<div class="result-small">📘📒 ${level} уровня: ${formatCurrency(levelTotals[level])} (${levelTotals[level].toFixed(2)})</div>`;
        }
    });

    // Выводим результаты для "+📙" блоков
    Object.keys(levelTotalsExtra).forEach(level => {
        if (levelTotalsExtra[level] > 0) {
            resultElement.innerHTML += `<div class="result-small">📙 ${level} уровня: ${formatCurrency(levelTotalsExtra[level])} (${levelTotalsExtra[level].toFixed(2)})</div>`;
        }
    });
}
