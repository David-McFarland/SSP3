var canvas = document.getElementById('myCanvas');
ctx = canvas.getContext('2d');

canvas.addEventListener("mousemove", function (e) {
    findxy('move', e)
}, false);
canvas.addEventListener("mousedown", function (e) {
    findxy('down', e)
}, false);
canvas.addEventListener("mouseup", function (e) {
    findxy('up', e)
}, false);
canvas.addEventListener("mouseout", function (e) {
    findxy('out', e)
}, false);

let m;

document.addEventListener('keydown', function (e) {
	if(e.key == "ArrowLeft"){
		document.getElementById('slider').value--;
		slide(document.getElementById('slider'))
	}
	else if(e.key == "ArrowRight"){
		document.getElementById('slider').value++;
		slide(document.getElementById('slider'))
	}
});

ctx.fillStyle = "rgb(255, 0, 0)";


let circles;

let drawing = false;
let path = [];
let letsGo = false;
let angle = 0.0
let points = []
let see = true;
let showDrawing = true;


//let allCircles = [];

let numPoints = 30;
let numCircles = 100;
function findxy(type, e){
	let rect = canvas.getBoundingClientRect();
	let x = e.clientX - rect.left;
	let y = e.clientY - rect.top;
	if(!letsGo){

		if(drawing == true && (type == 'up' || type == 'out')){
			//console.log(e);
			drawing = false;
			path.push(math.complex(path[0].re, path[0].im))
			if(numPoints > path.length){
				numPoints = path.length;
			}
			m = buildMatrix(numCircles, path);
			circles = getCircles(leastSquares(m, path));
			document.getElementById('slider').max = numCircles;

			letsGo = true;
		}
		else if(type == 'down'){
			drawing = true;
			path.push(math.complex(x, y))
		}
		else if(type == 'move' && drawing == true){
			let temp = path.pop();
			path.push(temp);
			if(temp != math.complex(x, y)){
				path.push(math.complex(x, y))
			}
		}	
	}
	
}

document.getElementById('hideCircles').onclick = function(){hideCircles(this)};
document.getElementById('hideOriginal').onclick = function(){hideOriginal(this)};
document.getElementById('clear').onclick = function(){clear()};
document.getElementById('slider').oninput = function(){slide(this)};

/*
function hide(button) {
   console.log(button);
}​
*/
function hideCircles(button){
	//IF N is greater than points we don't need this.
	if(button.innerHTML == "Hide Circles"){
		button.innerHTML = "Show Circles"
		see = false;
	}
	else{
		button.innerHTML = "Hide Circles"
		see = true;
	}
}

function hideOriginal(button){
	//IF N is greater than points we don't need this.
	if(button.innerHTML == "Hide Your Drawing"){
		button.innerHTML = "Show Your Drawing"
		showDrawing = false;
	}
	else{
		button.innerHTML = "Hide Your Drawing"
		showDrawing = true;
	}
}

function clear(){
	path = [];
	allCircles = [];
	circles = null;
	letsGo = false;
	points = [];
	document.getElementById('hideOriginal').innerHTML = "Hide Your Drawing"
	showDrawing = true;
}


function slide(slider){
	document.getElementById('header').innerHTML = "Draw Something " + "(N = " + slider.value + ")";
	points = [];
	numCircles = slider.value;
}


function leastSquares(matrix, input){
	//IF N is greater than points we don't need this.
	return math.multiply(math.multiply(math.inv(math.multiply(math.ctranspose(matrix), matrix)), math.ctranspose(matrix)), input)
}

function getCircles(complexArr){
	let arr = [];
	for(let i = 0; i<complexArr.length; i++){
		let complex = complexArr[i];
		let radius = math.sqrt(complex.re*complex.re + complex.im*complex.im);
		let theta = math.log(math.divide(complex, radius)).im;
		arr.push(math.complex(radius, theta));
	}
	return arr;
}

function buildMatrix(N, points){
	let matrix = [];
	let P = points.length;
	for( let i = 0; i<P; i++){
		matrix.push([])
		//let point = math.complex(points[i].re, points[i].im);
		for(let j = 0; j<N; j++){
			
			//Inverse
			//let expon = math.exp(math.complex(0, 2*math.PI * i * j / N))
			//matrix[i].push(math.multiply((1/N), expon))
			//let expon = math.exp(math.complex(0, -2*math.PI * i * j / P))
			//matrix[i].push(math.multiply((1/P), expon))

			//Normal
			/*
			let expon = math.exp(math.complex(0, 2*math.PI * (i) * (j / (P-1))));
			//matrix[i].push(math.multiply(point, expon));
			matrix[i].push(expon);
			*/
			if(j == 0){
				let expon = math.exp(math.complex(0, 0));
				matrix[i].push(expon);
			}
			else if( j % 2 == 1){
				let expon = math.exp(math.complex(0, 2*math.PI * (i) * Math.round(j/2) / (P)));
				matrix[i].push(expon);	
			}
			else{
				let expon = math.exp(math.complex(0, -2*math.PI * (i) * Math.round(j/2) / (P)));
				matrix[i].push(expon);
			}
			
		}
	}
	return matrix;
}

function drawCircle(x, y, r, angle, ctx){
	if(see){
		ctx.beginPath();
		ctx.arc(x, y, r, 0, Math.PI*2);
		ctx.stroke();
		ctx.closePath();

		

		
		ctx.moveTo(x, y);
		ctx.lineTo(r*Math.cos(angle) + x, r*Math.sin(angle) + y);
		ctx.stroke();

		
		ctx.beginPath();
		ctx.arc(r*Math.cos(angle) + x, r*Math.sin(angle) + y, 4, 0, Math.PI*2);
		ctx.fill();
		ctx.closePath();

	}
	
	return [r*Math.cos(angle) + x, r*Math.sin(angle) + y]
}



let moveX = 350;
let moveY = 280;

let p = [
		math.complex(500 + moveX, 100 + moveY),
		math.complex(700 + moveX, 300 + moveY),
		math.complex(500 + moveX, 500 + moveY),
		math.complex(500 + moveX, 450 + moveY),
		math.complex(300 + moveX, 300 + moveY),
		math.complex(500 + moveX, 100 + moveY)
		];

function drawPoints(ctx, p){
	for(let i = 0; i<p.length; i++){
		let x = p[i].re;
		let y = p[i].im;
		ctx.beginPath();
		ctx.arc(x, y, 4, 0, Math.PI*2);
		ctx.fill();
		ctx.closePath();
		ctx.font = "12px Arial";
		ctx.fillText(i, x+5, y+5);
	}
}



//let m2 = buildMatrix2(3, p);

//console.log(p)
//console.log(math.multiply(m2, p))
//console.log(math.multiply(m, math.multiply(m2, p)))
//console.log(leastSquares(m, p))
//console.log(math.multiply(leastSquares(m, p), m2))

//console.log("Matrix")
//console.log(m)

//let circles = getCircles(math.multiply(m2, p))

//console.log("Points");
//console.log(getPoints(5, circles));
//console.log(circles)



function getPoints(P, circles){

	pointss = []

	for(let j = 0; j<P; j++){
		let complex = math.complex(0, 0);
		for( let i = 0; i<circles.length; i++){
			let angle = 2 * math.PI * Math.round(i/2) * j / P;
			if(i % 2 == 0){
				angle *= -1;
			}
			//console.log(angle);
			let x = circles[i].re*math.cos(angle + circles[i].im)
			let y = circles[i].re*math.sin(angle + circles[i].im)
			complex = math.add(complex, math.complex(x, y))
			
		}
		pointss.push(complex);
		//console.log(complex)
	}
	return pointss;
}



function update(){

	requestAnimationFrame(update);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if(circles){
		//drawPoints(ctx, getPoints(numPoints, circles))	
	}
	//drawPoints(ctx, p);

	//console.log(canvas.width)
	//ctx.stroke();
	if(letsGo && circles){
		let point = drawCircle(0, 0, circles[0].re, circles[0].im, ctx)
	
		let mult = 1
		for(let i = 1; i<numCircles; i++){
			if(i % 2 == 0){
				point = drawCircle(point[0], point[1], circles[i].re, (-mult*angle + circles[i].im), ctx)
				mult++;
			}
			else{
				point = drawCircle(point[0], point[1], circles[i].re, (mult*angle + circles[i].im), ctx)
			}
		}
		if(points.length < math.pi/0.04 * 2 + 1){
			points.push(point);
		}
		angle += 0.04;

		ctx.beginPath()
		//ctx.moveTo(430, 150);
		for( let i = 0; i<points.length; i++){
			ctx.lineTo(points[i][0], points[i][1]);
		}
		ctx.strokeStyle = "red";
		ctx.stroke();
		ctx.strokeStyle = "black";
		ctx.closePath();

	}
	
	if(showDrawing){
		ctx.beginPath()
		for( let i = 0; i<path.length; i++){
			ctx.lineTo(path[i].re, path[i].im);
		}
		ctx.stroke();
		ctx.closePath();
	}
}

update();