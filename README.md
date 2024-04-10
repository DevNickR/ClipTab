
# Clip Tab

**Clip Tab** is a nifty Chrome extension for tab management wizards who love to copy, paste, and shuffle their tabs with ease. Whether you're tidying up your workspace or just like to keep your tabs in check, Clip Tab has got you covered!

## Features

-   **Copy to Clipboard**: Grabs the URLs of either your selected tabs or all tabs in the current window and copies them to your clipboard.
-   **Paste from Clipboard**: Opens new tabs from URLs found on your clipboard. It’s like magic, but real!
-   **Shuffle Tabs**: Randomly shuffles the order of your tabs, because sometimes life needs a bit of randomness.

## Get It on the Chrome Web Store

Already love the sound of Clip Tab and just want to add it to your browser without the hassle? You can install it directly from the Chrome Web Store:

[Clip Tab on the Chrome Web Store](https://chromewebstore.google.com/detail/clip-tab/pfpdadikmhmadoilfojeocoamlkmlokp)

## Setup and Build

Before you get started, make sure you have [Node.js](https://nodejs.org/) installed on your machine.

1.  **Clone and Install Dependencies**:
    
    -   Clone the repository or download the project files.
    -   Open a terminal in the project directory and run `npm install` to install all the necessary dependencies.
2.  **Build the Extension**:
    
    -   Run `npm run build` to build the extension. This script does a few things:
        -   Cleans any previous build artifacts (`npm run clean`).
        -   Compiles the TypeScript files (`tsc`).
        -   Copies the public assets to the `dist` folder (`npm run copy-public`).
        -   Takes screenshots of the extension for documentation (`npm run screenshot`).
        -   Zips the built project into a bundle, excluding certain files (`npm run zip`).
    -   After running the build script, you'll find the zipped extension in the `bundle` directory.
3.  **Docker Alternative**:
    
    -   If you prefer using Docker, you can build and run the project using `docker-compose up`. This will set up the environment and run the build process inside a Docker container, which can be especially helpful if you want to avoid installing dependencies directly on your machine or are running on windows and the zip command doesn't work for you.

4.  **Post-Installation**:
    
    -   The `postinstall` script runs automatically after `npm install` and ensures all necessary Playwright dependencies are installed, including a compatible version of Chromium. This is crucial for the screenshot functionality to work correctly.

## Installation

1.  Clone this repo or download the zip file.
2.  Open Chrome and navigate to `chrome://extensions/`.
3.  Enable "Developer mode" at the top right.
4.  Click "Load unpacked" and select the `dist` folder.
5.  Find the **Clip Tab** extension in your browser bar and start playing with your tabs!

## How to Use

Click on the **Clip Tab** icon in your browser bar to open the extension popup. You'll see three buttons:

-   **Copy to Clipboard**: Click to copy the URLs of your tabs.
-   **Paste from Clipboard**: Click to open new tabs from the copied URLs.
-   **Shuffle Tabs**: Click to shuffle the order of your tabs.