$(document).ready(function() {
  $("#wrapper").sortable({
    revert: true
   });
  
  $("div.parentLevel").draggable({
    connectToSortable: "#wrapper",
    helper: "clone",
    revert: "invalid"
  });

});
