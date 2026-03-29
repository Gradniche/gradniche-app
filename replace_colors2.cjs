const fs = require('fs');
const path = require('path');

const dir = './components';

const replacements = [
    { regex: /orange-500/g, replacement: 'blue-500' },
    { regex: /orange-400/g, replacement: 'blue-400' },
    { regex: /orange-300/g, replacement: 'blue-300' },
    { regex: /orange-600/g, replacement: 'blue-600' },
    { regex: /orange-900/g, replacement: 'blue-900' },
    { regex: /red-500/g, replacement: 'purple-500' },
    { regex: /red-400/g, replacement: 'purple-400' },
    { regex: /red-300/g, replacement: 'purple-300' },
    { regex: /red-600/g, replacement: 'purple-600' },
    { regex: /red-900/g, replacement: 'purple-900' },
    { regex: /yellow-500/g, replacement: 'blue-500' },
    { regex: /yellow-400/g, replacement: 'blue-400' }
];

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            for (const { regex, replacement } of replacements) {
                if (regex.test(content)) {
                    content = content.replace(regex, replacement);
                    modified = true;
                }
            }
            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

processDirectory(dir);
