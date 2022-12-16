export const startMetod = async (colback, args) => {
	try {
		await colback(args);
	} catch (e) {
		console.log('Error in startMetod');
	}
}