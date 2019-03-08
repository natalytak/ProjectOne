
          
          // call the 'city' atteibute from LocalStorage and create the cityInput attribute
                var cityInput = localStorage.getItem('city');
            
          
              function buildQueryURL() {

                  method: "GET"
                var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" 
                var queryParams = { "api-key": "gEHdwjN6FzvV3qyy6BpAlyGyU4m9NGGP" };
          
                queryParams.q = cityInput
    

                queryParams.fq = ("news_desk:travel");
                console.log(queryURL + $.param(queryParams));

                return queryURL + $.param(queryParams);

                
                
              }
           //https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=gEHdwjN6FzvV3qyy6BpAlyGyU4m9NGGP&q=denver&fq=news_desk%3Atravel
          
              function updatePage(NYTData) {

                var numArticles = 20;
                console.log(numArticles);
                console.log(NYTData);
                for (var i = 0; i < numArticles; i++) {
                  var article = NYTData.response.docs[i];
          
      
                  // Variable to Contain the articles
                  var $articleList = $("<div class='card-header'>");

                  // Add the newly created element 
                  $("#display-articles").append($articleList);

          
                  // If the article has a headline, log and append to $articleList
                  var headline = article.headline;
                  
                  // Main div container
                  var $articleListItem = $("<div style='color:white; background-color:rgba(52,58,64); padding:35px;  width:500px; height:625px; margin: auto;'></div>");
                
                   // Image
                  var articleimageLink =("href", article.web_url);
                  console.log(articleimageLink);
                 // $("#divLink").append(articleimageLink);
                 //$("#divImage").click(function(){
                  //window.location.href = this.getElementsByClassName(articleimageLink)[0].href;
                  //});
          
          
          
                  var multimedia = ("http://nyt.com/" + article.multimedia[i].url);
                  console.log(multimedia);
          
                  var image = $("<img>");
                  image.attr('height', 300);
                  image.attr("src", multimedia);
                  console.log(image);
                    

                  // Appending the paragraph and image tag to the animalDiv
                  if (multimedia) {
                    $articleListItem.append(image);
                  }


                  if (headline && headline.main) {
                    console.log(headline.main);
                    $articleListItem.append(
                      "<h4> " +"<div style='padding-top:5px;' 'padding-bottom:5px;'>"  + 
                      headline.main +
                      "</h4>" + 
                      "</div>"
                    );
                    ;
                  }


                
                  // If the article has a byline, log and append to $articleList
                  var byline = article.byline;
          
                  if (byline && byline.original) {
                    console.log(byline.original);
                    $articleListItem.append("<h6>" + byline.original + "</h6>");
                  }
          
          
                  // Log published date, and append to document if exists
                  var pubDate = article.pub_date;
                  console.log(pubDate);
          
                  //Using momen.js to convert date format
                  var randomFormat = "YYYY-MM-DD";
                  var convertedDate = moment(pubDate, randomFormat);
                  var date = convertedDate.format("MMMM Do, YYYY");
          
          
                  if (pubDate) {
                    $articleListItem.append("<h6>" + date + "</h6>");
                  }
          
          
                  // Log published date, and append to document if exists
          
                  var snippet = article.snippet;
                  console.log(snippet);
                  if (snippet) {
                    $articleListItem.append("<p>" + snippet + "<p>");
                  }
          
          

          
                  var articleButton = $("<button>");
          
          
                  articleButton.addClass("btn btn-warning");
                  articleButton.addClass("fa fa-newspaper-o");
                  articleButton.text(" " + "Read Article");
                  var articleLink = $("<a>");
                  articleLink.attr("href", article.web_url);
                  articleLink.append(articleButton);
                  // articleButton.append("<a href='" + article.web_url + "'>" + article.web_url + "</a>");
                  console.log(article.web_url);
                  $articleListItem.append(articleLink);
                  // $(articleLink).clone().appendTo("#user-button");
                  $articleList.append($articleListItem);
          
                  //var articleGrid = $('<div>');
                  //articleGrid.addClass("col-sm-4"[i])
                  //articleGrid.append($articleList);
          
                }
          
                  // Function to load more articles
          
          
                var load = document.createElement("button");
                load.setAttribute('id', "divLoadButton");
                load.innerHTML = "Load More";
                $("#divLoadButton").empty();
                $("#divLoadButton").append(load);
          
                $("#divLoadButton").on("click", function () {
          
                  numArticles = numArticles + 3;
                  console.log(numArticles);
                  //i=i+10;
                  console.log(i);
   

          
          })
          }
          
              

          
              // Function to empty out the articles
              function clear() {
                $("#display-articles").empty();
              }
          
          
             var queryURL = buildQueryURL();
                $.ajax({
                  url: queryURL,
                  method: "GET"
                }).then(updatePage);
              
          

          
          
          
          
          
           