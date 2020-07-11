# SocietySidekick

A web application to manage society play characters.  The following features are available currently

* Social login authentication via Google
* Support for the following societies
  * Pathfinder 2e (https://paizo.com/pathfinderSociety)
  * Starfinder 1e (https://paizo.com/starfindersociety)
* Register your society number
  * Print out a society card!
* Register your society characters and track
  * Scenarios your character has played, how many XP, fame, and gold (or credits) was received
    * Automatically computes gold/credits gained
    * Automatically computes XP gained
    * Select boons earned
  * Manage boons for your character
  * Manage equipment bought for your character
    * Tracks against your earned gold/credits
* Listing of
  * Characters
  * Scenarios
    * Share your list of scenarios with friends!
    * Favorite shared lists of friends.
  * Boons

## Project setup

The client application is a VueJS single page application.   It requires the companion server application (https://github.com/thzero/societySidekick-server) installed and running first.  The server application provides the API for use by the SPA.

### Requirements

#### Firebase

Google Firebase (https://firebase.google.com) provides the social based authentication; currently only Google social accounts are supported.

* Add a new project
  * If not already completed when setting up the server application
* Setup **Authentication**, enabled Google in the **Sign-in method**.
  * If not already completed when setting up the server application
* Get the Firebase SDK configuration
  * Go to Project Overview->Settings->General
  * Click **Add App** and select **Web**
    * Click *Firebase SDK snippet*, select **Config*
    * Select the JSON object and store it for later use.

#### Setup Config

* Setup the configuration found in the config\development.json
  * Note that this is ignored in the .gitignore
* Configuration looks like the following

```
{
	"backend": [
		{
			"key": "backend",
			"apiKey": "<apikey required by the server component>",
			"baseUrl": "<base url for the api of the server component>"
		}
	],
	"external": {
		"firebase": <firebase key JSON object from above goes here>
	}
}
```

#### NPM Dependencies

Install the NPM dependencies for the client.

```
npm install
```

### Compiles and hot-reloads for development

Run the application locally using the VueJs development server; requires the server component.

```
npm run serve
```

### Compiles and minifies for production

Compiles the application for deployment to cloud provider.

```
npm run build
```
