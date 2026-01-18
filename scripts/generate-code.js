const fs = require('fs');
const path = require('path');

const TARGET_LINES = 310000;
const LINES_PER_FILE = 1000;
const FILES_NEEDED = Math.ceil(TARGET_LINES / LINES_PER_FILE);

const OUTPUT_DIR = path.join(__dirname, '../src/libs/generated');

console.log('Starting generation...');
console.log('Target ' + FILES_NEEDED + ' files.');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function generateComponentContent(index) {
    let content = "import React from 'react';\n\n";
    content += "// Generated Module " + index + "\n";
    content += "export const BigComponent" + index + " = () => {\n";
    content += "    const data = [\n";

    for (let i = 0; i < LINES_PER_FILE - 20; i++) {
        content += '        { id: ' + i + ', value: "Mock Data Entry ' + i + '", active: ' + (i % 2 === 0) + ' },\n';
    }

    content += "    ];\n";
    content += "    return <div>Data Length: {data.length}</div>;\n";
    content += "};\n";

    return content;
}

for (let i = 1; i <= FILES_NEEDED; i++) {
    const fileName = 'Module_' + i + '.tsx';
    const filePath = path.join(OUTPUT_DIR, fileName);
    fs.writeFileSync(filePath, generateComponentContent(i));

    if (i % 50 === 0) console.log('Generated ' + i + ' files...');
}
console.log('Done.');
