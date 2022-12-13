import { readdir } from 'node:fs/promises';
import { lstat } from 'node:fs/promises'

export const list = async () => {
	const src = process.cwd();

	const filesNames = await readdir(src);

	const filesWithType = filesNames.map(async (item) => {
		const isFile = (await lstat(item)).isFile();
		const itemType = isFile ? 'file' : 'directory';
		return { name: item, type: itemType };
	});

	Promise.all(filesWithType).then((value) => {
		const sortedArr = value.sort((a, b) => {
			const typeA = a.type.toLowerCase();
			const typeB = b.type.toLowerCase();
			if (typeA < typeB) {
				return -1;
			}
			if (typeA > typeB) {
				return 1;
			}
			return 0;
		});
		console.table(sortedArr);
	})
};
