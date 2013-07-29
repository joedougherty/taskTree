$(document).ready(function() {
  
  // Create a new parent-level item
  // Alt + Shift + n
  function keyShortcutNewTask(e) {
    if ( e.altKey && e.shiftKey && (e.keyCode == 78 || e.keyCode == 110) ) {      
      $("#wrapper").append( treeNode );
    }
  }
 
  document.addEventListener('keyup', keyShortcutNewTask, false);

});
