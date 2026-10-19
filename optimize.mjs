import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

async function optimizeImages() {
  const employesDir = path.join(process.cwd(), 'public', 'employes');
  const files = await fs.readdir(employesDir);

  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const inputPath = path.join(employesDir, file);
      const outputFilename = `${path.parse(file).name}.webp`;
      const outputPath = path.join(employesDir, outputFilename);

      try {
        await sharp(inputPath)
          .resize(400, 400, { fit: 'cover', withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outputPath);
        console.log(`Optimized ${file} -> ${outputFilename}`);
        // Optionally delete the original file
        // await fs.unlink(inputPath);
      } catch (err) {
        console.error(`Error optimizing ${file}:`, err);
      }
    }
  }

  // Also optimize favicon if needed or other public images
}

optimizeImages();
