
var step = 1; // visible frame
var targetStep = 1; // frame to animate to
var images = new Array; // stores all of the frames for quick access
var totalFrames = 99; // the number of images in the sequence of JPEG files (this could be calculated server-side by scanning the frames folder)

window.requestAnimFrame = (function(){ // reduce CPU consumption, improve performance and make this possible
  return  window.requestAnimationFrame       || 
		  window.webkitRequestAnimationFrame || 
		  window.mozRequestAnimationFrame    || 
		  window.oRequestAnimationFrame      || 
		  window.msRequestAnimationFrame     || 
		  function( callback ){
			window.setTimeout(callback, 1000 / 60);
		  };
})();

(function animloop(){ // the smoothest animation loop possible
  requestAnimFrame(animloop);
	// targetStep = Math.max( Math.round( getYOffset() / 30 ) , 1 ); // what frame to animate to
	targetStep = getTargetFrame();
	// console.log(targetStep);
  if(targetStep != step ) { step += (targetStep - step) / 5; } // increment the step until we arrive at the target step
  changeFrame();
})();

function changeFrame() {
	var thisStep = Math.round(step); // calculate the frame number
	if(images.length > 0 && images[thisStep]) { // if the image exists in the array
		if(images[thisStep].complete) { // if the image is downloaded and ready
			if($('#video').attr('src') != images[thisStep].src) { // save overhead...?
				$('#video').attr('src',images[thisStep].src); // change the source of our placeholder image
			}
		}
	}
}

function getYOffset() { // get distance scrolled from the top
    var pageY;
	if(typeof(window.pageYOffset)=='number') {
		pageY=window.pageYOffset;
	}else{
		pageY=document.documentElement.scrollTop; // IE
	}
	// console.log(pageY);
	return pageY;
}

function getTargetFrame() {
	var slider = document.getElementById('range-slider');

	targetPercent = slider.value / slider.max;
	targetFrame = Math.max( Math.round(targetPercent * totalFrames) , 1 );

	return targetFrame;
}

function pad(number, length) { // pad numbers with leading zeros for JPEG sequence file names
	var str = '' + number; while (str.length < length) { str = '0' + str; } return str;
}
