import fs from 'fs';
import path from 'path';

const quillPath = path.resolve('node_modules', 'quill', 'modules', 'normalizeExternalHTML', 'index.js');
const content = `
export default function normalizeExternalHTML(html) { return html; }
`;
fs.writeFileSync(quillPath, content);
console.log('Patched quill');
