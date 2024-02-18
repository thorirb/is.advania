# Introduction
This is a plain react app written in typescript (with a few js files leftovers from the original project setup). 

# Getting started
(Assumes project is opened in VS Code or Visual Studio)
### Prerequisites
Make sure you have the following things installed
* .net sdk version 7 or newer.
* npm package manager

### Build and test
* Restore dependencies and build the project
* Press F5 to get the project running in Debug Mode
* The webpage should open momentarily. Try it out.

### Run the published app
The published app is found in folder publish in the root. To run the app in command line (windows) run `dotnet weather-app`. On mac os/linux terminal just run the app `./weather-app`. 
The app should print the url `http://localhost:5000/`, open it in any browser to test the app.

# Assumptions
* This app will not be installed in a production environment and therefor we will disregard the current audit yielding various vulnerabilities.
* This project was setup using the command `dotnet new create react`, the project being left as is except for the following changes
  * Use typescript instead of javascript where seen fit.
  * Remove unnecessary code

# Decisions
* The weather station list was added as a json file to the app project instead of fetched from the service due to time concerns. This list ought to be in a (lightweight) database along with other static values.
* Decided to go for the react app with a service backend to get the extra exercise in to work on such apps, it would have been easier to go with a CLI though as this is more my comfort zone. 
* Did not spend alot of time on the design in favor of functionality in the app.
* Decided to give the user a choice of station and nothing else. Keep it so simple.
* 

# Scripts
Here is a list of helper scripts.

### GetStations.sh
This script can be used to scrape vedur.is for the station names and ids contained in the file stations.json. Note the script creates a working folder stodvar where all html pages for the stations are saved, this is done so that if something fails after the scraping we do not need to scrape the site again.


# Materials looked at for this project

* Documentation for the vedur.is API
* Create react app with dotnet template
* Looked through article to convert project from javascript to typescript where necessary: https://kenny-designs.github.io/articles/2022-06-05-csharp-react-typescript-tutorial.html
* 