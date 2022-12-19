import { createReadStream } from 'node:fs';
import { resolve as resolvePath } from 'node:path';

export const readFile = (path) => {
	return new Promise((resolve, reject) => {
		const filePath = resolvePath(path);
		const readStream = createReadStream(filePath, { encoding: 'utf8' });
		readStream.on('data', chank => console.log(chank));
		readStream.on('end', () => resolve());
		readStream.on('error', (e) => reject(e));
	})
};