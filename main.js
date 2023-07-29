const fs = require('fs');

function parseDxDiagOutput(output) {
    const lines = output.split('\n');
    let systemInfo = {};

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line.startsWith('Operating System:')) {
            systemInfo.operatingSystem = line.replace('Operating System:', '').trim();
        } else if (line.startsWith('Processor:')) {
            systemInfo.processor = line.replace('Processor:', '').trim();
        } else if (line.startsWith('Memory:')) {
            const memoryInfo = line.replace('Memory:', '').trim().split(' ');
            systemInfo.memory = parseInt(memoryInfo[0], 10);
            systemInfo.memoryUnit = memoryInfo[1];
        } else if (line.startsWith('Card name:')) {
            systemInfo.graphicsCard = line.replace('Card name:', '').trim();
        } else if (line.startsWith('Display Memory:')) {
            const memoryInfo = line.replace('Display Memory:', '').trim().split(' ');
            systemInfo.graphicsMemory = parseInt(memoryInfo[0], 10);
            systemInfo.graphicsMemoryUnit = memoryInfo[1];
        } 

        // You can add more conditions to extract other relevant information
        // For example, GPU, DirectX version, etc.
    }

    return systemInfo;
}


function readDxDiagFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading dxdiag file: ${err.message}`);
            return;
        }

        const systemInfo = parseDxDiagOutput(data);
        console.log(systemInfo);
    });
}

// Replace 'dxdiag.txt' with the path to the user-provided dxdiag.txt file
const dxdiagFilePath = 'example-dxdiag.txt';
readDxDiagFile(dxdiagFilePath);


