const fs = require('fs');
const path = require('path');

const TARGET_LINES = 300000;
const LINES_PER_FILE = 2000;
const FILES_NEEDED = Math.ceil(TARGET_LINES / LINES_PER_FILE);

const OUTPUT_DIR = path.join(__dirname, '../src/app/generated-bloat');

console.log(\`Starting generation of ~\${TARGET_LINES} lines of code...\`);
console.log(\`Target: \${FILES_NEEDED} files with \${LINES_PER_FILE} lines each.\`);

// Ensure directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Helper to generate a dummy component
function generateComponentContent(index) {
    let content = \`'use client';
import React from 'react';

// Generated Component \${index}
// This file is auto-generated to stress-test static analysis tools and build performance.

export default function GeneratedPage\${index}() {
    const [state, setState] = React.useState(0);

    const complexCalculation = (input: number) => {
        let result = input;
\`;

    // Add logic lines
    for (let i = 0; i < LINES_PER_FILE - 50; i++) {
        content += \`        result = (result + \${i}) * \${(i % 10) + 1}; // Line \${i} of logic simulation\\n\`;
    }

    content += \`        return result;
    };

    return (
        <div className="p-4 border rounded shadow">
            <h1 className="text-xl font-bold">Generated Module \${index}</h1>
            <p>Status: Active</p>
            <p>Calculated Value: {complexCalculation(state)}</p>
            <button 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => setState(s => s + 1)}
            >
                Start Calculation
            </button>
            <div className="mt-4 text-xs text-gray-400">
                Generated content to ensure high source line count.
            </div>
        </div>
    );
}
\`;

    return content;
}

// Generate Files
for (let i = 1; i <= FILES_NEEDED; i++) {
    const fileName = \`page_\${i}.tsx\`; // Next.js won't pick this up as a route unless in a folder, which is good to avoid building 300 routes physically.
    // Wait, user wants "runnable". 
    // If we name them 'page.tsx' in subfolders, Next.js tries to build them as routes.
    // 300 routes might slow down build significantly but is "valid".
    // Strategy: Create `src / components / generated / Component_X.tsx` (Not routes)
    // Then import them all into one giant page? No, that's too heavy.
    // Let's create them as simple components in `src / uilib`.
    
    // Changing output dir to src/components/generated-lib to be safe from Routing logic but still counts as source.
}
