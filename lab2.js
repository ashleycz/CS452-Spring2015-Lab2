//Christian Ashley, 2/17/2015, 2D WASD controlled complex colored shape
var gl;
var trans = [0,0];
var transLoc;

var vertexColorBuffer;

window.onload = function init()
{
	var canvas = document.getElementById( "gl-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if ( !gl ) { alert( "WebGL isn't available" ); }
	//
	// Configure WebGL
	//
	gl.viewport( 0, 0, canvas.width, canvas.height );


	// Load shaders and initialize attribute buffers
	program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );
	gl.program = program;

	var n = initVertexBuffer(gl)
	if(n<0){
		alert("Failed to set vertex information.")
		return;
	}
	
	transLoc = gl.getUniformLocation( gl.program, "translate");
	
	document.onkeydown = function(e){
		//console.log(String.fromCharCode(e.keyCode));
			switch(String.fromCharCode(e.keyCode)){
				case "W":
					trans[1] += 0.1;
				break;
				case "A":
					trans[0] -= 0.1;
				break;
				case "S":
					trans[1] -= 0.1;
				break;
				case "D":
					trans[0] += 0.1;
				break;
				case "1":
					trans = [0,0];
				break;
			}
			render(n);
		//+console.log(trans);
		
	}
	gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
	render(n);
};
function render(n) {	
	gl.clear( gl.COLOR_BUFFER_BIT );
	
	gl.uniform2fv(transLoc, trans);
	
	gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
	
	//setTimeout(function(){
	//	requestAnimFrame(render);
	//	},100);
}

function initVertexBuffer(gl){
	var verticesColor = new Float32Array([
		//vertex coord (1st two) and color (last 3)
		//Working multicolor triangle
		//0.0, 0.5, 1.0, 0.0, 0.0,
		//-0.5, -0.5, 0.0, 1.0, 0.0,
		//0.5, -0.5, 0.0, 0.0, 1.0
		0.05, 0.0, 1.0, 0.0, 0.0,
		0.25,0.0, 1.0, 1.0, 0.0,
		0.5, 0.25, 1.0, 0.0, 1.0,
		0.25, 0.5, 0.0, 1.0,0.0,
		-0.25,0.5, 0.0, 1.0,1.0,
		-0.5, 0.25, 1.0, 0.0, 1.0,
		-0.25,0.0, 1.0, 1.0,1.0,
		-0.05, 0.0, 0.7, 0.9, 0.3,
		-0.05, -0.5, 0.7, 0.9, 0.3,
		0.05, -0.5, 0.7, 0.9, 0.3,
	]);
	
	var n=verticesColor.length/5;
	//console.log(n);
	
	vertexColorBuffer = gl.createBuffer();
	if(!vertexColorBuffer){
		alert("Failed to make vertex Color Buffer object.");
		return false;
	}
	
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexColorBuffer);
	gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesColor), gl.STATIC_DRAW);
	
	var FSIZE = verticesColor.BYTES_PER_ELEMENT;
	
	var a_position = gl.getAttribLocation( gl.program, "aPosition");
	if(a_position < 0){
		alert("Failed to get a_position from program");
		return -1;
	}
	gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, FSIZE*5, 0);
	gl.enableVertexAttribArray(a_position);
	
	var a_color = gl.getAttribLocation( gl.program, "aColor");
	if(a_color < 0){
	alert("Failed to get a_color from program");
	return -1;
	}
	
	gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, FSIZE*5, FSIZE*2);
	gl.enableVertexAttribArray(a_color);
	
	//gl.bindBuffer( gl.ARRAY_BUFFER, null);
	
	return n;
}

