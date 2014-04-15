/*
*******************************************************************************
*
*   app.js 
*
*******************************************************************************
*/	

// Drag and drop functionality based on http://www.html5rocks.com/en/tutorials/dnd/basics/
// Need to figure out how to not have dragged elements fall into the the abyss if drop does not happen but dragend does
$( document ).ready(function() {
	
	function handleDragStart(e) {
  		this.style.opacity = '0.4';  // this / e.target is the source node.
  		e.effectAllowed = 'move';
	}
	function handleDragOver(e) {
	  if (e.preventDefault) {
	    e.preventDefault(); // Necessary. Allows us to drop.
	  }
	
	  e.dropEffect = 'move';  // See the section on the DataTransfer object.
	
	  return false;
	}
	
	function handleDragEnter(e) {
	  // this / e.target is the current hover target.
	  this.classList.add('over');
	}
	
	function handleDragLeave(e) {
	  this.classList.remove('over');  // this / e.target is previous target element.
	}
	
	function handleDrop(e) {
  // this / e.target is current target element.

	  if (e.stopPropagation) {
	    e.stopPropagation(); // stops the browser from redirecting.
	  }
	
	  // See the section on the DataTransfer object.
	
	  return false;
	}
	
	function handleDragEnd(e) {
	  // this/e.target is the source node.
	
	  [].forEach.call(field, function (field) {
	    field.classList.remove('over');
	  });

	}
	
	var dragSrcEl = null;

	function handleDragStart(e) {
	  // Target (this) element is the source node.
	
	
	  	  e.effectAllowed = 'move';
		  e.dataTransfer.setData('text/plain', $(this).attr('id'));
		  e.dataTransfer.setData('coordx', $(this).position().left);
		  e.dataTransfer.setData('coordy', $(this).position().top);
		  e.dataTransfer.setData('width', $(this).outerWidth(true)); 
		  e.dataTransfer.setData('height', $(this).outerHeight(true)); 
		
		}

	
	function handleDrop(e) {
  // this/e.target is current target element.

	  if (e.stopPropagation) {
	    e.stopPropagation(); // Stops some browsers from redirecting.
	  }
	

	   
	    var fieldID = this.value=e.dataTransfer.getData('text/plain');
	    var startCoordX = parseFloat(e.dataTransfer.getData('coordx'));
		var startCoordY = parseFloat(e.dataTransfer.getData('coordy'));
		var endCoordX = parseFloat($(this).position().left);
		var endCoordY = parseFloat($(this).position().top);
		var boxWidth = parseFloat(e.dataTransfer.getData('width'));
		var boxHeight = parseFloat(e.dataTransfer.getData('height'));

	   
	    
	    
	    if ($('input', this).val().length == 0){
		    	$('input', this).val(fieldID);
		    	var currentInput = $('input', this);
		    	var line = paper.path("M " + 0 + " " + (startCoordY + (boxHeight/2)) + "l " + $('svg').outerWidth() + " " + (endCoordY - startCoordY));
		    	line.attr({'stroke-width':3, cursor : 'pointer', stroke: '#C3C3C3'});
		    	line.hover(function(){
		    		console.log(this);
		    		this.g = this.glow({color:'#c3c3c3'});
		    	},function(){
		    		this.g.remove();
		    		console.log(this);
		    	});
		  
		    	line.click(
		    		function(){
		    			this.g.remove();
		    			this.remove();
		    			
		    			console.log(this);
		    			currentInput.val("");
		    			
		    		}
		    	);
		    	//var startCircle = paper.circle(0, (startCoordY + (boxHeight/2)), 4);
		    	//var endCircle = paper.circle($('svg').outerWidth(), (endCoordY + (boxHeight/2)),4);
		    	//startCircle.attr({fill: '#c3c3c3', stroke: '#C3C3C3'});
		    	//endCircle.attr({fill: '#c3c3c3', stroke: '#C3C3C3'});
		    }
		else{
				var height = $('#warning').innerHeight;
				$('#warning').show("slow");
				$('svg').animate({top: height});

			
	  	}	
	  		
	    //Re-add drag start event listener on each drop
		var field = document.querySelectorAll('.field');
		[].forEach.call(field, function(field) {
	  		field.addEventListener('dragstart', handleDragStart, false);
	  		field.addEventListener('dragend', handleDragEnd, false);
	 	});
		
	
	  return false;
	}
	
	//initialy find all draggable elements and add dragstart event listener	
	var field = document.querySelectorAll('.field');
	[].forEach.call(field, function(field) {
  		field.addEventListener('dragstart', handleDragStart, false);
  		field.addEventListener('dragend', handleDragEnd, false);
  		field.addEventListener('dragenter', handleDragEnter, false);
  		field.addEventListener('dragover', handleDragOver, false);
  		field.addEventListener('dragleave', handleDragLeave, false);
  		field.addEventListener('drop', handleDrop, false);
  		
	});


	//Initialize RaphaelJS here
	var pageHeight = $(window).height();
	var pageWidth = $(window).width();
	var paperHeight = $('#left-column').outerHeight(true);
	var paperWidth = ($('.row-fluid',this).outerWidth(true) - $('#right-column').outerWidth(true) - $('#left-column').outerWidth(true)-2);
	var paper = new Raphael(document.getElementById('canvas-container'), paperWidth, paperHeight);
	
	//close warning
	$('a.close').click(function(){
		$('#warning').hide("slow");
		$('svg').animate({top: "0"});
	});

});