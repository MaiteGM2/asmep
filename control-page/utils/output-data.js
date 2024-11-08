import {port} from './connection.js';

export async function sendData(data) {
    if (!port) {
        document.getElementById('output').value += "No hay conexión.\n";
        return;
    }

    const writer = port.writable.getWriter();
    try {
        await writer.write(new TextEncoder().encode(data + "\n"));
        document.getElementById('output').value += "Datos enviados: " + data + "\n";
    } catch (error) {
        document.getElementById('output').value += `Error al enviar: ${error.message}\n`;
    } finally {
        writer.releaseLock();
    }
}