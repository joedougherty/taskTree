window.tasktree = window.tasktree || {};

$(document).ready(function() {
  tasktree.archiveCompletedItems = function() {
    // Find all parent level items that are checked.
    var parentLevelItems = $('#currentTasks .parentLevel');
    
    parentLevelItems.each(function() {
      parentItem = $(this);
      var checkbox = parentItem.find('.isComplete');
    
      if (checkbox.attr('checked') === 'checked') {
        $('#archiveWrapper').prepend( parentItem );
      }
    });
  };
});
