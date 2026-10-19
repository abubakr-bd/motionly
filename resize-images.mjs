import sharp from 'sharp';
import { writeFile, readFile } from 'fs/promises';

const publicDir = 'D:/master/motionly website/motionly/public';

const jobs = [
  // Nav logo: displayed at ~234x70 on mobile, 2x retina = 468px wide
  {
    src: `${publicDir}/nav_logo.webp`,
    dst: `${publicDir}/nav_logo.webp`,
    width: 468,
    height: null,
    quality: 82
  },
  // Employee avatars: displayed at 84x84, 2x retina = 168x168
  { src: `${publicDir}/employes/abu bakar.webp`,             dst: `${publicDir}/employes/abu bakar.webp`,             size: 168 },
  { src: `${publicDir}/employes/Wasif.webp`,                 dst: `${publicDir}/employes/Wasif.webp`,                 size: 168 },
  { src: `${publicDir}/employes/abir.webp`,                  dst: `${publicDir}/employes/abir.webp`,                  size: 168 },
  { src: `${publicDir}/employes/barno.webp`,                 dst: `${publicDir}/employes/barno.webp`,                 size: 168 },
  { src: `${publicDir}/employes/nazmul.webp`,                dst: `${publicDir}/employes/nazmul.webp`,                size: 168 },
  { src: `${publicDir}/employes/Nazmul Hossen Shuvo.webp`,   dst: `${publicDir}/employes/Nazmul Hossen Shuvo.webp`,   size: 168 },
  { src: `${publicDir}/employes/Raiyan.webp`,                dst: `${publicDir}/employes/Raiyan.webp`,                size: 168 },
];

async function resize() {
  for (const job of jobs) {
    try {
      // Read the file into a buffer first to avoid write conflict
      const input = await readFile(job.src);
      let pipeline;
      if (job.size) {
        pipeline = sharp(input).resize(job.size, job.size, { fit: 'cover' }).webp({ quality: 75 });
      } else {
        pipeline = sharp(input).resize(job.width).webp({ quality: job.quality || 80 });
      }
      const buf = await pipeline.toBuffer();
      await writeFile(job.dst, buf);
      const kb = (buf.length / 1024).toFixed(1);
      console.log(`OK ${job.dst.split('/').pop()} => ${kb} KB`);
    } catch (e) {
      console.error(`FAIL ${job.src.split('/').pop()}: ${e.message}`);
    }
  }
  console.log('Done.');
}

resize();
