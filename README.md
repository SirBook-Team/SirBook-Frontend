# Social Media Platform (SirBook) - Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Description

A social media platform that allows users to create accounts, log in, update their profiles, view other users' profiles, browse posts, create new posts, and interact through likes and comments.


## Features

* Account Creation: Users can register and log in to their accounts.
* Profile Update: Users can edit their profile information.
* Profile Navigation: Users can view profiles of other members.
* Post Management: Users can publish new posts and view all posts.
* Interactions: Users can like posts and add comments.


## Technologies Used

* React: For building the interactive frontend.
* CSS: For styling the interface.
* JavaScript: For implementing core logic on the frontendز


## Requirements

* Node.js: Make sure Node.js is installed on your device.
* npm or yarn: For managing packages.


## Installation Steps

1. Clone the repository:
\```
git clone https://github.com/SirBook-Team/SirBook-Frontend
cd ./SirBook-Frontend
\```

2. Install dependencies:
\```
npm install
\```

3. Setup environment variables:
* Create a .env file in the root directory of the project.
* Add your .env settings like this.
\```
REACT_APP_API_URL=<your_API_URL>
\```
> Note: Remember to replace `<your_API_URL>` with your actual Backend server URL.

4. Run the project:
`npm start`


## Usage

Once the application is running, you can access it in your browser at http://localhost:3000


## Production Build

To create a production build, use:
\`
npm run build
\`
This will generate an optimized, production-ready build in the build folder, with minified files and hashed filenames. For more details, see the [Create React App deployment documentation](https://create-react-app.dev/docs/deployment/).