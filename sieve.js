/*
 * This is a very simple async eventing thingie.
 *
 * Made by Max Hauser
 * License: MIT (http://max.mit-license.org/)
 * 
 * USAGE:
 *
 * Sieve.on(next, state) {
 *   state.canceled = true;
 *   next();	
 * });
 *
 * Sieve.fire('save', function(state) {
 *   if(state.canceled) {
 *     // I was canceled	
 *   }
 * });
 *
 */
(function(global) {
	'use strict';

	var events = {};

	function getHandlers(name) {
		return events[name] || (events[name] = []);
	}

	function on(name, handler) {
		getHandlers(name).push(handler);
	}

	function un(name, handler) {
		var handlers = getHandlers(name);
		for (var i = 0, l = handlers.length; i < l; i++) {
			if (handlers[i] === handler) {
				handlers.splice(i, 1);
				return;
			}
		}
	}

	function clear(name) {
		delete events[name];
	}

	function fire(name, callback, state) {
		var handlers = getHandlers(name).slice();
		state = state || {};

		if (callback) {
			handlers.push(function(_, s) {
				callback(s);
			});
		}

		function next() {
			if (handlers.length === 0)
				return;
			var handler = handlers.shift();
			handler(next, state);
		}

		next();
	}

	global.Sieve = {
		on: on,
		un: un,
		fire: fire,
		clear: clear
	};

}(this));