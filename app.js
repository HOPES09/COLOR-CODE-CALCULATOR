let port;
let reader;

document.getElementById('connectBT').addEventListener('click', async () => {
    try {
        // This opens the "Serial Port" window from your screenshot
        port = await navigator.serial.requestPort();
        
        await port.open({ baudRate: 9600 });
        
        document.getElementById('status-text').innerText = "Connected to HC-05";
        document.getElementById('connectBT').style.background = "#188038";
        
        readSerialData();
    } catch (error) {
        console.error("Connection failed", error);
        alert("Select the 'Standard Serial over Bluetooth' port from the list.");
    }
});

async function readSerialData() {
    const decoder = new TextDecoder();
    while (port.readable) {
        reader = port.readable.getReader();
        try {
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                
                const dataString = decoder.decode(value);
                processIncomingData(dataString);
            }
        } catch (error) {
            console.error("Read error", error);
        } finally {
            reader.releaseLock();
        }
    }
}

function processIncomingData(data) {
    // Splits the "ph,temp,turb" string from your Arduino
    const values = data.split(',');
    if (values.length >= 3) {
        document.getElementById('ph-val').innerText = values[0];
        document.getElementById('temp-val').innerText = values[1];
        document.getElementById('turb-val').innerText = values[2];
    }
}
