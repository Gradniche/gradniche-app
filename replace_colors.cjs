const fs = require('fs');
const path = require('path');

const dir = './components';

const replacements = [
    { regex: /text-\[\#F6520C\]/g, replacement: 'text-blue-400' },
    { regex: /bg-\[\#F6520C\]/g, replacement: 'bg-blue-600' },
    { regex: /border-\[\#F6520C\]/g, replacement: 'border-blue-500' },
    { regex: /ring-\[\#F6520C\]/g, replacement: 'ring-blue-500' },
    { regex: /from-\[\#F6520C\]/g, replacement: 'from-blue-500' },
    { regex: /to-\[\#F6520C\]/g, replacement: 'to-purple-500' },
    { regex: /via-\[\#F6520C\]/g, replacement: 'via-blue-500' },
    { regex: /shadow-\[\#F6520C\]/g, replacement: 'shadow-blue-500' },
    { regex: /decoration-\[\#F6520C\]/g, replacement: 'decoration-blue-500' },
    { regex: /accent-\[\#F6520C\]/g, replacement: 'accent-blue-500' },
    { regex: /fill="\#F6520C"/g, replacement: 'fill="#3b82f6"' },
    { regex: /\['\#F6520C', '\#FF7B40', '\#FFA580', '\#FFC2A6'\]/g, replacement: "['#3b82f6', '#8b5cf6', '#6366f1', '#a855f7']" },
    { regex: /rgba\(246,82,12,/g, replacement: 'rgba(59,130,246,' },
    { regex: /hover:text-orange-400/g, replacement: 'hover:text-blue-300' },
    { regex: /to-orange-500/g, replacement: 'to-purple-500' },
    { regex: /to-orange-400/g, replacement: 'to-purple-400' },
    { regex: /to-orange-300/g, replacement: 'to-purple-300' },
    { regex: /from-orange-500/g, replacement: 'from-blue-500' },
    { regex: /hover:bg-orange-600/g, replacement: 'hover:bg-blue-700' },
    { regex: /hover:bg-\[\#E84A00\]/g, replacement: 'hover:bg-blue-700' },
    { regex: /hover:bg-\[\#d44306\]/g, replacement: 'hover:bg-blue-700' },
    { regex: /shadow-orange-500/g, replacement: 'shadow-blue-500' },
    { regex: /bg-orange-900/g, replacement: 'bg-blue-900' },
    { regex: /ring-\[\#E84A00\]/g, replacement: 'ring-blue-700' },
    { regex: /text-\[\#E84A00\]/g, replacement: 'text-blue-500' },
    { regex: /border-\[\#E84A00\]/g, replacement: 'border-blue-600' },
    { regex: /bg-\[\#E84A00\]/g, replacement: 'bg-blue-700' },
    { regex: /\#F6520C/g, replacement: '#3b82f6' } // Catch any remaining hex codes
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
