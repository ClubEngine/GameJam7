var Person = function (name) {
	// constructor

	// set attribute
	this.name = name;
}

Person.prototype = {
	methodHello: function () {
		// method 1
	},

	methodBye: function () {
		// method 2
	}
}