import fs from 'fs';
import path from 'path';
const cfgPath = 'vite.config.ts';
let cfg = fs.readFileSync(cfgPath, 'utf8');
if (!cfg.includes('patch-quill-alias.js')) {
  cfg = cfg.replace('alias: {', "alias: {\n      'quill/modules/normalizeExternalHTML/index.js': path.resolve(__dirname, 'patch-quill-alias.js'),");
  fs.writeFileSync(cfgPath, cfg);
}
fs.writeFileSync('patch-quill-alias.js', 'export default function normalizeExternalHTML(html) { return html; }\n');
console.log('Fixed vite config');
