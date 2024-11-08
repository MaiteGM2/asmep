import { closePort } from './connection.js';
import { updateTemperatureCurve } from './heat-curve.js';
import { sendAutoMode, sendManualMode } from './mode.js';
import {reader} from './connection.js';

export async function readLoop() {
    let buffer = ''; // Buffer para fragmentos de datos
    try {
        // Asegurarse de que reader esté disponible antes de intentar leer
        if (!reader) {
            document.getElementById('output').value += "Error: No se ha iniciado la lectura.\n";
            return;
        }

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            buffer += value; // Añadir al buffer
            let lines = buffer.split('\n'); // Separar en líneas

            for (let i = 0; i < lines.length - 1; i++) { // Procesar todas las líneas completas
                processLine(lines[i]);
            }

            buffer = lines[lines.length - 1]; // Mantener la última línea incompleta
        }
    } catch (error) {
        document.getElementById('output').value += `Error al leer: ${error.message}\n`;
    } finally {
        await closePort(); // Cerrar el puerto una vez terminada la lectura
    }
}

export function processLine(line) {
    console.log("Línea recibida:", line); // Mensaje de depuración
    const temperatureMatch = line.match(/Temperatura: (\d+\.?\d*)/);
    if (temperatureMatch) {
        const temperature = temperatureMatch[1];
        document.querySelector('.temperature').textContent = `${temperature}°C`;
    }

    const modeMatch = line.match(/Modo: (.+)/);
    if (modeMatch) {
        const mode = modeMatch[1];
        if (mode == 'manual'){
            sendManualMode();
            document.getElementById('mode-label').textContent = `Modo: ${mode}`;
        } else if (mode == 'automatico'){
            sendAutoMode();
            document.getElementById('mode-label').textContent = `Modo: ${mode}`;
        }

    }

    const curveMatch = line.match(/Curva de Calor: \[(.+)\]/);
    if (curveMatch) {
        const curveData = curveMatch[1].split(',').map(Number);
        console.log(curveData);
        updateTemperatureCurve(curveData); // Actualiza el gráfico con la curva
    }    
}