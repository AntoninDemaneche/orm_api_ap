$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input');
      var gift = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/gift',
        data: gift,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/gift/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});