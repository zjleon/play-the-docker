# gulp task:
## webpack and babel
### prod:
* just use the webpack and setup an express server to serve all static files
* hash
* test tool
### dev:
* ~~use dev server~~
* set script
* test tool
issue: support traditional non-js-render web
https://github.com/b00giZm/docker-compose-nodejs-examples/tree/master/03-express-gulp-watch

## eslint and autofix and unit test
set on atom, export the package list.
how to write unit test quickly

## css or sass

## source map

# react and redux

# node environment configuration
## prod:
* fix private npm module login issue:
https://docs.npmjs.com/private-modules/docker-and-private-modules
* similarly, fix clone code from private repo
## dev:
* install project dependencies, *handle the error and show message*
``https://nodejs.org/api/child_process.html#child_process_child_process_execsync_command_options``
* *a script to install package to particular project
``npm install --prefix ./src/web_static package name``

*

# tree tool

# docker compose
* ~~build base images -- without the source code, but with global package like gulp~~
* run the base image -- ~~mount the source code, install dependencies~~, then run the webpack task
* re-think the package.json file management
## prod: overide the dev yaml setting
## dev: create a volume for each service

# webhook for github
