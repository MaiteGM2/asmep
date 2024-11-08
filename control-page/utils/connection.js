import { readLoop } from './input-data.js';

export let port;
export let reader;

export async function connect() {
    try {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115200 });

        const decoder = new TextDecoderStream();
        port.readable.pipeTo(decoder.writable);
        reader = decoder.readable.getReader();

        document.getElementById('output').value = "Conectado...\n";
        readLoop();
    } catch (error) {
        document.getElementById('output').value += `Error: ${error.message}\n`;
    }
}

export async function closePort() {
    if (port) {
        try {
            if (reader) {
                reader.releaseLock();
                reader = null;
            }
            await port.close();
            port = null;
            document.getElementById('output').value += "Puerto cerrado.\n";
        } catch (error) {
            document.getElementById('output').value += `Error al cerrar el puerto: ${error.message}\n`;
        }
    }
}