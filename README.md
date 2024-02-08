# Instagran Clone Application

This Instagram clone application is developed using React and Firebase, allowing users to sign up and log in either with a custom account or through Google authentication. Once authenticated, users can perform various actions such as creating posts, commenting on posts, liking and unliking posts, following or unfollowing other users, and searching for users.

# Features

## User Authentication:

Sign up with email and password
Log in with email and password
Log in with Google

## Post Management:

Create new posts
Comment on posts
Like and unlike posts

## User Interaction:

Follow other users
Unfollow users
Search for users

# Technology used

React: The frontend of the application is built using React, providing a responsive and dynamic user interface.
Firebase: Firebase is used for user authentication, database management, and storage of images.

1. setting up react app using vite npm create vite@latest
2. installing chakra UI
3. setting up Chakra UI
4. installing react-icons and react-router-dom, form icons and navigations between pages.

## Firebase setup:

Create a Firebase project on the Firebase console (https://console.firebase.google.com/).
Enable authentication with email/password and Google sign-in methods.
Create a Firestore database for storing user data and posts.
Obtain Firebase configuration details.

## .env setup (environment variable)

Create a .env file in the root directory of the project and add Firebase configuration details as environment variables:
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id

## install firebase packages:

    	npm install firebase zustand react-firebase-hooks @chakra-ui/icons
    	zustand library is used for global state management.
    	react-firebase-hooks is use for using firebase hooks
    	@chakra-ui/icons is used for chakra icons.

# Installation

(This is for Quick installation without build the project from scratch):
git clone https://github.com/your-username/instagram-clone.git;
cd instagram-clone;
npm install;
npm run dev;

# Note

make sure to add you localhost or domain on which your application is running in:
Firebase Authentication -> Settings -> Authorized Domain

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
