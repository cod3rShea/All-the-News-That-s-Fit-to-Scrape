  // when scrape button is clicked
  $(document).on("click", ".scape-articles", function(){
    $.ajax({
      method: "GET",
      url: "/scrape" 
    }).then(function(data) {
      // Log the response
        console.log("test", data);
        
        for(var i = 0; i < data.title.length; i++) {
            var title = data.title[i];
            var content = data.content[i];
            var link = data.link[i];
            
            var div = $('<div>').attr('class', 'items');
            var url = $('<a>').text(title).attr('href', link);
            var paragraph = $('<p>').append(content);

            var button = $('<button>').text('Save Article').attr({'data-title':title, 'data-link': link});
            

            div.append(url, paragraph, button);

            $('.scrapped-items').append(div);
        }
    });
  });