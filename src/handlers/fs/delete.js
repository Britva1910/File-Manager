import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';

export const remove = async (arg) => {
	const pathToFile = resolve(arg[0]);
	await rm(pathToFile);
}