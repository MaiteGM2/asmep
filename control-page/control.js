console.log("toy en control");
import { chartData } from './utils/heat-curve.js';
import { connect } from './utils/connection.js';
import { sendAutoMode, sendManualMode } from './utils/mode.js';


document.addEventListener('DOMContentLoaded', () => {
    chartData();

    // Interceptar el envío del formulario para evitar el reinicio de la página
    const curveForm = document.getElementById('curve-form');
    curveForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita el reinicio de la página
        sendManualMode(); // Llama a la función para enviar los datos de la curva
    });
});
document.getElementById('connect').addEventListener('click', connect);
document.getElementById('auto-mode').addEventListener('click', sendAutoMode);
document.getElementById('manual-mode').addEventListener('click', sendManualMode)
