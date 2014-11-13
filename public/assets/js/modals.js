function setModals() {
  $('.modal-trigger').leanModal();
}

function setChosen() {
  $(".chosen-select").chosen({
    width: "100%",
    search_contains: true
   });
}

$(document).ready(function() {
  setModals();
  setChosen();
});
