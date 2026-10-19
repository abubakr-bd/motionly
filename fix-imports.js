const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'components', 'personal-branding');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      // Fix Variants
      if (content.match(/import \{[^}]*Variants[^}]*\} from "framer-motion";/)) {
        content = content.replace(/import \{([^}]*)Variants([^}]*)\} from "framer-motion";/g, 'import type { $1Variants$2 } from "framer-motion";');
        changed = true;
      }
      
      // Fix Settings types
      if (content.match(/import \{[^}]*Settings[^}]*\} from "\.\/types";/)) {
        content = content.replace(/import \{([^}]*Settings)[^}]*\} from "\.\/types";/g, 'import type { $1 } from "./types";\nimport { DEFAULT_$1 } from "./types";');
        // Actually the regex above is bad because DEFAULT is part of the import.
        // Let's do it simpler.
      }
      
      if (changed) {
        // fs.writeFileSync(fullPath, content);
      }
    }
  }
}

// Just regex replace is fragile. It's safer to use multi_replace_file_content for the 5-6 files.
