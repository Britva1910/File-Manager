import { cwd } from 'process';
import { INVALID_INPUT } from './constants.js';
import { showCurrentDirectory } from './helpers/showCurrentDirectory.js';
import { startMetod } from './helpers/startMetod.js';
import { list } from './handlers/fs/list.js';
import { homedir } from 'os';
import { changeDirectory } from './handlers/changeDirectory.js';
import { readFile } from './handlers/fs/read.js';
import { create } from './handlers/fs/create.js';
import { rename } from './handlers/fs/rename.js';
import { copy } from './handlers/fs/copy.js';





const userData = {
	username: '',
}

const sayWelcome = () => {
	const [executor, file, ...rest] = process.argv;

	const arrArguments = rest[0].split('=');

	if (arrArguments[0] === '--username') {
		userData.username = arrArguments[1];
	} else {
		userData.username = 'anonymous';
	}

	console.log(`Welcome to the File Manager, ${userData.username}!`);
}

const handlUserInput = async (userInput) => {
	const [command, ...arg] = userInput.trim().split(' ');

	//console.log('Current command is ', command);

	switch (command) {
		case 'up':
			await startMetod(changeDirectory, '..');
			showCurrentDirectory();
			break;

		case 'cd':
			await startMetod(changeDirectory, arg[0]);
			showCurrentDirectory();
			break;

		case 'ls':
			await startMetod(list);
			showCurrentDirectory();
			break;

		case 'cat':
			await startMetod(readFile, arg[0]);
			showCurrentDirectory();
			break;

		case 'add':
			await startMetod(create, arg[0]);
			showCurrentDirectory();
			break;

		case 'rn':
			await startMetod(rename, arg);
			showCurrentDirectory();
			break;

		case 'cp':
			await startMetod(copy, arg);
			showCurrentDirectory();
			break;

		case '.exit':
			console.log(`Thank you for using File Manager, ${userData.username}, goodbye!`);
			process.exit();


		default:
			console.log(INVALID_INPUT);
	}


}


const init = () => {
	sayWelcome();

	process.chdir(homedir());

	showCurrentDirectory();

	process.stdin.on('data', (input) => {
		handlUserInput(input.toString());
	})



	process.on('SIGINT', () => {
		console.log(`Thank you for using File Manager, ${userData.username}, goodbye!`);
		process.exit();
	})



}

init();
