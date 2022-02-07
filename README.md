# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

### `How it works`

This is a simple Form Template Search Interface, with the form templates provided from a public Rest API.

### `Features`

- Users can filter by category
- Users can filter by date
- Users can filter by order
- Users can only filter by catergory and date or category and order
- Users can filter by search in the search box
- Users can go to the next page
- Users can to go the previous page
- Template links are not active

### `Assumptions`

- I made the tags available on the cards so that I could debug easily.
- I made a custom pagination function so that I could render a number of cards per page, I made it render only 10 per page because I also wanted to test the pagination.
- I used react-redux for the project
