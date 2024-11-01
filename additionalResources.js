function addExtraInputFields(containerId) {
    const additionalInputs = document.getElementById(containerId);
    const inputFields = `
        <div class="input-group">
            <label>Уровень предмета 📙:</label>
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
            <label>Количество предметов 📙:</label>
            <input type="number" class="quantity-item" min="1">
        </div>`;
    additionalInputs.insertAdjacentHTML('beforeend', inputFields);
}

function removeExtraInputFields(containerId) {
    const additionalInputs = document.getElementById(containerId);
    if (additionalInputs.lastElementChild) {
        additionalInputs.removeChild(additionalInputs.lastElementChild);
        additionalInputs.removeChild(additionalInputs.lastElementChild);
    }
}

function calculateTotal(formulaNumber) {
    const quantities = document.querySelectorAll(`#formula-${formulaNumber} .quantity`);
    const levels = document.querySelectorAll(`#formula-${formulaNumber} .level`);
    const extraQuantities = document.querySelectorAll(`#formula-${formulaNumber} .quantity-item`);
    const extraLevels = document.querySelectorAll(`#formula-${formulaNumber} .level-item`);
    
    let totalValue = 0;
    const levelTotals = {};

    // Основные блоки
    for (let i = 0; i < quantities.length; i++) {
        const quantity = parseInt(quantities[i].value) || 0;
        const level = parseInt(levels[i].value) || 0;
        const price = priceTable2[level] || 0; // Используем priceTable2 для второй формулы
        const levelTotal = quantity * price;

        totalValue += levelTotal;
        if (level in levelTotals) {
            levelTotals[level] += levelTotal;
        } else {
            levelTotals[level] = levelTotal;
        }
    }

    // Дополнительные блоки
    for (let j = 0; j < extraQuantities.length; j++) {
        const extraQuantity = parseInt(extraQuantities[j].value) || 0;
        const extraLevel = parseInt(extraLevels[j].value) || 0;
        const price = priceTable2[extraLevel] || 0; // Используем priceTable2 для второй формулы
        const extraLevelTotal = (price / 3) * 4 * extraQuantity;

        totalValue += extraLevelTotal;
        if (extraLevel in levelTotals) {
            levelTotals[extraLevel] += extraLevelTotal;
        } else {
            levelTotals[extraLevel] = extraLevelTotal;
        }
    }

    const multiplier = parseFloat(document.getElementById(`guild-multiplier-${formulaNumber}`).value) || 1;
    const adjustedTotal = totalValue * multiplier;

    const resultElement = document.getElementById(`result-${formulaNumber}`);
    resultElement.innerHTML = `<strong>Результат:</strong> ${formatCurrency(adjustedTotal)} (${adjustedTotal.toFixed(2)})`;
    
    Object.keys(levelTotals).forEach(level => {
        resultElement.innerHTML += `<div class="result-small">вещи ${level} уровня: ${formatCurrency(levelTotals[level])} (${levelTotals[level].toFixed(2)})</div>`;
    });
}
