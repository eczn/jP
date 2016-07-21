/* 
 * jP is a kind of player plugins based on canvas and web audio API 
 * 
 * usage : 1,add canvas tag named jP in .html 
 *         2,and add code:'jP.init()' after <body> to use this script 
 *         3,if sucess... you can see a simply player display... 
 *
 *         ** jP is bind to the audio and canvas html element (id is "jPA" and "jPC")
 *
 *         ** jPen has some function to draw. it needs some para 
 * 
 */ 



var jP = (function(){
	var domAudio = window.document.getElementById("jPA");
	var domCanvas = window.document.getElementById("jPC");

	// dis init
	domCanvas.width =  parseInt(window.innerWidth);
	domCanvas.height = parseInt(window.innerHeight);

	return {
		// DOM 
		domAudio: domAudio,
		domCanvas: domCanvas,

		// Audio Play init : 
		initAudio: (function(){
            var AudioContext = AudioContext||webkitAudioContext||safariAudioContext;	 //web audio API 
			var context = new AudioContext(); // new a context for dom controling 
			
			var source = context.createMediaElementSource( domAudio );
			var analyser = context.createAnalyser();

			source.connect(analyser); 
			analyser.connect(context.destination); 

			var length = analyser.frequencyBinCount*44100/context.sampleRate|0;
			var output = new Uint8Array(length); 

			return {
				AudioContext: AudioContext,
				context: context,
				source: source,
				analyser: analyser,
				length: length,
				output: output
			}
		})(),
	}
})(); 


var jPen = (function(){
	function line(g,width,height,output){
		g.beginPath();

		var imgTemp = g.getImageData(0,0,width,height); 

		for(var i=0; i<imgTemp.data.length ; i+=4 ){
			imgTemp.data[i+3] /= 1.6;
		}
		g.putImageData(imgTemp,0,0);

		g.lineWidth = 2; 
		g.moveTo(0,height/2);

		var i=0,f=0; 
		for(i=0;i<width;i+=8){
			g.lineTo(f,(output[i])+(height/2-127)); 
			f = f + width/output.length * 8;
		}
		g.stroke();

		setTimeout(function(){
			jP.initAudio.analyser.getByteTimeDomainData(jP.initAudio.output);
			line(jP.domCanvas.getContext("2d"),
				 jP.domCanvas.width,
				 jP.domCanvas.height,
				 jP.initAudio.output);
		},40);		
	}

	function circleS(g,width,height,output){
		var avg = 0,i; 
		jP.initAudio.analyser.getByteFrequencyData(jP.initAudio.output);
		for(i=0;i<100;i+=10){
			avg += output[i]; 
		}
		avg /= 10;

		g.beginPath();
		g.fillStyle = 'rgba(255,255,255,0.6)';
		g.fillRect(0,0,width,height);
		g.fillStyle = 'rgba(0,0,0,0.90)';
		g.lineWidth = 2; 
		g.moveTo(0,height/2);

		g.arc(width/2,height/2,  Math.abs((avg-100)*1.5)  ,0,6.29,false);

		g.fill();//画实心圆
		g.closePath();

		window.requestAnimationFrame(function(){
			circleS(g,width,height,output);
		}); 
	}

	function circleM(g,width,height,output){
		var avg = 0,i; 

		g.beginPath();
		g.fillStyle = 'rgba(0,0,0,0)';
		g.fillRect(0,0,width,height); 
		g.closePath();

		jP.initAudio.analyser.getByteFrequencyData(jP.initAudio.output);
		for(i=0;i<100;i+=10){
			g.beginPath();
			//console.log(output[i]);
	
			g.fillStyle = 'rgba(255,255,255,0.6)';

			g.fillStyle = 'rgba(0,0,0,0.90)';
			g.lineWidth = 2; 
			
			g.arc(width*Math.random(),height*Math.random(), output[i]/10 ,0,6.29,false);

			g.fill();//画实心圆


			g.closePath();


			avg += output[i];
		}
		 
	
		// g.beginPath();
		// g.fillStyle = 'rgba(255,255,255,0.6)';
		// g.fillRect(0,0,width,height);
		// g.closePath();

		var vi =  (avg+0.1)/200 + 0.2; 
	//	_drawCir(g,Math.random()*width,Math.random()*height,Math.abs((avg-100)*1.5)/3,0,vi);

		 
		window.requestAnimationFrame(function(){
			circleM(g,width,height,output); 
		});
		
	}

	function _drawCir(g,cX,cY,r,i,vi){
		// g = jP.domCanvas.getContext("2d");
		g.beginPath();

		g.fillStyle = 'rgba(0,0,0,0.9)';
		g.lineWidth = 2; 
		

		g.fill();//画实心圆
		g.closePath();

		g.beginPath();
		g.fillStyle = 'rgba(255,255,255,0.6)';

		g.fillStyle = 'rgba(0,0,0,0.90)';
		g.lineWidth = 2; 
		

		g.arc(cX,cY, i ,0,6.29,false);

		g.fill();//画实心圆
		g.closePath();




		if (r<i){
			return;
		} else {
			window.requestAnimationFrame(function(){
				_drawCir(g,cX,cY,r,i+vi,vi);
			}); 
		}
	}

	return {
		line: line,
		circleS: circleS,
		circleM: circleM

	}
})();

