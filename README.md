# JUREB-APT-FRONTEND

The repository for the frontend of JurebAPT project.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### src

This is the root directory for the application, every other application folder, sub-folder & file is within this directory

### redux

This directory is the application's general redux store

### lib

Within this directory is most of the app's shared contents including;

- **Constants**: App's constants
- **Routes**: App's routes for each view
- **Urls**: App's http endpoint calls to the backend of system
- **Components**: App's shared & global components

### modules

Within this directory are all the modules for the application.
A module consist of sub-modules under it and also contains the redux store for that specific module.
NB: Every sub-module would contain a jsx file (the view for that sub-module) and a stylesheet (most likely a sass file) where the style classes for the sub-module view are

### assets

Within this directory are the design assets for the application, they include;

- **fonts**: Font family types used within the application
- **images**: All image assets e.g logo, used in the application
- **styles**: All global & shared stylesheets for the application
- **svgs**: svg assets used within the application

---

## Available Scripts

In the project directory, you can run:

### `npm format`

Formats all the **.js** files across all the modules in the codebase.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
