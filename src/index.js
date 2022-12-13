import { cwd } from 'process';
import { INVALID_INPUT } from './constants.js';





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

const handlUserInput = (userInput) => {
	const [command, ...arg] = userInput.trim().split(' ');

	console.log('Current command is ', command);

	switch (command) {
		case 'up':
			console.log('up');
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

	process.stdin.on('data', (input) => {
		handlUserInput(input.toString());
	})

	//showCurrentDirectory

	process.on('SIGINT', () => {
		console.log(`Thank you for using File Manager, ${userData.username}, goodbye!`);
		process.exit();
	})


	//console.log(cwd());
}

init();