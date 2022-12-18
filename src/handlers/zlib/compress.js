import { resolve, parse } from "node:path";
import { pipeline } from "node:stream/promises";
import { createBrotliCompress } from "node:zlib";
import { createReadStream, createWriteStream } from 'node:fs';
import { access } from "node:fs/promises";

export const compress = async (args) => {
	try {
		let [pathToFile, pathDestination = ''] = args;

		const fileName = parse(pathToFile).base;
		pathToFile = resolve(pathToFile);
		pathDestination = resolve(pathDestination);

		await access(pathToFile);
		await access(pathDestination);


		const zip = createBrotliCompress();
		const input = createReadStream(pathToFile);
		const output = createWriteStream(resolve(pathDestination, fileName + '.bgz'));

		await pipeline(input, zip, output);
	} catch {
		throw new Error();
	}
}