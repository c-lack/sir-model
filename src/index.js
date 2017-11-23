var numeric = require('numeric')

var sirModel = {

	/*
	The following objects are the initial configuration variables. They will change as the user adjusts the simulation.
	*/

	config: {
		N: 100,
		beta: 0.06,
		gamma: 1,
		T: 10,
		delta: 0.1,
	},

	/*
	Methods
	*/

	set_beta: function(beta) {
		this.config.beta = beta;
	},

	set_gamma: function(gamma) {
		this.config.gamma = gamma;
	},

	dx_dt: function(x) {
		return [-this.config.beta*x[0]*x[1], this.config.beta*x[0]*x[1] - this.config.gamma*x[1], this.config.gamma*x[1]];
	},

	// TODO use numeric package to solve ODE
	solve: function() {
		console.log('test')
		var t = 0;
		var x = [this.config.N - 1, 1, 0];

		var x_old, fx;

		var output = [{t:t, S:x[0], I:x[1], R:x[2]}];

		while(t < this.config.T) {
			t = t + this.config.delta;
			x_old = x;
			fx = this.dx_dt(x_old);
			x = [];
			for(var i = 0; i < x_old.length; i++) {
				x.push(x_old[i] + this.config.delta*fx[i]);
			}
			output.push({t:t, S:x[0], I:x[1], R:x[2]});
		}

		return output;

	},
}

module.exports = sirModel;