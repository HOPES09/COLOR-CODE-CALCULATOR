let bluetoothDevice;
let characteristic;

document.getElementById('connectBT').addEventListener('click', async () => {
    try {
        // 1. Requesting the HC-05
        bluetoothDevice = await navigator.bluetooth.requestDevice({
            filters: [{ namePrefix: 'HC' }],
            optionalServices: ['0000ffe0-0000-1000-8000-00805f9b34fb']
        });

        document.getElementById('status-text').innerText = "Connecting...";
        
        // 2. Connecting to GATT Server
        const server = await bluetoothDevice.gatt.connect();
        const service = await server.getPrimaryService('0000ffe0-0000-1000-8000-00805f9b34fb');
        characteristic = await service.getCharacteristic('0000ffe1-0000-1000-8000-00805f9b34fb');

        // 3. Start Receiving
        await characteristic.startNotifications();
        characteristic.addEventListener('characteristicvaluechanged', handleData);

        // 4. Update UI Success
        document.getElementById('status-text').innerText = "LIVE - HC-05";
        document.getElementById('connectBT').innerText = "CONNECTED";
        document.getElementById('connectBT').classList.add('connected');
        document.getElementById('pulse-dot').classList.add('active-pulse');

    } catch (error) {
        console.log("Connection failed: " + error);
        alert("Ensure Bluetooth is ON and you are using HTTPS");
    }
});

function handleData(event) {
    const value = new TextDecoder().decode(event.target.value);
    
    // Split data coming from Arduino: "7.2,24.5,10.2"
    const dataParts = value.split(',');
    
    if (dataParts.length >= 3) {
        document.getElementById('ph-val').innerText = dataParts[0];
        document.getElementById('temp-val').innerText = dataParts[1];
        document.getElementById('turb-val').innerText = dataParts[2];
        
        // Logical Alert: Red text if pH is unsafe
        const ph = parseFloat(dataParts[0]);
        document.getElementById('ph-val').style.color = (ph < 6.5 || ph > 8.5) ? "#d93025" : "#188038";
    }
}
