$(document).ready(function() {

   window.tasktree = window.tasktree || {};
  
   function keyShortcutNewTask(e) {
     // Create a new parent-level item
     // Alt + Shift + n
     if ( e.altKey && e.shiftKey && (e.keyCode == 78 || e.keyCode == 110) ) {      
       $("#wrapper").append( tasktree.parentLevelTreeNode );
     }
    
     // Archive all completed parent-level items
     // Alt + Shift + a
     if ( e.altKey && e.shiftKey && (e.keyCode == 65) ) {
       tasktree.archiveCompletedItems();
     }
  }

  document.addEventListener('keyup', keyShortcutNewTask, false);

});
