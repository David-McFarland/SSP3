var canvas = document.getElementById('myCanvas');
ctx = canvas.getContext('2d');

angle = 0.0
ctx.fillStyle = "rgb(255, 0, 0)";
points = []
circles = []
for(let i = 0; i<20; i++){
	circles.push([Math.round(Math.random()*60), 2*Math.PI*(Math.random())]);
}

let i = math.complex(0, 1);

function update(){

	requestAnimationFrame(update);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//console.log(canvas.width)
	//ctx.stroke();
	let point = drawCircle(400, 400, 100, 5*Math.PI/4 + angle, ctx)
	
	let mult = 1
	for(let i = 0; i<circles.length; i++){
		if(i % 2 == 0){
			point = drawCircle(point[0], point[1], circles[i][0], mult*angle + circles[i][1], ctx)
		}
		else{
			point = drawCircle(point[0], point[1], circles[i][0], -mult*angle + circles[i][1], ctx)
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

function leastSquares(matrix, input){
	//IF N is greater than points we don't need this.
	return math.multiply(math.multiply(math.inv(math.multiply(math.ctranspose(matrix), matrix)), math.ctranspose(matrix)), input)
}

/*
	math.matrix([
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9]
	]);
*/




function buildMatrix(N, points){
	//Row = size n use for loop

	//Column size points
	let matrix = [];
	for( let i = 0; i<points.length; i++){
		matrix.push([])
		for(let j = 0; j<N; j++){
			let point = math.complex(points[i][0], points[i][1]);
			let num = (1/N)*
			matrix[i].push()
		}
	}

	(1/N)
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

//ctx.fillStyle = "rgb(255, 0, 0)";
//ctx.fillRect(0,0,300,300);