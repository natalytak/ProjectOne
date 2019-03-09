



// call the 'city' from LocalStorage and create the cityInput attribute
var cityInput = localStorage.getItem('city');


   var queryURL = buildQueryURLNews();
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(updatePage);

           

function buildQueryURLNews() {

method: "GET"
 var queryURL = "https://newsapi.org/v2/everything?q=" 
 var queryParams = cityInput

 queryAPI = "&apiKey=48121ae1c2ca43ea8594fcc266eb53b2";
 console.log(queryURL + queryParams + queryAPI);
 
 

 return queryURL + queryParams + queryAPI;
}


$("#cityInput2").append("News API Articles |" + " " + cityInput);


 function updatePage(newsAPI) {
   // Get from the form the number of results to display
   // API doesn't have a "limit" parameter, so we have to do this ourselves
   var numArticles = 1000;

   console.log(numArticles);

   
   console.log(newsAPI);
   

   // Loop through and build elements for the defined number of articles
   for (var k = 0; k < numArticles; k++) {
     // Get specific article info for current index
     var article = newsAPI.articles[k];
   console.log(article);
   console.log(article.source.name);

     







     // Create the  group to contain the articles and add the article content for each
     var $articleList = $("<div class='card-header'>" );
     






     // Add the newly created element 
     $("#display-news").append($articleList);
 
     var $articleListItem = $("<div style='color:white; background-color:rgba(52,58,64); padding:35px;  width:375px; height:625px; margin:0 auto;'></div>");
   

     var multimedia = (article.urlToImage);
     console.log(multimedia);

     var image = $("<img>");
       //image.attr('height', 300);
       image.attr('width', 300);
       image.attr("src", multimedia);


     console.log(image);
       
     // Appending the paragraph and image tag to the animalDiv
     if (multimedia) {
       $articleListItem.append(image);
     }

     var headline = article.title;
     console.log(headline);

     if (multimedia) {
        $articleListItem.append("<br>");
      }
  




     if (headline) {
       console.log(headline);
       $articleListItem.append(
         "<h5> " +"<div style='padding-top:5px;' 'padding-bottom:9px;'>"  + 
         headline +
         "</h5>" + 
         "</div>"
       );
       ;
     }


     var source = article.source.name
     console.log(source);

     if (source) {
       $articleListItem.append(
         "<h9> " + 
         source +
         "</h9>" + "<br>"
       );
       ;
     }



     




     // If the article has a byline, log and append to $articleList
     var author = article.author;

     if (author) {
       console.log(author);
       $articleListItem.append("<h9>" + author + "</h9>");
     }


     // Log published date, and append to document if exists
     var date = article.publishedAt;
     console.log(date);

     //Using momen.js to convert date format
     var randomFormat = "YYYY-MM-DD";
     var convertedDate = moment(date, randomFormat);
     var dateFormat = convertedDate.format("MMMM Do, YYYY");


     if (date) {
       $articleListItem.append("<h9>" + "<div style='padding-bottom:9px;'>"  + 
          dateFormat + "</div>" + "</h9>"
       );
     }


     // Log published date, and append to document if exists

     var description = article.description;
     console.log(description);
     if (description) {
       $articleListItem.append("<p>" + description + "</p>");
     }




     var articleButton = $("<button>");


     articleButton.addClass("btn btn-warning");
     articleButton.addClass("fa fa-newspaper-o");
     articleButton.text(" " + "Read Article");
     var articleLink = $("<a>");
     articleLink.attr("href", article.url);
     articleLink.append(articleButton);
     // articleButton.append("<a href='" + article.web_url + "'>" + article.web_url + "</a>");
     console.log(article.web_url);
     $articleListItem.append(articleLink);
     // $(articleLink).clone().appendTo("#user-button");
     $articleList.append($articleListItem);


   }

 }
