$(document).ready(function() {

    const $newItemInput = $("input.new-item");
  
    const $gif2Container = $(".gif2-container");
  
    $(document).on("click", "button.delete", deleteGif2);
    $(document).on("click", ".gif2-item", editGif2);
    $(document).on("keyup", ".gif2-item", finishEdit);
    $(document).on("blur", ".gif2-item", cancelEdit);
    $(document).on("submit", "#gif2-form", insertGif2);
  
    let gif2s = [];
  
    getGif2s();
  
    function initializeRows() {
      $gif2Container.empty();
      const rowsToAdd = [];
      for (let i = 0; i < gif2s.length; i++) {
        rowsToAdd.push(createNewRow(gif2s[i]));
      }
      $gif2Container.prepend(rowsToAdd);
    }
  
    function getGif2s() {
      $.get("/api/gif2s", (data) => {
        gif2s = data;
        initializeRows();
      });
    }
  
    function deleteGif2(event) {
      event.stopPropagation();
      const id = $(this).data("id");
      $.ajax({
        method: "DELETE",
        url: "/api/gif2s/" + id
      }).then(getGif2s);
    }
  
    function editGif2() {
      const currentGif2 = $(this).data("gif2");
      $(this).children().hide();
      $(this).children("input.edit").val(currentGif2.text);
      $(this).children("input.edit").show();
      $(this).children("input.edit").focus();
    }
  
  
    function finishEdit(event) {
      const updatedGif2 = $(this).data("gif2");
      if (event.which === 13) {
        updatedGif2.text = $(this).children("input").val().trim();
        $(this).blur();
        updateGif2(updatedGif2);
      }
    }
  
    function updateGif2(gif2) {
      $.ajax({
        method: "PUT",
        url: "/api/gif2s",
        data: gif2
      }).then(getGif2s);
    }
  
    function cancelEdit() {
      const currentGif2 = $(this).data("gif2");
      if (currentGif2) {
        $(this).children().hide();
        $(this).children("input.edit").val(currentGif2.text);
        $(this).children("span").show();
        $(this).children("button").show();
      }
    }
  
    function createNewRow(gif2) {
      const $newInputRow = $(
        [ 
          "<li class='list-group-item gif2-item'>",
          "<img src='",
          gif2.text,
          "' alt='' class='taille-gif2'",
          "</img>",
          "<input type='text' class='edit' style='display: none;'>",
          "<button class='delete btn btn-danger'>x</button>",
          "</li>"
        ].join("")
      );
  
      $newInputRow.find("button.delete").data("id", gif2.id);
      $newInputRow.find("input.edit").css("display", "none");
      $newInputRow.data("gif2", gif2);
      if (gif2.complete) {
        $newInputRow.find("span").css("text-decoration", "line-through");
      }
      return $newInputRow;
    }
  
    function insertGif2(event) {
      event.preventDefault();
      const gif2 = {
        text: $newItemInput.val().trim(),
        complete: false
      };
  
      $.post("/api/gif2s", gif2, getGif2s);
      $newItemInput.val("");
    }
  });
  