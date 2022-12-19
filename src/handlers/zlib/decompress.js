import { resolve, parse } from "node:path";
import { pipeline } from "node:stream/promises";
import { createBrotliDecompress } from "node:zlib";
import { createReadStream, createWriteStream } from 'node:fs';
import { access } from "node:fs/promises";

export const decompress = async (args) => {
	let [pathToFile, pathDestination = ''] = args;

	const fileName = parse(pathToFile).name;
	pathToFile = resolve(pathToFile);
	pathDestination = resolve(pathDestination);

	await access(pathToFile);
	await access(pathDestination);

	const zip = createBrotliDecompress();
	const input = createReadStream(resolve(pathToFile));
	const output = createWriteStream(resolve(pathDestination, fileName));

	await pipeline(input, zip, output);
}