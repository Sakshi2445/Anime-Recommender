#Anime Recommender
##A content-based anime recommendation engine

***The drive link showing the working of our anime Recommendation system is:***
[Anime-Recommender-System](https://drive.google.com/file/d/1t0VUwvKQoEgYsMHzWPuPp2H7GFRjnS9p/view?usp=sharing)

Here we have used MongoDb, ExpressJS, NodeJS, JavaScript, HTML, CSS.

***The Heroku link for the working is:***
[Anime-Recommender](https://animerec-anime-recommender.herokuapp.com/)

This is an anime Recommender system which works on the basis of two algorithms which are ***Eucledian Geometry and Cosine Similarity algorithms.***

So basically it uses the vote count, rating and genre to calculate the distance and displays the result while in the cosine similarity it calculates the cosine relation by using the genre of the anime and thus shows up the result.

A recommender (or recommendation) system (or engine) is a filtering system which aim is to predict a rating or preference a user would give to an item, eg. a film, a product, a song, etc.

Recommendations done using content-based recommenders can be seen as a user-specific classification problem. This classifier learns the user's likes and dislikes from the features of the song. The most straightforward approach is keyword matching. In a few words, the idea behind is to extract meaningful keywords present in a song description a user likes, search for the keywords in other song descriptions to estimate similarities among them, and based on that, recommend those songs to the user.

In our case, because we are working with text and words, Term Frequency-Inverse Document Frequency (TF-IDF) can be used for this matching process.
