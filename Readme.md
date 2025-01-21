# Capacitor Setup
### Capacitor is Ionic’s official app runtime that makes it easy to deploy web apps to native platforms like iOS, Android, and more. If you’ve used Cordova in the past, consider reading more about the differences here.

### If you’re still running ionic serve in the terminal, cancel it. Complete a fresh build of your Ionic project, fixing any errors that it reports:

## ionic build

### Next, create both the iOS and Android projects:

## $ ionic cap add ios
## $ ionic cap add android

### Both android and ios folders at the root of the project are created. 
### These are entirely standalone native projects that should be considered part of your Ionic app (i.e., check them into source control, edit them using their native tooling, etc. Every time you perform a build (e.g. ionic build) that updates your web directory (default: www), you'll need to copy those changes into your native projects:

## ionic cap copy

### Note: After making updates to the native portion of the code (such as adding a new plugin), use the sync command:

## ionic cap sync