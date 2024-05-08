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



// Botones de generación de tarjetas específicas
var pushDayButton = document.getElementById('pushDayButton');
var pullDayButton = document.getElementById('pullDayButton');
var legDayButton = document.getElementById('legDayButton');

// Event listeners para los botones
pushDayButton.addEventListener('click', function() {
    createPushDayCards();
});

pullDayButton.addEventListener('click', function() {
    createPullDayCards();
});

legDayButton.addEventListener('click', function() {
    createLegDayCards();
});

// Función para generar tarjetas de Día de push
function createPushDayCards() {
    createExerciseCard('Push ups', 8);
    createExerciseCard('Tríceps push', 5);
    createExerciseCard('Handstand hold', 3);
}

// Función para generar tarjetas de Día de PULL
function createPullDayCards() {
    createExerciseCard('Pullups', 8);
    createExerciseCard('Ice cream makers', 5);
    createExerciseCard('Abs', 3);
}

// Función para generar tarjetas de Día de pierna
function createLegDayCards() {
    createExerciseCard('Squats', 8);
    createExerciseCard('Sumo Squat', 5);
    createExerciseCard('Chocolate', 1);
}
