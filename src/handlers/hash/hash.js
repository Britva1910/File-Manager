
import { createReadStream } from 'fs';
import { resolve as resolvePath } from 'path';

const { createHash } = await import('crypto');

export const calculateHash = async (path) => {
	return new Promise((resolve, reject) => {
		const filePath = resolvePath(...path)
		const hash = createHash('sha256');
		const input = createReadStream(filePath);
		input.on('error', data => {
			reject(data)
		})

		const hashData = input.pipe(hash).setEncoding('hex');
		hashData.on('data', data => {
			console.log(data);
			resolve();
		})
		hashData.on('error', data => {
			reject(data)
		})
	})
};