This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


# Approach/Methodology
This app was created as a personal journal app that allows the user to pull a three card reading for reflection. On the backend to generate a reading of random cardsI used an API (https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=3). The user can easily make, edit, favorite and delete any entry as well as make an entry without a reading. On the backend I wanted to make it easier to expand the app for future stretch goals by making the routes easy to follow.

The frontend has a simple design but it is easy to follow and is also very open to adding my stretch goals. For the purpose of the first version the goal was to be able to make and view all entrys and easily.

# Landing page after user logs in
![Home](images/HomePage.png)

# Link to Deployed App
Link to come

# Link to Backend Repo
[Here](https://github.com/SFX818/Team-7-backend) is a link to our backend repo

# Wireframes
![Wireframes](images/Wireframe_Board.png)

# User Stories
| As a user, I want to be able to...|
|-|
|Write a post that is visible to other users|
|Categorize my post using hashtags|
|Follow and unfollow other users |
|Favorite posts|
|Retweet posts|
|Reply to posts|
|View a feed of all posts|
|View a feed of posts from users I follow|
|View other user profiles|
|View my favorited posts|
|Search for topics (hashtags)|

# Frontend Tech Stack
## Fetching Data
- Axios: allows us to make calls to send data to and retrieve data from our backend. We are also investigating integrating a Twitter API into our app.

## Architecture
- React: building our fronted with the React library allows us to break our app down into reusable components, and helps us create a more user friendly experience because we are able to re-render only components whose state has changed without re-rendering other components.

```
App
|
|--Home
|  |--Post(s)
|  |   |--Replies
|  |
|  |--Searchbar
|  |
|  |--PostForm
|
|--Following
|  |--Post(s)
|
|--Favorites
|  |--Post(s)
|
|--UserProfile
|  |--Post(s)
      |--Following

```

## Styling
- Bootstrap

# Installation Instructions
- Fork & clone this repo
- cd into local directory and `npm install` to install dependencies

# Problems/Challenges
- We ran into an issue rendering posts for users a user follows because our data from the backend initially required iterating through a nested array. This resulted in posts displaying from a single user but broke when a user followed multiple users. This was ultimately resolved by reconfiguring a route on the backend and made our code more efficient because it cut out the need for an extra API call and subsequent nested array that came with it.
- Since we did reuse our post component in every page that rendered current and other user's code there was a difference in how every object came through from the backend depending on how we set it up. At first we had to make promises to access the information we needed but ended up populating much of the backend so we could use in the frontend easily.

