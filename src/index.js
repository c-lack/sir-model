var odex = require('odex')

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

	dx_dt: function(beta, gamma) {
		return function(t,x) {
			return [
				-beta*x[0]*x[1],
				beta*x[0]*x[1] - gamma*x[1],
				gamma*x[1]
			];
		}
	},

	// TODO use numeric package to solve ODE
	solve: function() {
		var s = new odex.Solver(3);

		output = [];

		s.solve(this.dx_dt(this.beta,this.gamma), 0, [this.N-1,1,0], this.T);
		return s
	},
}

module.exports = sirModel;