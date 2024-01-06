var resultBox = document.getElementById("result");
var lastInsertionChar = "";
var invMode = false;
var previousResultValues = [];

const PI = Math.PI;
const e = Math.E;


function isCharNumber(c) {
	return (c >= '0' && c <= '9');
}

function unzeroResultBox() {
	if (resultBox.value == "0") {
		resultBox.value = "";
	}
}


// Simple functions
function abs(num) {
	return Math.abs(num);
}

function round(num) {
	return Math.round(num);
}

function ceil(num) {
	return Math.ceil(num);
}

function floor(num) {
	return Math.floor(num);
}

// Lanczos method
function gamma(n) {
	var g = 7, // g represents the precision desired, p is the values of p[i] to plug into Lanczos' formula
		  p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
		  
	if( n < 0.5) {
		return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
	} else {
		n--;
		var x = p[0];
		for(var i = 1; i < g + 2; i++) {
			x += p[i] / (n + i);
		}
		var t = n + g + 0.5;
		return Math.sqrt(2 * Math.PI) * Math.pow(t, (n + 0.5)) * Math.exp(-t) * x;
	}
}

function factorial(n) {
	if (Math.round(n) != n) {
		return;
	}	
	return gamma(n + 1).toFixed(1);
}


function nroot(x, y) {
	return x**(1/y);
}


// trig functions

function sin(x) {
	return Math.sin(x).toFixed(15);
}

function cos(x) {
	return Math.cos(x).toFixed(15);
}

function tan(x) {
	return Math.tan(x).toFixed(15);
}

function csc(x) {
	return 1/sin(x);
}

function sec(x) {
	return 1/cos(x);
}

function cot(x) {
	return 1/tan(x);
}

// hyperbolic
function sinh(x) {
	return Math.sinh(x).toFixed(15);
}

function cosh(x) {
	return Math.cosh(x).toFixed(15);
}

function tanh(x) {
	return Math.tanh(x).toFixed(15);
}

function csch(x) {
	return 1/sinh(x);
}

function sech(x) {
	return 1/cosh(x);
}

function coth(x) {
	return 1/tanh(x);
}

// inverse trig functions
function asin(x) {
	return Math.asin(x).toFixed(15);
}

function acos(x) {
	return Math.acos(x).toFixed(15);
}

function atan(x) {
	return Math.atan(x).toFixed(15);
}

function acsc(x) {
	return asin(1/x);
}

function asec(x) {
	return acos(1/x);
}

function acot(x) {
	return atan(1/x);
}

// inverse hyperbolic
function asinh(x) {
	return (ln(x + Math.sqrt(x**2 + 1))).toFixed(15);
}

function acosh(x) {
	return (ln(x + Math.sqrt(x**2 - 1))).toFixed(15);
}

function atanh(x) {
	return (0.5 * ln((1+x)/(1-x))).toFixed(15);
}

function acsch(x) {
	return (ln(1/x + Math.sqrt(1/x**2 + 1))).toFixed(15);
}

function asech(x) {
	return (ln(1/x + Math.sqrt(1/x**2 - 1))).toFixed(15);
}

function acoth(x) {
	return (0.5 * ln((x+1)/(x-1))).toFixed(15);
}


// log functions
function ln(x) {
	return Math.log(x);
}

function log(x, y) {
	return ln(x) / ln(y)
}


// combinatorics functions
function nPr(n, r) {
	return factorial(n) / factorial(n-r);
}

function nCr(n, r) {
	return factorial(n) / (factorial(r) * factorial(n-r));
}



// Control functions --->

function undoResult() {
	if (previousResultValues.length < 2) return;
	previousResultValues = previousResultValues.slice(0, -1);
	resultBox.value = previousResultValues[previousResultValues.length - 1];
}


function addOperandNumber(dig) {
	if (resultBox.value == "0") {
		resultBox.value = dig;
	} else {
		resultBox.value += dig;
	}
	lastInsertionChar = dig;
}

function addDecimal() {
	if (isCharNumber(lastInsertionChar)) {
		resultBox.value += ".";
		lastInsertionChar = ".";
	}
}

function addEqualSign() {
	if (!resultBox.value.includes("=") && (isCharNumber(lastInsertionChar) || lastInsertionChar=='x')) {
		resultBox.value += "=";
		lastInsertionChar = "=";
	}
}


function negate() {
	if (resultBox.value.includes("-")) {
		resultBox.value = resultBox.value.slice(1, resultBox.length);
	} else {
		if (resultBox.value != "0") {
			resultBox.value = "-" + resultBox.value;
		}
	}
}

function formatDeletion(type) {
	if (type == "C") {
		resultBox.value = "0";
	} else if (type == "CE") {
		if (resultBox.value.length > 1) {
			resultBox.value = resultBox.value.slice(0, -1);
		} else {
			resultBox.value = "0";
		}
	}
}

arith_operators = ["+", "-", "*", "/", "%"];

function addOperator(operator) {
	if (arith_operators.includes(lastInsertionChar)) {
		resultBox.value[resultBox.value.length-1] = operator;
	} else if (lastInsertionChar == ".") {
		resultBox.value += "0" + operator;
	} else {
		resultBox.value += operator;
	}
	lastInsertionChar = operator;
}


function switchInvMode() {
	var trigBtns = document.getElementsByClassName("trig-btn");
	invMode = !invMode;
	
	if (invMode) {
		for (let btn of trigBtns) {
			btn.value += "⁻¹";
		}
	} else {
		for (let btn of trigBtns) {
			btn.value = btn.value.slice(0, -2);
		}
	}
}


function simpleFunc(f) {
	unzeroResultBox();
	
	switch(f) {
		case 'a':
			resultBox.value += "abs(";
			lastInsertionChar = "abs(";
			break;
		case 'r':
			resultBox.value += "round(";
			lastInsertionChar = "round(";
			break;
		case 'c':
			resultBox.value += "ceil(";
			lastInsertionChar = "ceil(";
			break;
		case 'f':
			resultBox.value += "floor(";
			lastInsertionChar = "floor(";
			break;
		case 'g':
			resultBox.value += "gamma(";
			lastInsertionChar = "gamma(";
			break;
		case 't':
			resultBox.value += "nroot(";
			lastInsertionChar = "nroot(";
			break;
	}
}

function trigFunc(f) {
	unzeroResultBox();
	
	switch(f) {
		case 'sin':
			if (invMode) {
				resultBox.value += "asin(";
				lastInsertionChar = "asin(";
			} else {
				resultBox.value += "sin(";
				lastInsertionChar = "sin(";
			}
			break;
		case 'cos':
			if (invMode) {
				resultBox.value += "acos(";
				lastInsertionChar = "acos(";
			} else {
				resultBox.value += "cos(";
				lastInsertionChar = "cos(";
			}
			break;
		case 'tan':
			if (invMode) {
				resultBox.value += "atan(";
				lastInsertionChar = "atan(";
			} else {
				resultBox.value += "tan(";
				lastInsertionChar = "tan(";
			}
			break;
		case 'csc':
			if (invMode) {
				resultBox.value += "acsc(";
				lastInsertionChar = "acsc(";
			} else {
				resultBox.value += "csc(";
				lastInsertionChar = "csc(";
			}
			break;
		case 'sec':
			if (invMode) {
				resultBox.value += "asec(";
				lastInsertionChar = "asec(";
			} else {
				resultBox.value += "sec(";
				lastInsertionChar = "sec(";
			}
			break;
		case 'cot':
			if (invMode) {
				resultBox.value += "acot(";
				lastInsertionChar = "acot(";
			} else {
				resultBox.value += "cot(";
				lastInsertionChar = "cot(";
			}
			break;
			
		case 'sinh':
			if (invMode) {
				resultBox.value += "asinh(";
				lastInsertionChar = "asinh(";
			} else {
				resultBox.value += "sinh(";
				lastInsertionChar = "sinh(";
			}
			break;
		case 'cosh':
			if (invMode) {
				resultBox.value += "acosh(";
				lastInsertionChar = "acosh(";
			} else {
				resultBox.value += "cosh(";
				lastInsertionChar = "cosh(";
			}
			break;
		case 'tanh':
			if (invMode) {
				resultBox.value += "atanh(";
				lastInsertionChar = "atanh(";
			} else {
				resultBox.value += "tanh(";
				lastInsertionChar = "tanh(";
			}
			break;
		case 'csch':
			if (invMode) {
				resultBox.value += "acsch(";
				lastInsertionChar = "acsch(";
			} else {
				resultBox.value += "csch(";
				lastInsertionChar = "csch(";
			}
			break;
		case 'sech':
			if (invMode) {
				resultBox.value += "asech(";
				lastInsertionChar = "asech(";
			} else {
				resultBox.value += "sech(";
				lastInsertionChar = "sech(";
			}
			break;
		case 'coth':
			if (invMode) {
				resultBox.value += "acoth(";
				lastInsertionChar = "acoth(";
			} else {
				resultBox.value += "coth(";
				lastInsertionChar = "coth(";
			}
			break;
	}
}

function logFunc(f) {
	unzeroResultBox();
	
	switch(f) {
		case 'ln':
			resultBox.value += "ln(";
			lastInsertionChar = "ln(";
			break;
		case 'logy':
			resultBox.value += "log(";
			lastInsertionChar = "log(";
			break;
	}
}

function combinatoricsFunc(f) {
	unzeroResultBox();
	
	switch(f) {
		case 'P':
			resultBox.value += "nPr(";
			lastInsertionChar = "nPr(";
			break;
		case 'C':
			resultBox.value += "nCr(";
			lastInsertionChar = "nCr(";
			break;
	}
}



function evaluateResult() {
	previousResultValues.push(resultBox.value);
	resultBox.value = eval(resultBox.value);
	previousResultValues.push(resultBox.value);
}

function solveEquation() {
	previousResultValues.push(resultBox.value);
	
	var sol = nerdamer
		.solveEquations(resultBox.value)
		.map(solution => nerdamer(solution).evaluate().text())
	
	if (sol.length < 2) {
		sol.forEach(function(e) {
			resultBox.value = "x=" + e;
		});
	} else {
		resultBox.value = "x=" + sol;
	}
	
	previousResultValues.push(resultBox.value);
}


function graphExpression() {
	document.getElementById("calculator").style.display = "none";
	document.getElementById("graph-return").style.display = "block";
	
	var ctx = document.getElementById("graph");
	ctx.style.display = "block";
	
	var label_ticks = [];
	
	for (var i = -20; i <= 20; i++) {
		label_ticks.push(i);
	}
	
    const generatedFunction = math.compile(resultBox.value.replaceAll("**", "^"));

	var data = {
		labels: label_ticks,
		datasets: [{
			label: "f(x) = " + resultBox.value,
			function: function(x) { return generatedFunction.evaluate({ x: x }); },
			borderColor: "rgba(75, 192, 192, 1)",
			data: [],
			fill: false
		}]
	};
	Chart.pluginService.register({
		beforeInit: function(chart) {
			var data = chart.config.data;
			for (var i = 0; i < data.datasets.length; i++) {
				for (var j = 0; j < data.labels.length; j++) {
				   var fct = data.datasets[i].function,
					   x = data.labels[j],
					   y = fct(x);
					data.datasets[i].data.push(y);
				}
			}
		}
	});
	var myLineChart = new Chart(ctx, {
		type: 'line',
		data: data,
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});
}


function graphSolution() {
	document.getElementById("calculator").style.display = "none";
	document.getElementById("graph-return").style.display = "block";
	
	var ctx = document.getElementById("graph");
	ctx.style.display = "block";
	
	var label_ticks = [];
	
	for (var i = -20; i <= 20; i++) {
		label_ticks.push(i);
	}
	
	var hsSet = resultBox.value
				.replaceAll("**", "^")
				.split("=");
	
    const generatedFunctionLHS = math.compile(hsSet[0]);
    const generatedFunctionRHS = math.compile(hsSet[1]);
    

	var data = {
		labels: label_ticks,
		datasets: [{
			label: "f(x) = " + hsSet[0],
			function: function(x) { return generatedFunctionLHS.evaluate({ x: x }); },
			borderColor: "rgba(75, 192, 192, 1)",
			data: [],
			fill: false
		},
		{
			label: "f(x) = " + hsSet[1],
			function: function(x) { return generatedFunctionRHS.evaluate({ x: x }); },
			borderColor: "rgba(192, 75, 75, 1)",
			data: [],
			fill: false
		}]
	};
	Chart.pluginService.register({
		beforeInit: function(chart) {
			var data = chart.config.data;
			for (var i = 0; i < data.datasets.length; i++) {
				for (var j = 0; j < data.labels.length; j++) {
				   var fct = data.datasets[i].function,
					   x = data.labels[j],
					   y = fct(x);
					data.datasets[i].data.push(y);
				}
			}
		}
	});
	var myLineChart = new Chart(ctx, {
		type: 'line',
		data: data,
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});
}


function revertGraph() {
	document.getElementById("calculator").style.display = "initial";
	document.getElementById("graph").style.display = "none";
	document.getElementById("graph-return").style.display = "none";
}
