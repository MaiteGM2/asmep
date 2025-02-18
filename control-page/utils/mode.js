import { updateTemperatureCurve } from "./heat-curve.js";
import { sendData } from "./output-data.js";

const isValidTemperature = (temp, min, max) => {
    return temp >= min && temp <= max;
};

export const sendAutoMode = () => {
    console.log('mode auto')
    updateTemperatureCurve([preheat1, preheat2, peak, cooling]);
    sendData('Mode: automatico');
};

export const sendManualMode = () => {
    const preheat1 = parseInt(document.getElementById('preheat1-temp').value, 10);
    const preheat2 = parseInt(document.getElementById('preheat2-temp').value, 10);
    const peak = parseInt(document.getElementById('peak-temp').value, 10);
    const cooling = parseInt(document.getElementById('cooling-temp').value, 10);
    console.log('mode a¿manu')
    if (
        isValidTemperature(preheat1, 150, 180) &&
        isValidTemperature(preheat2, 180, 200) &&
        isValidTemperature(peak, 230, 250) &&
        isValidTemperature(cooling, 150, 180)
    ) {
        updateTemperatureCurve([preheat1, preheat2, peak, cooling]);
        sendData('Mode: manual');
        sendData(`{"heatCurve": [${preheat1}, ${preheat2}, ${peak}, ${cooling}]}`);
    } else {
        document.getElementById('output').value += "Error: Las temperaturas están fuera del rango recomendado.\n";
    }
};