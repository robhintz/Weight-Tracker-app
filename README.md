# Weight-Tracker-app
This is a very simple app using npm used to keep track of the users weight. It's just a database right now that you can push dates and weights into and have them saved. I hope to be able to add more functionality with the ability to graph your results with the date as the x axis and the weight as the y axis. The user is prompted to log in and than brought to an index page where they can see their entries and create new entries. The routes for sessions and users are all associated with log ins and are tied to models/user.js. The username is slipped in with the rest the of data through the post route. Everything under /index route the user needs to be logged in for because all the data is pulled based on their user name.
