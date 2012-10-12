$(document).ready(function() {

  function keyShortcutNewTask(e) {

    if ( e.altKey && e.shiftKey && (e.keyCode == 78 || e.keyCode == 110) ) {      
      $("#wrapper").append( treeNode );
    }
  }

  // solely for the saw sharpening
  function ascendLevelsrecur( el, numOfLevels ) {
    if (numOfLevels == 0) {
      return el;
    } else {
      var el = el.parent();
      return ascendLevelsrecur( el, numOfLevels-1);
    }

  }

  function ascendLevels( el, numOfLevels ) {  
    var el = el;

    for (var i=0; i<numOfLevels; i++) {
      el = el.parent();
    }

    return el;
  }

  document.addEventListener('keyup', keyShortcutNewTask, false);

  var collapsed = "imgs/collapsed.png";	
  var expanded = "imgs/expanded.png";

  var treeNode = '<div class="task">' +
		   '<ul class="treeNode" style="display: block;">' +
		     '<li>' + 
		       '<img class="arrow" src="' + expanded + '" />' +
		       '<span class="nodeTitle" contenteditable="true"> New Task </span>&nbsp;' +
	               '<input type="checkbox" class="isComplete">' +
	               '<span class="addNode"> + </span>' + 
	               '<span class="delNode"> &ndash; </span>' +
	             '</li>' +
	           '</ul>' +
		   '</div>';

  var allTasks = localStorage.getItem('allTasks');

  if ( allTasks ) {
    $("#wrapper").append( allTasks );
  } else {
    $("#wrapper").append( treeNode ); // Start 'em off with something
  }

  // Add a node to the given tree
  $("button.addNode").click(function() {
    $("#wrapper").append( treeNode );
  });      	 

  // Add nodes
  $("div#wrapper").on("click", ".addNode", function(e){

    $(this).parent().append( treeNode );
    $(this).parent().children("div").fadeIn();
    
    $(this).parent().find("img.arrow:first").css('visibility', 'visible');
    $(this).parent().find("img.arrow:first").attr('src', expanded);
  
  });

  // Grey out item once 'complete' is checked
  $("#wrapper").on("click", "input.isComplete", function(event){
  
    // This is buggy; I must not be doing something right here...    
    if ( this.checked ) {
     
      $(this).attr('checked', 'checked');
      $(this).parent().css('color', '#ccc');
      
    } else {
    
      $(this).removeAttr('checked');  
      $(this).parent().css('color', '#000');
    
    }

  });
  
  // Delete chosen node
  $("#wrapper").on('click', 'span.delNode', function(e) {

    ascendLevelsrecur($(this), 3).fadeOut('fast', function() { // .parent().parent().parent() 

	var numOfChildren = $(this).parent().children('div.task').length;
	// console.log( numOfChildren );	
	
	if ( numOfChildren === 1 ) { // it's the last child
	  $(this).parent().find('img.arrow').css({ 'visibility' : 'hidden' });
	}

	$(this).remove();
    });    
 
  });
  
  // Expand all child nodes of parent [ slideDown() ]
  $("#wrapper").on("click", "img.arrow", function(e) {
       
    // Switch to alternate arrow shape
    if ( $(this).attr('src') == expanded ) { 
     
      // Collapse child nodes
      $(this).attr('src', collapsed); 
      $(this).parent().children("div").slideUp();
  
    } else {
  
      // Expand child nodes
      $(this).attr('src', expanded);
      $(this).parent().children("div").slideDown();
  
    }   
    
  });

  // Save the task list whenever the window.document object is clicked
  // Would it better to bind this to a different event listener? If so, what?
  $(document).click(function() {

    /* Attach additional keyboard event for auto-save */

    var taskList = $("#wrapper").html();
    localStorage.setItem('allTasks', taskList);

  });
  
  // Delete localStorage task list
  $("button.clearLS").click(function() {   
  
    if ( confirm(" You're sure? They'll disappear...never to be seen again. ") ) {
 
      window.localStorage.removeItem('allTasks'); 
      $("#wrapper").html("");
      
    } else {
    
      return false;
    
    }

  });

  $('a.navLink').bind('click',function() { 

    // hide all divs
    $('div.contentDiv').hide();

    // show div with li -> href attr 
    var visiDiv = "div"+$(this).attr('href');    
    $(visiDiv).fadeIn();

    // 
    $('ul.nav li').css({ 'background-color' : '#fff' });   

    // Change tab color to reflect selection
    $(this).parent().css({ 'background-color' : 'orange' });
 
    return false; // fixes href="#..." page reload problem    

  });

  // A starting point 
  // $('div.task').draggable({});
/*
  $('div#wrapper').on("click", "span.handle", function() {

    console.log('next step, boss');
    $(this).parent().draggable({});
  }); 
*/
});
