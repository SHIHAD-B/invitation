import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const dir = path.resolve("public/images");

const jobs = [
  { file: "flower-left.png", max: 720 },
  { file: "flower-right.png", max: 720 },
  { file: "flower-spray.png", max: 800 },
  { file: "flower-bl.png", max: 800 },
  { file: "flower-br.png", max: 800 },
  { file: "inner-bg.png", max: 1600 },
  { file: "envelop.png", max: 1200 },
  { file: "envelop-cover.png", max: 1400 },
  { file: "photo1.png", max: 900 },
  { file: "photo2.png", max: 900 },
  { file: "paper.png", max: 436 },
];

for (const job of jobs) {
  const input = path.join(dir, job.file);
  const output = input.replace(/\.png$/i, ".webp");
  const info = await sharp(input)
    .resize({
      width: job.max,
      height: job.max,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 72, effort: 6 })
    .toFile(output);
  console.log(
    `${job.file} -> ${path.basename(output)} ${(info.size / 1024).toFixed(1)} KB ${info.width}x${info.height}`,
  );
}

const leftovers = (await readdir(dir)).filter((name) => name.startsWith("ChatGPT"));
if (leftovers.length) {
  console.log(`Unused source files still in public/images: ${leftovers.length}`);
}
