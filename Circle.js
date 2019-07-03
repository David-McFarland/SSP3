var canvas = document.getElementById('myCanvas');
ctx = canvas.getContext('2d');

angle = 0.0
ctx.fillStyle = "rgb(255, 0, 0)";
points = []
/*
circles = []
for(let i = 0; i<20; i++){
	circles.push([Math.round(Math.random()*60), 2*Math.PI*(Math.random())]);
}
*/



function leastSquares(matrix, input){
	//IF N is greater than points we don't need this.
	return math.multiply(math.multiply(math.inv(math.multiply(math.ctranspose(matrix), matrix)), math.ctranspose(matrix)), input)
}

let test = math.matrix([
	[1, 1],
	[1, 2],
	[1, 3]
	]);

let test2 = math.matrix([2, 5, 8]);

console.log(testSquares(test, test2));
console.log("HI");
function testSquares(matrix, input){
	return math.multiply(math.multiply(math.inv(math.multiply(math.transpose(matrix), matrix)), math.transpose(matrix)), input)	
}
/*
	math.matrix([
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9]
	]);
*/


function getCircles(complexArr){
	console.log(complexArr)
	let arr = [];
	for(let i = 0; i<complexArr.length; i++){
		let complex = complexArr[i];
		let radius = math.sqrt(complex.re*complex.re + complex.im*complex.im);
		let theta = math.log(math.divide(complex, radius)).im;
		arr.push(math.complex(math.round(radius), theta));
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
			let expon = math.exp(math.complex(0, 2*math.PI * i * j / P));
			//matrix[i].push(math.multiply(point, expon));
			matrix[i].push(expon);
			
		}
	}
	console.log(matrix);

	return matrix;
}



function drawCircle(x, y, r, angle, ctx){
	
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
	
	return [r*Math.cos(angle) + x, r*Math.sin(angle) + y]
}



let p = [
		math.complex(500, 100),
		math.complex(700, 300),
		math.complex(500, 500),
		math.complex(300, 300),
		math.complex(500, 100)
		];

function drawPoints(ctx, p){
	for(let i = 0; i<p.length; i++){
	let x = p[i].re;
	let y = p[i].im;
	ctx.beginPath();
	ctx.arc(x, y, 4, 0, Math.PI*2);
	ctx.fill();
	ctx.closePath();
	ctx.font = "30px Arial";
	ctx.fillText(i, x+5, y+5);
	}
}


let m = buildMatrix(4, p);
let circles = getCircles(leastSquares(m, p));
console.log(circles)

function getPoints(N, points){

	let matrix = [];
	let P = points.length;
	for( let i = 0; i<P; i++){
		matrix.push([])
		//let point = math.complex(points[i].re, points[i].im);
		for(let j = 0; j<N; j++){
			
			let expon = math.exp(math.complex(0, 2*math.PI * i * j / N))
			matrix[i].push(math.multiply((1/N), expon))
			
		}
	}
	return math.multiply(matrix, points);
}

console.log(getPoints(4, circles));

function update(){

	requestAnimationFrame(update);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawPoints(ctx, p);

	//console.log(canvas.width)
	//ctx.stroke();
	let point = drawCircle(0, 0, circles[0].re, circles[0].im, ctx)
	
	let mult = 1
	console.log(circles[0][0])
	for(let i = 1; i<circles.length; i++){
		if(i % 2 == 0){
			point = drawCircle(point[0], point[1], circles[i].re, mult*angle + circles[i].im, ctx)
		}
		else{
			point = drawCircle(point[0], point[1], circles[i].re, -mult*angle + circles[i].im, ctx)
			mult++;
		}
	}
	points.push(point);
	angle += 0.004;

	ctx.beginPath()
	//ctx.moveTo(430, 150);
	for( let i = 0; i<points.length; i++){
		ctx.lineTo(points[i][0], points[i][1]);
	}
	ctx.stroke();
	ctx.closePath();
    //console.log("ahhh")
    //setTimeout(update(), 500);
}

//setInterval(update(), 500);
update();