

// call the 'city' from LocalStorage and create the cityInput attribute
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

      $("#cityInput1").append("NYT Travel Articles |" + " " + cityInput);


  function updatePage(NYTData) {
  var numArticles = 20;
  console.log(numArticles);
  console.log(NYTData);
  for (var i = 0; i < numArticles; i++) {
  var article = NYTData.response.docs[i];


    var $articleList = $("<div class='card-header' style ='margin:0 auto;'>");

    $(document).ready(function(){
      $(".card-header").hover(function(){
        $(this).css("background-color", "rgb(255,234,203)");
        }, function(){
        $(this).css("background-color", "transparent");
      });
    });


  // URL to DIV
  var articleimageLink = ("href", article.web_url);
  console.log(articleimageLink);

    
      $(".card-header").click(function() {
        window.location = articleimageLink;
    });
 
    

    // Add the newly created element 
    $("#display-articles").append($articleList);


 
    // Main div container
    var $articleListItem = $("<div style='color:white; background-color:rgba(38,69,110); padding:35px;  width:375px; height:625px; margin:0 auto;'></div>");


  


    // Image
    var multimedia = ("http://nyt.com/" + article.multimedia[i].url);
    console.log(multimedia);
    var image = $("<img>");
    image.attr('height', 225);
    image.attr("src", multimedia);
    console.log(image);


    if (multimedia) {
      $articleListItem.append(image);
    }

    if (multimedia) {
      $articleListItem.append("<br><br><br><br><br><br><br>");
    }

   // Headline
   var headline = article.headline;

    if (headline && headline.main) {
      console.log(headline.main);
      //headline.wrap('<a href=' + multimedia + '/>');
      $articleListItem.append( "<br><br>" +
        "<h5 style='padding-top:15px;' 'padding-bottom:5px;' >" +
        headline.main +
        "</h5>" 
      );
      ;
    }

    


    // Byline
    var byline = article.byline;

    if (byline && byline.original) {
      console.log(byline.original);
      $articleListItem.append("<h9>" + byline.original + "</h9>" + "<br>");
    }


    // Published date
    var pubDate = article.pub_date;
    console.log(pubDate);

    //Moment.js to convert date format
    var randomFormat = "YYYY-MM-DD";
    var convertedDate = moment(pubDate, randomFormat);
    var date = convertedDate.format("MMMM Do, YYYY");


    if (pubDate) {
      $articleListItem.append("<h9>" + date + "</h9>" + "<br>");
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

  }
}




              var queryURL = buildQueryURL();
              $.ajax({
                url: queryURL,
                method: "GET"
              }).then(updatePage);







    










              

    




