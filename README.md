# Home Cooking Recpies SPA

This is a Single Page Application (SPA) built with Node.js that serves as a recipe management system. It utilizes Mongoose to handle database operations and offers both user and public sections for interacting with recipes.

## Features

- **Public Section**:
  - Browse recipes and search using a search bar.

- **User Section**:
  - Logged-in users can create new recipes.
  - Edit and delete their own recipes.
  - Recommend recipes by liking them (only if they haven't already).

## Installation

To get started with this application, follow the steps below:

### Prerequisites

- Node.js (version >= 14.x)
- MongoDB (local or hosted)

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/stiliyangospodinov/Home-Cooking-Recipes.git

    Navigate to the project directory:

    bash

cd Home-Cooking-Recipes

Install the required dependencies:

bash

    npm install

MongoDB Local Setup

To use a local MongoDB database, follow these steps:

    Install MongoDB:
        Download and install MongoDB from the MongoDB Community Server.

    Start MongoDB:
        Open a terminal and run the following command to start the MongoDB server:

        bash

    mongod

    Ensure that the MongoDB server is running before starting the application.

(Optional) Install MongoDB Compass:

    Download and install MongoDB Compass for a graphical interface to manage your databases from MongoDB Compass.

Run the Application:

    After starting the MongoDB server, navigate to the project directory and run the application:

    bash

        npm run debug

        The database HomeCookingRecipes will be created locally, and you can start adding recipes!

Usage

    To view recipes, navigate to the public section of the application.
    If you wish to create or manage your recipes, log in using your account credentials.
    You can recommend recipes by clicking the like button, but you can only like each recipe once.

Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request with your improvements or features.
License

This project is licensed under the MIT License. See the LICENSE file for more information.
Acknowledgments

    Node.js - JavaScript runtime built on Chrome's V8 engine.
    Express - Fast, unopinionated, minimalist web framework for Node.js.
    Mongoose - MongoDB object modeling for Node.js.

This project was developed by:

Stiliyan Gospodinov

