Sieve
=====

A simple async event lib.

This library is mostly untested and very much work in progress - so use at your own risk.

## Usage

### Sieve.on
Registers an event handler.

	Sieve.on('save', function(next, state) {
		state.cancelled = true;
		next();
	});

### Sieve.fire
Fires an event.

	Sieve.fire('save', function(state) {
		if(state.cancelled) {
			console.log('Save aborted.');
		}
	});

### Sieve.un
Unregisteres an event handler.

	Sieve.un('save', myHandler);

### Sieve.clear
Clears all handlers for an event.

	Seive.clear('save');

