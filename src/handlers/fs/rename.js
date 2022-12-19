import { rename as changeName } from 'node:fs/promises';
import { resolve } from 'node:path';


export const rename = async (args) => {
	const [oldName, newName] = args;
	const oldFile = resolve(process.cwd(), oldName);
	const newFile = resolve(process.cwd(), newName);

	await changeName(oldFile, newFile);
};
