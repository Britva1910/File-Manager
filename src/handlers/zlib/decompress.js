

export const decompress = async () => {
	const [pathTofile, pathDestination = ''] = args;
	//дописать проверку на пути к файлу и на наличие папки назначения
	const fileName = parse(pathTofile).base;

	const zip = createBrotliВусompress();
	const input = createReadStream(resolve(pathTofile));
	input.on('error', () => { throw new Error() })
	const output = createWriteStream(resolve(pathDestination, fileName + '.br'));

	await pipeline(input, zip, output);

	output.on('end', () => console.log('write end'))

}