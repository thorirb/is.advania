# Introduction
This is a plain react app written in typescript (with a few js files leftovers from the original project setup). 

# Getting started
(Assumes project is opened in VS Code or Visual Studio)
* Restore dependencies and build the project
* Press F5 to get the project running in Debug Mode
* The webpage should open momentarily. Try it out. 

# Assumptions
* This app will not be installed in a production environment and therefor we will disregard the current audit yielding various vulnerabilities.
* This project was setup using the command `dotnet new create react`, the project being left as is except for the following changes
  * Use typescript instead of javascript where seen fit.
  * Remove unnecessary code

# Scripts
Here is a list of helper scripts.

### GetStations.sh
This script can be used to scrape vedur.is for the station names and ids contained in the file stations.json. Note the script creates a working folder stodvar where all html pages for the stations are saved, this is done so that if something fails after the scraping we do not need to scrape the site again.
