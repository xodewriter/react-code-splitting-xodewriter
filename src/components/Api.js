/* STEP 3: Last step but I like to keep this at the top */

// Close the circle by fetching data
export function fetchData() {
	let greetPromise = fetchGreet();
	let awesomePromise = fetchAwesome();
	let todoPromise = fetchTodo();

	return {
		greet: wrapPromise(greetPromise),
		awesome: wrapPromise(awesomePromise),
		todo: wrapPromise(todoPromise),
	};
}

/* STEP 1: Create promises to fetch data */

// Promise to fetch a greeting message
function fetchGreet() {
	const d = new Date();
	let msg;
	d.getHours >= 12 ? (msg = 'Good Morning!') : (msg = 'Good Afternoon');

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(msg);
		}, 2000);
	});
}

// Promise to fetch an awesome message
function fetchAwesome() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('You are Awesome!');
		}, 4000);
	});
}

// Promise to fetch something Todo
function fetchTodo() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve("It's time to code!");
		}, 6000);
	});
}

/* STEP 2: Create wrapper to dynamically wrap each of the promises, or at least the onece we decide to use in STEP 3 */

// Wrapper for promises
function wrapPromise(promise) {
	// default status
	let status = 'pending';
	// eventually holds the value of either 1) "resolved" promise 2) "rejected" promise
	let result;
	// takes the promise argument and carries out the promise to try and resolve it
	// it will either 1) resolve "r" or 2) reject "e"
	let suspender = promise.then(
		r => {
			status = 'resolved';
			result = r;
		},
		e => {
			status = 'rejected';
			result = e;
		},
	);

	// Return object
	return {
		// Conditionally runs code
		// If pending (default), promise.then runs & returns a result of either resolved or rejected
		// If resolved, a succesful response object is stored to the result variable
		// If status, an error object is stored to the result variable
		read() {
			if (status === 'pending') throw suspender;
			if (status === 'resolved') return result;
			if (status === 'rejected') return result;
		},
	};
}
