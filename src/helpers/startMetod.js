import { ERROR_MESSAGE } from "../constants.js";

export const startMetod = async (colback, args) => {
	try {
		await colback(args);
	} catch {
		console.log(ERROR_MESSAGE);
	}
}