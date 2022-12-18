import { resolve, parse } from "node:path";
import { pipeline } from "node:stream/promises";
import { createBrotliCompress } from "node:zlib";
import { createReadStream, createWriteStream } from 'node:fs';

export const compress = async (args) => {
	const [pathTofile, pathDestination = ''] = args;

	const fileName = parse(pathTofile).base;


	console.log(fileName);
	console.log(resolve(pathTofile));
	console.log(resolve(pathDestination, fileName + '.br'));

	const zip = createBrotliCompress();
	const input = createReadStream(resolve(pathTofile));
	const output = createWriteStream(resolve(pathDestination, fileName + '.br'));

	await pipeline(input, zip, output);

}