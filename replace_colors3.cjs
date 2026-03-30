const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');

fs.readdirSync(componentsDir).forEach(file => {
  if (file.endsWith('.tsx') || file.endsWith('.ts')) {
    const filePath = path.join(componentsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace specific gradient
    content = content.replace(/from-\[#F6520C\] to-orange-400/g, 'from-blue-400 to-purple-400');
    
    // Replace any remaining #F6520C
    content = content.replace(/#F6520C/g, '#3b82f6'); // blue-500
    
    // Replace any remaining orange-400
    content = content.replace(/orange-400/g, 'blue-400');
    
    // Replace any remaining orange-500
    content = content.replace(/orange-500/g, 'blue-500');
    
    // Replace any remaining orange-600
    content = content.replace(/orange-600/g, 'blue-600');
    
    fs.writeFileSync(filePath, content, 'utf8');
  }
});
console.log('Colors replaced successfully!');
