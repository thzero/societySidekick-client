![GitHub package.json version](https://img.shields.io/github/package-json/v/thzero/societySidekick-client)
![David](https://img.shields.io/david/thzero/societySidekick-client)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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

#### Submodules

Install the submodule dependencies for the client.

```
git submodule add https://github.com/thzero/societySidekick-common "src/common" 
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

## Google Cloud Hosting

Login to Google Cloud hosting, select the same account that was setup for Firebase.

Enable the following APIs

* Cloud Build API
* Firebase Management API
* Firebase Hosting API
* Cloud Resource Manager API
* Identity and Access Management (IAM) API

##### Service Accounts

* In the IAM & Admin > Service Accounts tab, click Create Service Account.
* Name it something descriptive, like firebase-deployer.
* Grant this new service account only the roles it absolutely needs to execute the build and deploy [1.1.4]:
  * Cloud Build Service Account (cloudbuild.builds.builder)
  * Firebase Admin (firebase.admin) – Gives permissions to deploy to Firebase Hosting.
  * API Keys Admin (serviceusage.apiKeysAdmin) – Allows the Firebase CLI to query the backend endpoints for deployment.
  * Logs Writer (logging.logWriter) – Fixes the logging error and allows you to view the build console outputs.
  * Source Repository Reader (source.reader) – Allows the first step to pull the github_thzero_web-common Git submodule from Cloud Source Repositories.
  * Artifact Registry Writer (artifactregistry.writer) (or Storage Object Admin if using legacy GCR) – Allows the Kaniko step to push the built Firebase CLI container image.

### Cloud Build

#### Cloud Build Settings

In Cloud Build, set the Settings page and make sure the following are enabled

* Cloud Run
* Firebase
* Cloud KMS
* Service Accounts

##### Application Configuration

Update the following from the above configuration JSON

* apiKey - Set to same value from the server
* baseUrl - Set the value to be the server api's Cloud Run URL.

#### Cloud Source Repository

This should have already been setup with the server application.

#### Cloud Build Trigger

##### Event
* Push to branch

###### Region
* Select the same region as used with the Cloud Source Repository

##### Source
* Select the repository
* Select "^master$" branch

##### Configuration

###### Type
* Cloud Build configuration file (yaml or json)

###### Location
* Repository
* Cloud Build configuration file location
 * / cloudbuild.yaml

##### Subsitution variables

Add these variables:

* _CONFIG - <application configuration JSON>

##### Application Configuration

Update the following from the above configuration JSON

* apiKey - Set to same value from the server
* baseUrl - Set the value to be the server api's Cloud Run URL.

##### Service Accounts

* Select the firebase-deployer service account to run the build.

### External File (images, isntructions, designs, etc.) Storage

#### GCP Storage

* Setup a GCP storage bucket with the name of: filesrocketry.thzero.com
* Add 'allUsers' with 'Storage Object Viewer' to give Public access.

### Cloudflare

* https://cloud.google.com/storage/docs/hosting-static-website-http

* Add a CNAME record
* Go to website
* Go to DNS
* Add record
 * Type: CNAME
 * Name: filesrocketry
 * IPv4 address: c.storage.googleapis.com
 * Proxied: checked
 * TTL: Auto