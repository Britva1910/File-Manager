export const startMetod = async (colback, args) => {
	try {
		await colback(args);
	} catch {
		console.log('Error in startMetod');
	}
}