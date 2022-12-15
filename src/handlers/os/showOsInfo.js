import { EOL } from 'node:os';
import { cpus, userInfo, arch } from 'node:os';
import { INVALID_INPUT } from '../../constants.js';


export const showOsInform = async (prefix) => {
	switch (prefix[0]) {
		case '--EOL':
			showEOL();
			break;

		case '--cpus':
			showCpus();
			break;

		case '--homedir':
			showHomeDir();
			break;

		case '--username':
			showUserName();
			break;

		case '--architecture':
			showArch();
			break;

		default:
			console.log(INVALID_INPUT);
	}
}

const showEOL = () => {
	console.log(JSON.stringify(EOL));
}

const showCpus = () => {
	const cpusData = cpus();
	const dataForShowing = cpusData.map(item => {
		return {
			model: item.model,
			speed: `${item.speed / 1000}GHz`
		}
	});

	console.table(dataForShowing, ['model', 'speed'])
}

const showHomeDir = () => {
	console.log(userInfo().homedir);
}

const showUserName = () => {
	console.log(userInfo().username);
}

const showArch = () => {
	console.log(arch());
}