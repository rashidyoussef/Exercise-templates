window.addEventListener('load', function() {
    initializeTable();
    updateCustomButtonsTable(); // Llama a updateCustomButtonsTable() después de inicializar la tabla
    createDefaultButtons(); // Crea los botones predeterminados si no hay datos en caché
});

// Función para crear los botones predeterminados si no hay datos en caché
function createDefaultButtons() {
    var customButtons = loadCustomButtons();
    if (customButtons.length === 0) {
        createPushDayButton();
        createPullDayButton();
        createLegDayButton();
    }
}

// Función para crear el botón de Push Day
function createPushDayButton() {
    var cardsData = [
        { name: 'Push Ups (15 reps)', sets: 8 },
        { name: 'Triceps', sets: 4 },
        { name: 'Handstand hold', sets: 3 }
    ];
    createCustomButton('Entrenamiento de empuje', cardsData);
}

// Función para crear el botón de Pull Day
function createPullDayButton() {
    var cardsData = [
        { name: 'Pull ups', sets: 8 },
        { name: 'Chin ups', sets: 3 },
        { name: 'Abs', sets: 3 }
    ];
    createCustomButton('Entrenamiento de jale (?) acaray', cardsData);
}

// Función para crear el botón de Leg Day
function createLegDayButton() {
    var cardsData = [
        { name: 'Squats (25 reps)', sets: 4 },
        { name: 'Sumo Squat (25 reps)', sets: 4 },
        { name: 'Chocolate', sets: 1 }
    ];
    createCustomButton('Día de pierna', cardsData);
}

// Función para crear un botón personalizado con datos específicos
function createCustomButton(buttonName, cardsData) {
    var customButtons = loadCustomButtons();
    customButtons.push({ name: buttonName, cardsData: cardsData });
    saveCustomButtons(customButtons);
    updateCustomButtonsTable(); // Actualiza la tabla de botones personalizados
}


// Botón para mostrar el diálogo
var addExerciseButton = document.getElementById('addExerciseButton');
addExerciseButton.addEventListener('click', function() {
    var dialog = document.getElementById('exerciseDialog');
    dialog.style.display = 'block';
});

// Eliminar la tarjeta inicial de "Front Raises"
var frontRaisesCard = document.getElementById('frontRaises');
if (frontRaisesCard) {
    frontRaisesCard.parentNode.removeChild(frontRaisesCard);
}

// Botón para cerrar el diálogo
var closeButton = document.getElementsByClassName('close')[0];
closeButton.addEventListener('click', function() {
    var dialog = document.getElementById('exerciseDialog');
    dialog.style.display = 'none';
});

// Manejo del envío del formulario
var exerciseForm = document.getElementById('exerciseForm');
exerciseForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado de enviar el formulario
    
    var exerciseName = document.getElementById('exerciseName').value;
    var exerciseSets = document.getElementById('exerciseSets').value;

    // Crear una nueva tarjeta de ejercicio con los datos proporcionados
    createExerciseCard(exerciseName, exerciseSets);

    // Cerrar el diálogo después de agregar el ejercicio
    var dialog = document.getElementById('exerciseDialog');
    dialog.style.display = 'none';
});

// Función para crear una nueva tarjeta de ejercicio
function createExerciseCard(name, sets) {
    // Clonar la plantilla de la tarjeta de ejercicio
    var template = document.getElementById('card-template');
    var cardClone = template.content.cloneNode(true);

    // Modificar el contenido clonado con los datos del ejercicio
    var card = cardClone.querySelector('.card');
    card.querySelector('h2').textContent = name;
    var range = card.querySelector('.exercise-range');
    range.setAttribute('max', sets);
    range.dataset.totalSets = sets; // Establecer el número total de sets como atributo de datos
    card.querySelector('.range-value').textContent = 'Set 0 de ' + sets;
    card.querySelector('.progress-value').setAttribute('data-progress', '0%'); // Inicializar el porcentaje en 0%
    card.querySelector('.range-percentage').textContent = '0%'; // Inicializar el porcentaje en 0%

    // Insertar la tarjeta de ejercicio en el contenedor
    var cardContainer = document.querySelector('.card-container');
    cardContainer.appendChild(cardClone);

    // Asignar nuevamente event listeners para el botón de incrementar
    var increaseButton = card.querySelector('.increase-button');
    increaseButton.addEventListener('click', function() {
        var currentValue = parseInt(range.value);
        var totalSets = parseInt(range.dataset.totalSets);
        var newValue = currentValue + 1; // Incrementa el valor por 1 (puedes ajustar este valor)

        // Asegúrate de que el nuevo valor no exceda el máximo
        if (newValue <= totalSets) {
            range.value = newValue;
            updateRangeBackground(range);
            updateLabelText(newValue, totalSets, card);
            updateProgressValue(newValue, totalSets, card); // Actualizar el porcentaje
        }
    });

    // Asignar event listener para el botón de reset dentro de la tarjeta
    var resetButton = card.querySelector('.reset-button');
    resetButton.addEventListener('click', function() {
        range.value = 0;
        updateRangeBackground(range);
        updateLabelText(0, parseInt(sets), card);
        updateProgressValue(0, parseInt(sets), card);
    });
     // Asignar event listener para el botón de eliminar dentro de la tarjeta
     var deleteButton = card.querySelector('.delete-button');
     deleteButton.addEventListener('click', function() {
         deleteCard(card); // Llamar a la función de eliminación de tarjeta
     });
}

// Función para actualizar el porcentaje dentro de la barra
function updateProgressValue(value, totalSets, card) {
    var percentage = (value / totalSets) * 100;
    card.querySelector('.progress-value').setAttribute('data-progress', percentage.toFixed(0) + '%');
    card.querySelector('.range-percentage').textContent = percentage.toFixed(0) + '%';
}

// Función para actualizar el texto de la tarjeta de ejercicio
function updateLabelText(value, totalSets, card) {
    var labelText = "Set " + value + " de " + totalSets;
    card.querySelector('.range-value').textContent = labelText;
}

// Función para actualizar el fondo de la barra de rango
function updateRangeBackground(range) {
    var value = parseInt(range.value);
    var max = parseInt(range.max);
    var percentage = (value / max) * 100;
    range.style.background = 'linear-gradient(to right, blue 0%, blue ' + percentage + '%, gray ' + percentage + '%, gray 100%)';
}

// Botón para restablecer todas las tarjetas y eliminarlas del contenedor
var resetAllButton = document.getElementById('resetAllButton');
resetAllButton.addEventListener('click', function() {
    // Obtener el contenedor de tarjetas
    var cardContainer = document.getElementById('cardContainer');
    
    // Eliminar todas las tarjetas del contenedor
    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
    }
});

// Botón para restablecer todas las tarjetas y reiniciar el progreso
var resetAllButton = document.getElementById('resetAllButton');
resetAllButton.addEventListener('click', function() {
    // Obtener todas las tarjetas
    var cards = document.querySelectorAll('.card');
    
    // Iterar sobre cada tarjeta y restablecer el progreso
    cards.forEach(function(card) {
        var range = card.querySelector('.exercise-range');
        range.value = 0;
        updateRangeBackground(range);
        updateLabelText(0, parseInt(range.dataset.totalSets), card);
        updateProgressValue(0, parseInt(range.dataset.totalSets), card);
    });
});

// Función para eliminar la tarjeta
function deleteCard(card) {
    card.remove(); // Eliminar la tarjeta del DOM
}

// Event listener para el botón de eliminación dentro de cada tarjeta
var deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        var card = button.parentElement;
        deleteCard(card); // Llamar a la función de eliminación de tarjeta
    });
});

// Función para guardar los botones personalizados en el almacenamiento local
function saveCustomButtons(customButtons) {
    // Si customButtons no es un array, conviértelo en un array
    if (!Array.isArray(customButtons)) {
        customButtons = [customButtons];
    }
    localStorage.setItem('customButtons', JSON.stringify(customButtons));
}

// Función para cargar los botones personalizados
function loadCustomButtons() {
    var customButtons = localStorage.getItem('customButtons');
    // Si no hay datos o no es un array válido, devuelve un array vacío
    return customButtons ? JSON.parse(customButtons) : [];
}


// Obtener el botón "Guardar"
var saveButton = document.getElementById('saveButton');

// Event listener para el botón "Guardar"
saveButton.addEventListener('click', function() {
    // Obtener los datos de las tarjetas actuales
    var cardsData = [];
    var cards = document.querySelectorAll('.card');
    cards.forEach(function(card) {
        var cardData = {
            name: card.querySelector('h2').textContent,
            sets: card.querySelector('.exercise-range').getAttribute('max')
        };
        cardsData.push(cardData);
    });

    // Pedir al usuario que ingrese el nombre del botón personalizado
    var buttonName = prompt('Ingrese el nombre del ejercicio personalizado:');
    if (buttonName) {
        var customButtons = loadCustomButtons();
        customButtons.push({ name: buttonName, cardsData: cardsData });
        saveCustomButtons(customButtons);

        // Actualizar la tabla de botones personalizados
        updateCustomButtonsTable();
    }
})
// Función para inicializar la tabla con los encabezados
function initializeTable() {
    var customTemplatesContainer = document.getElementById('customTemplatesContainer');
    
    // Crear fila de encabezados
    var headerRow = document.createElement('tr');

    // Crear celda de encabezado para el nombre del botón
    var nameHeader = document.createElement('th');
    nameHeader.textContent = 'Nombre del ejercicio';

    // Crear celda de encabezado para el botón de eliminación
    var deleteHeader = document.createElement('th');
    deleteHeader.textContent = 'Eliminar';

    // Agregar celdas de encabezado a la fila de encabezados
    headerRow.appendChild(nameHeader);
    headerRow.appendChild(deleteHeader);

    // Agregar fila de encabezados a la tabla
    customTemplatesContainer.appendChild(headerRow);
    createDefaultExerciseCards();
}


// Función para cargar y actualizar los botones personalizados en la tabla
function updateCustomButtonsTable() {
    var customButtons = loadCustomButtons();
    var customTemplatesContainer = document.getElementById('customTemplatesContainer');

    // Eliminar solo las filas de datos existentes (no los encabezados)
    customTemplatesContainer.querySelectorAll('tr[data-custom-button]').forEach(function(row) {
        row.remove();
    });

    // Agregar filas para cada botón personalizado
    customButtons.forEach(function(buttonData, index) {
        var row = document.createElement('tr');
        row.dataset.customButton = true;

        var nameCell = document.createElement('td');
        var button = document.createElement('button');
        button.textContent = buttonData.name;
        button.addEventListener('click', function() {
            createCardsFromData(buttonData.cardsData);
        });
        nameCell.appendChild(button);

        var deleteCell = document.createElement('td');
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';

        // Event listener para el botón de eliminar
        deleteButton.addEventListener('click', function() {
            customButtons.splice(index, 1);
            saveCustomButtons(customButtons);
            updateCustomButtonsTable(); // Llama a esta función después de eliminar un botón
        });

        // Agregar botón al contenedor
        deleteCell.appendChild(deleteButton);

        // Agregar celdas a la fila
        row.appendChild(nameCell);
        row.appendChild(deleteCell);

        // Agregar fila al contenedor de botones personalizados
        customTemplatesContainer.appendChild(row);
    });
}

// Llamar a la función para cargar y actualizar los botones personalizados al cargar la página
updateCustomButtonsTable();


// Función para generar tarjetas desde los datos guardados
function createCardsFromData(cardsData) {
    cardsData.forEach(function(cardData) {
        createExerciseCard(cardData.name, cardData.sets);
    });
}

// Obtener el botón "Limpiar caché de botones personalizados"
var clearCacheButton = document.getElementById('clearCacheButton');
if (clearCacheButton) {
    // Agregar event listener solo si el botón existe
    clearCacheButton.addEventListener('click', function() {
        localStorage.removeItem('customButtons');
        // Limpiar también los botones del contenedor
        var customTemplatesContainer = document.getElementById('customTemplatesContainer');
        customTemplatesContainer.innerHTML = '';
    });
}

function createDefaultExerciseCards() {
    createExerciseCard('Calentamiento', 4);
    createExerciseCard('Estiramientos dinámicos', 4);
    createExerciseCard('Reírse como maniático', 1);
}