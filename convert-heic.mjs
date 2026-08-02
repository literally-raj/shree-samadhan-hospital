import heicConvert from 'heic-convert';
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, extname, basename } from 'path';

const galleryDir = './public/gallery';
const files = readdirSync(galleryDir);
const heicFiles = files.filter(f => extname(f).toLowerCase() === '.heic');

console.log(`Found ${heicFiles.length} HEIC files to convert...`);

for (const file of heicFiles) {
  const inputPath = join(galleryDir, file);
  const outputName = basename(file, extname(file)) + '.jpg';
  const outputPath = join(galleryDir, outputName);

  console.log(`Converting: ${file} → ${outputName}`);

  const inputBuffer = readFileSync(inputPath);
  const outputBuffer = await heicConvert({
    buffer: inputBuffer,
    format: 'JPEG',
    quality: 0.9
  });

  writeFileSync(outputPath, Buffer.from(outputBuffer));
  console.log(`✅ Done: ${outputName}`);
}

console.log('\nAll HEIC files converted to JPG!');
