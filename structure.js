#!/usr/bin/env node

import {existsSync, mkdirSync, writeFileSync} from 'fs';
import {join} from 'path';

function createPath(...parts) {
  return join(...parts).replace(/\\/g, '/');
}

const mainFolderName = process.argv[2];

const basePath = mainFolderName ? `./${mainFolderName}` : './';
const srcFolder = createPath(basePath, 'src');
const cssFolder = createPath(srcFolder, 'styles');
const assetsFolder = createPath(srcFolder, 'assets');
const AppFolder = createPath(srcFolder, 'App');
const componentsFolder = createPath(srcFolder, 'components');
const uiFolder = createPath(componentsFolder, 'ui');
const commonFolder = createPath(componentsFolder, 'common');
const layoutsFolder = createPath(componentsFolder, 'layouts');
const featuresFolder = createPath(srcFolder, 'features');
const hooksFolder = createPath(srcFolder, 'hooks');
const pagesFolder = createPath(srcFolder, 'pages');
const libFolder = createPath(srcFolder, 'lib');
const utilsFolder = createPath(libFolder, 'utils');
const apiFolder = createPath(libFolder, 'api');
const constantsFolder = createPath(libFolder, 'constants');

const indexJSX = 'index.jsx';
const indexHTML = 'index.html';
const gitignore = '.gitignore';
const packageJSON = 'package.json';
const styleSCSS = 'style.scss';
const README = 'README.md';
const AppJSX = 'App.jsx';

const foldersList = [
    srcFolder, 
    cssFolder, 
    assetsFolder, 
    AppFolder, 
    componentsFolder, 
    uiFolder, 
    commonFolder, 
    layoutsFolder, 
    featuresFolder, 
    hooksFolder, 
    pagesFolder,
    libFolder, 
    utilsFolder, 
    apiFolder, 
    constantsFolder
];

foldersList.forEach(folder => {
    if (!existsSync(folder)) {
        mkdirSync(folder, { recursive: true });
    }
});


const indexJSXContent = `
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './styles/${styleSCSS}';
import App from './App/${AppJSX}';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
`

const AppContent = `
import React from "react";

export default function App() {
    return (
        <h2>Hello from React!</h2>
    )
}
`

const indexHTMLContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      name="description"
      content="Web site created using my template"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./src/${indexJSX}"></script>
  </body>
</html>
`

const packageJSONContent = `
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "license": "ISC",
  "author": "",
  "type": "module",
  "source": "index.js",
  "scripts": {
    "downland": "npm i react react-dom --save && npm i parcel -D",
    "start": "parcel index.html --open",
    "build": "parcel build index.html --dist-dir build --public-url ./"
  }
}
`

const gitignoreContent = `
# dependencies
/node_modules
/parcel-cache

# production
/dist
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
`

const scssContent = `
html, body {
    font-size: 10px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#root {
    width: 100vw;
    height: 100dvh;
}
`

writeFileSync(join(srcFolder, indexJSX), indexJSXContent.trim());
writeFileSync(join(cssFolder, styleSCSS), scssContent.trim());
writeFileSync(join(AppFolder, AppJSX), AppContent.trim());
writeFileSync(join(basePath, gitignore), gitignoreContent.trim());
writeFileSync(join(basePath, indexHTML), indexHTMLContent.trim());
writeFileSync(join(basePath, packageJSON), packageJSONContent.trim());
writeFileSync(join(basePath, README), 'Hello React!');

console.log(`
  ✅ Working area ${mainFolderName ? mainFolderName : ''} has been created!
  To start development:
  1. Navigate to the project folder: cd ${mainFolderName ? mainFolderName : '.'}
  2. Install dependencies: npm run init
  3. Start the project: npm start
`)