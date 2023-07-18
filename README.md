My take on classified newspaper ads as a website. 

Functions:
- View all posts on the homepage 
- Make an account
- Sign in
- View all posts under their account
- Edit their posts
	- Delete their posts
- Smooth, responsive interface using Bootstrap


## How it works
<sup>This app uses Node, Express, Handlebars, SQLite, Bootstrap, Axios, Passport, Day.js etc.</sup> 

There are three databases involved with this app: 
- one for the users in `/users/users-sequelize.sqlite3` and 
- one for the posts in `/sqlite/posts.db` and
- one for the user sessions in `/sqlite/sessions.db`

These databases should already be populated with data.

To run the app, run the app in `/users` to start the server for the users, then run the main app.

Whenever a user signs up or logs in, the relevant request to the user server is sent using Axios, and its response is handled. With logins, Passport is also used to authenticate the login, and if the login is successful, a user session is initiated. Passport is also used to log the user out (terminate the session). 

The posts database was implemented using SQLite. Routes query the database using relevant request functions imported from the `requests.js` file. The timestamp for each post is formatted using Day.js to display the relative timestamp.

Based on whether or not a user is logged in, the links on the navbar will change accordingly using Handlebars handlers. Some routes (signup, login, profile, new post, etc.) will also be available or unavailable to the user accordingly by checking for a user session in the router. A link to edit a post is displayed as a pencil icon on the top right of each of the user's posts in the user profile view. For a user to edit (and delete) a post, the user must first be logged in and own the post. There is also a confirmation modal to ensure that the user actually wants to delete the post.

## How to test
To run the test, be in the main app directory and run `npm test`.

I wrote three simple tests to test the get functions of `requests.js` to the posts database. The test is located in `tests/tests.js` In these tests, the user BrainCraver and their posts will be used. There is a script defined in the `package.json` file, `"test":  "mocha"` .

<br>

___
## Notes

The code in `/users`  is straight from the textbook [Node.js-Web-Development-Fifth-Edition/Chapter08/users at master · GitHub](https://github.com/PacktPublishing/Node.js-Web-Development-Fifth-Edition/tree/master/Chapter08/users)

However, I had to comment out line 148 of `user-server.mjs`; it was throwing an error if the user didn't exist since it didn't check for that beforehand.

<br>
If you want to play around with any of the preexisting users, their passwords are the same as their usernames. Except BrainCraver, that account's posts are used for testing.

<br>
<br>
<br>
