import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const create = async (fileName) => {
	const src = resolve(process.cwd(), fileName);

	await writeFile(src, '', { flag: 'wx' });
}
