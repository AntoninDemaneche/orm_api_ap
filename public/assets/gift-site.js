$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input');
      var gift = {item: item.val().trim()};

      $.ajax({
        type: 'POST',
        url: '/gift',
        data: gift,
        success: function(data){
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
    var item = $(this).data('id');
    $.ajax({
      type: 'DELETE',
      url: '/todo/' + item,
      success: function(data){
        location.reload();
      }
    });
});

});