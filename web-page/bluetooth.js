async function connectToBLE() {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['12345678-1234-1234-1234-123456789012'] }]
      });
  
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService('12345678-1234-1234-1234-123456789012');
      const characteristic = await service.getCharacteristic('87654321-4321-4321-4321-210987654321');
  
      characteristic.startNotifications();
      characteristic.addEventListener('characteristicvaluechanged', handleTemperatureUpdate);
  
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  function handleTemperatureUpdate(event) {
    const value = new TextDecoder().decode(event.target.value);
    console.log('Temperatura actual:', value);
  }
  

  