import { createReadStream, createWriteStream } from 'node:fs';
import { parse, resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';

export const copy = async (arg) => {
	const [oldPath, newPath] = arg;
	const fileName = parse(oldPath).base;
	const pathToFile = resolve(oldPath);
	const pathToNewFile = resolve(newPath, fileName);

	const readStream = createReadStream(pathToFile);
	const writeStream = createWriteStream(pathToNewFile);
	await pipeline(readStream, writeStream);
}