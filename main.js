// If in a Node.js environment

const fs = require('fs');

/**
 * Parses the content of a dxdiag file and extracts system information.
 *
 * @param {string} output - The content of the dxdiag file as a string.
 * @returns {Object} An object containing system information.
 * @property {string} operatingSystem - The operating system of the user's computer.
 * @property {string} processor - The processor model of the user's computer.
 * @property {number} memory - The amount of RAM in megabytes before and after running the game.
 * @property {string} memoryUnit - The unit of measurement for RAM (usually "MB" for megabytes).
 * @property {string} graphicsCard - The model name of the user's graphics card.
 * @property {number} graphicsMemory - The amount of graphics memory in megabytes.
 * @property {string} graphicsMemoryUnit - The unit of measurement for graphics memory (usually "MB" for megabytes).
 */
function parseDxDiagOutput(output) {
    const lines = output.split('\n');
    let systemInfo = {};

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line.startsWith('Operating System:')) {
            systemInfo.operatingSystem = line.replace('Operating System:', '').trim();
        } 
        else if (line.startsWith('Processor:')) {
            systemInfo.processor = line.replace('Processor:', '').trim();
        } 
        else if (line.startsWith('Memory:')) {
            const memoryInfo = line.replace('Memory:', '').trim().split(' ');
            systemInfo.memory = parseInt(memoryInfo[0], 10);
            systemInfo.memoryUnit = memoryInfo[0].slice(-2);
        } 
        else if (line.startsWith('Card name:')) {
            systemInfo.graphicsCard = line.replace('Card name:', '').trim();
        } 
        else if (line.startsWith('Display Memory:')) {
            const memoryInfo = line.replace('Display Memory:', '').trim().split(' ');
            systemInfo.graphicsMemory = parseInt(memoryInfo[0], 10);
            systemInfo.graphicsMemoryUnit = memoryInfo[1];
        } 
    }

    return systemInfo;
}



/**
 * Reads the content of a dxdiag file and parses it to extract system information.
 *
 * @param {string} filePath - The path to the dxdiag file.
 */
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

// Usage example:
const dxdiagFilePath = 'example-dxdiag.txt';
readDxDiagFile(dxdiagFilePath);


