import './App.css';
import React from 'react';
import Spinner from './components/Spinner';

// Import the declarative pattern
import { fetchData } from './components/Api';

// Extract fetch data to resource to write cleaner & easier to read code
const resource = fetchData();

// Create Components; Can be done in an external file but I'm leaving it here for simplicity

// Greet Component
function Greet() {
	const greeting = resource.greet.read();
	return <h3>{greeting}</h3>;
}

// Awesome Component
function Awesome() {
	const awesome = resource.awesome.read();
	return <h3>{awesome}</h3>;
}

// Todo Component
function Todo() {
	const todo = resource.todo.read();
	return <h3>{todo}</h3>;
}

function App() {
	return (
		<div className='App'>
			<h1>
				The React Concurrency
				<br /> Declarative Pattern
			</h1>
			<ul>
				<li>
					See Api.js to review the "declarative" pattern. React is moving
					towards this approach.
				</li>
				<li>
					This demo has 3 promises: [1] Greet which takes 3 seconds, [2] Awesome
					which takes 4 seconds, [3] Todo which takes 5 seconds
				</li>
				<li>
					Placement of React.Suspense matters. If one Suspense is wrapped around
					multiple components, it suspends until the amount of time of the
					longest promise and loads everythign at the same time. In this demo
					the longest promise belongs to Todo which takes 5 seconds.
				</li>
				<li>
					Use React.Suspense individually to load suspend one at time until
					ready. This approach doesn't wait until the longest promise like the
					last point and will load as soon as it's ready. It's also the approach
					used in this demo.
				</li>
				<li>
					The fallback can use inline HTML or import a component. For the
					greeting & awesome message inline styling is used. For the last, both
					inline styling is used and also an imported Spinner component.
					<b> This looks awkward but is strictly for demo purposes</b>
				</li>
			</ul>
			{/* Components */}
			<React.Suspense fallback={<h3>Loading greeting message...</h3>}>
				<Greet />
			</React.Suspense>
			<React.Suspense fallback={<h3>Loading awesome message...</h3>}>
				<Awesome />
			</React.Suspense>
			<React.Suspense
				fallback={
					<>
						<Spinner />
						<h3>Loading something todo...</h3>
					</>
				}>
				<Todo />
			</React.Suspense>
		</div>
	);
}

export default App;
