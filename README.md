# Recipe Management SPA

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

1. Clone the repository:

   ```bash
   git clone https://github.com/stiliyangospodinov/Home-Cooking-Recipes.git

    Navigate to the project directory:

    bash

cd Home-Cooking-Recipes

Install the required dependencies:

bash

npm install

Set up your MongoDB database:

    Create a new database and update the connection string in your .env file (if using environment variables) or directly in the code.

Start the application:

bash

    npm run debug

    Access the application in your web browser at http://localhost:3000.

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
