import { createReadStream, createWriteStream } from 'node:fs';
import { parse, resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { access } from "node:fs/promises";

export const copy = async (arg) => {
	try {
		const [oldPath, newPath] = arg;
		const fileName = parse(oldPath).base;
		const pathToFile = resolve(oldPath);
		const pathToNewFile = resolve(newPath, fileName);

		await access(pathToFile);
		await access(newPath);

		const readStream = createReadStream(pathToFile);
		const writeStream = createWriteStream(pathToNewFile);
		await pipeline(readStream, writeStream);
	} catch {
		throw new Error();
	}
}