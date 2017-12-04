var numeric = require('numeric')

/*
This is an example library for defining a simple SIR model, with the ability to set parameters, 
and uses the numeric.js package to solve the ODE with a Dormand-Prince-Runge-Kutta integrator with
adaptive time stepping. */

var sirModel = {

	/*
	The following objects are the initial configuration variables. They will change as the user adjusts the simulation.
	*/

	config: {
		N: 100,
		I0: 1,
		beta: 0.06,
		gamma: 1,
		T: 10,
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

	set_N: function(N) {
		this.config.N = N;
	},

	set_T: function(T) {
		this.config.T = T;
	},

	set_I0: function(I0) {
		this.config.I0 = I0;
	},

	dx_dt: function(beta, gamma) {
		return function(t,x) {
			var out = [
				-beta*x[0]*x[1],
				beta*x[0]*x[1] - gamma*x[1],
				gamma*x[1]
			];
			return out;
		}
	},

	// TODO use numeric package to solve ODE
	solve: function() {
		sol = numeric.dopri(0,this.config.T,[this.config.N - this.config.I0, this.config.I0, 0],this.dx_dt(this.config.beta,this.config.gamma));
		return {t: sol.x, x: sol.y};
	},
}

module.exports = sirModel;