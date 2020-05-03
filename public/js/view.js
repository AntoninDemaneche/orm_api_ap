$(document).ready(function() {

  const $newItemInput = $("input.new-item");

  const $gifContainer = $(".gif-container");

  $(document).on("click", "button.delete", deleteGif);
  $(document).on("click", ".gif-item", editGif);
  $(document).on("keyup", ".gif-item", finishEdit);
  $(document).on("blur", ".gif-item", cancelEdit);
  $(document).on("submit", "#gif-form", insertGif);

  let gifs = [];

  getGifs();

  function initializeRows() {
    $gifContainer.empty();
    const rowsToAdd = [];
    for (let i = 0; i < gifs.length; i++) {
      rowsToAdd.push(createNewRow(gifs[i]));
    }
    $gifContainer.prepend(rowsToAdd);
  }

  function getGifs() {
    $.get("/api/gifs", (data) => {
      gifs = data;
      initializeRows();
    });
  }

  function deleteGif(event) {
    event.stopPropagation();
    const id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/gifs/" + id
    }).then(getGifs);
  }

  function editGif() {
    const currentGif = $(this).data("gif");
    $(this).children().hide();
    $(this).children("input.edit").val(currentGif.text);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }


  function finishEdit(event) {
    const updatedGif = $(this).data("gif");
    if (event.which === 13) {
      updatedGif.text = $(this).children("input").val().trim();
      $(this).blur();
      updateGif(updatedGif);
    }
  }

  function updateGif(gif) {
    $.ajax({
      method: "PUT",
      url: "/api/gifs",
      data: gif
    }).then(getGifs);
  }

  function cancelEdit() {
    const currentGif = $(this).data("gif");
    if (currentGif) {
      $(this).children().hide();
      $(this).children("input.edit").val(currentGif.text);
      $(this).children("span").show();
      $(this).children("button").show();
    }
  }

  function createNewRow(gif) {
    const $newInputRow = $(
      [ 
        "<li class='list-group-item gif-item'>",
        "<img src='",
        gif.text,
        "' alt='' class='taille-gif'",
        "</img>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-danger'>x</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", gif.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("gif", gif);
    if (gif.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }

  function insertGif(event) {
    event.preventDefault();
    const gif = {
      text: $newItemInput.val().trim(),
      complete: false
    };

    $.post("/api/gifs", gif, getGifs);
    $newItemInput.val("");
  }
});
