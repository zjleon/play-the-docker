# gulp task:
## webpack and babel
### prod:
* just ~~use the webpack~~ and setup an express server to serve all static files
* ~~hash for js files and change it in html~~
### dev:
* ~~use dev server~~
* ~~set script~~
issue: support traditional non-js-render web
https://github.com/b00giZm/docker-compose-nodejs-examples/tree/master/03-express-gulp-watch
* compile the nodejs code
## eslint and autofix and unit test
set on atom, export the package list.
how to write unit test quickly
add lint to git pre-commit
static the unit test coverage by tool
## css or sass
## source map
## **fix the gap between react and react-native**
## android
* adb response for apk install on device, buck and gradle response for compile the code to apk
### **gradle setup in container**

# react and redux
* how server side rendering work
* tap event support on web
* record non-style component in document

# CI server
## prod:
* unit test, and do search about how to write unit test efficiently then doc it

# node environment
## prod:
* fix private npm module login issue:
https://docs.npmjs.com/private-modules/docker-and-private-modules
* similarly, fix clone code from private repo
* performance measure
## dev:
* install project dependencies via node script, *handle the error and show message*
``https://nodejs.org/api/child_process.html#child_process_child_process_execsync_command_options``
* *a script to install package to particular project
``npm install --prefix ./src/web_static package name``*
* fix the npm install issue:
http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/

# docker compose
* ~~build base images -- without the source code, but with global package like gulp~~
* run the base image -- ~~mount the source code, install dependencies~~, then run the webpack task
* re-think the package.json file management
* avoid contaminate the origin file/folder
## prod:
* overide the dev yaml setting
## dev:
* ~~create a volume for each service~~
* IOS development environment

# webhook for github

# tree tool
