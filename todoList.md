# fill readme

# gulp task:
* integrate webpack and babel to gulp
* ~~run dirTree~~, generate atom package task
* code structure for real big code base project
### prod:
* just ~~use the webpack~~ and setup an express server to serve all static files
* ~~hash for js files and change it in html~~
### dev:
* ~~use dev server~~
* ~~set script~~
* doc how to use async module(https://github.com/petehunt/webpack-howto)
* unit test process, include UI test -- make sure app stable after small UI changes
issue: support traditional non-js-render web(https://github.com/b00giZm/docker-compose-nodejs-examples/tree/master/03-express-gulp-watch)

## eslint and autofix and unit test
set on atom, export the package list.
how to write unit test quickly
add lint to git pre-commit
static the unit test coverage by tool
## css or sass
## source map
## fix the gap between react and react-native(https://github.com/search?utf8=%E2%9C%93&q=react+native+web)
## android
* adb response for apk install on device, buck and gradle response for compile the code to apk
* ~~gradle setup in container~~
* how to build android app in container. specify sdk version for app
  * build android code from resource: https://facebook.github.io/react-native/docs/android-building-from-source.html
  * gradle entry point: https://github.com/facebook/react-native/blob/master/local-cli/generator-android/templates/src/app/build.gradle
  * **figure out how exactly react-native run the native project by learning gradle course**
* install adb in container(in gradle container?)
* connect simulator via adb
* connect phone via adb
* linter for android native code
* a script that use adb to launch many apps in adroid background to simulate the real use scenario

# react and redux
* how server side rendering work
* tap event support on web
* doc how to use non-style component

# CI server
## prod:
* unit test, and do search about how to write unit test efficiently then doc it
* build docker image then push it to private registry.
* generate documentation about:
1. 'file hash -> build version' map
2. resource map(js, css map)
3. release documentation(**what's that?**)

# node environment
## prod:
* fix private npm module login issue:
https://docs.npmjs.com/private-modules/docker-and-private-modules
* similarly, fix clone code from private repo
* performance measure
## dev:
* install project dependencies via node script, ~~handle the error and show message~~ log errors in static file
``https://nodejs.org/api/child_process.html#child_process_child_process_execsync_command_options``
* *a script to install package to particular project
``npm install --prefix ./src/web_static package name``*
* fix the npm install issue:
http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
* compile the nodejs code with webpack

# docker compose
* ~~build base images -- without the source code, but with global package like gulp~~
* ~~run the base image -- mount the source code, install dependencies, then run the webpack task~~
* re-think the package.json file management
* avoid contaminate the origin file/folder
## prod:
* overide the dev yaml setting
## dev:
* ~~create a volume for each service~~
* IOS development environment

# github
* decide which cloud to use
* webhook on github
  * on client side, do all unit test before commit
  * on server side, trigger CI server when commit into master


# ~~tree tool~~
