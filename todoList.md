# fill in readme

# gulp task:
* integrate webpack and babel to gulp
* ~~run dirTree~~, generate atom package task
* code structure for real big code base project
* run gulp in an isolated container, observe code changes, send signal to other container
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
* set on atom, export the package list.
* how to write unit test quickly
* static the unit test coverage by tool

# css or sass or html
* doc down how to avoid reflow
http://taligarsiel.com/Projects/howbrowserswork1.htm

# source map

# react-native
* how to support animation, gesture
* fix the gap between react and react-native:
  1. fix the element difference: https://github.com/search?utf8=%E2%9C%93&q=react+native+web
  2. organize code:
  https://habd.as/awesome-react-boilerplates/#react-native
* *rich text editor*

## android
* **many docker build process are similar to jenkins android build, search accordingly**
* adb response for apk install on device, **buck** and gradle response for compile the code to apk
* ~~gradle setup in container~~
* **finish the apk build-install-start process**
* **try to decompose the android container, by learning how the react packager interact with build process, with symlinks**
* ~~set up a proxy for maven download~~
* how to build android app in container. specify sdk version for app
  * **integrate react-native to android project: https://facebook.github.io/react-native/docs/integration-with-existing-apps.html**
  * gradle entry point: https://github.com/facebook/react-native/blob/master/local-cli/generator-android/templates/src/app/build.gradle
  * ~~figure out how exactly react-native build the native project~~ and send to device
  * ~~learning gradle course, figure out wether should use gradle instead of watch man~~
  * ~~For faster builds, increase the maximum heap size for the Gradle daemon to more than 2048 MB.
    To do this set org.gradle.jvmargs=-Xmx2048M in the project gradle.properties.~~
    For more information see https://docs.gradle.org/current/userguide/build_environment.html
    and another speed up:  http://zeroturnaround.com/rebellabs/making-gradle-builds-faster/
  * re-organize the andriod code:
    1. ~~change path to com.projectName~~
    1. change minsdk version to 16
    1. each build command should have --info
  * **a script to install the react native package when container up. 'npm start to pack js code'**
  * **android support seems intall fail or the version of appcompat-v7 should be 25.0.0**
  * **figure out how gralde build an android application**
  * react-native app production build type
  * connect adt's build option to android container. https://github.com/facebook/react-native/blob/master/docs/IntegrationWithExistingApps.md#creating-a-release-build-in-android-studio
  * ~~copy entry file then trigger gradle download android dependencies at build stage~~
  * ~~mount the phone on mac(http://stackoverflow.com/questions/35854886/how-do-i-access-a-usb-drive-on-a-osx-host-from-inside-a-docker-container)~~
  * ~~mount phone on linux(by mount the usb file from host to container)~~
  * sign the app, store key in docker android container
  https://developer.android.com/studio/publish/app-signing.html#signing-manually
    * auto sign script

  * simulator
    * setup genymotion in mac and ubuntu use shell script:
    https://docs.genymotion.com/Content/04_Tools/GMTool/General_commands.htm
    * setup android emulator container
    https://hub.docker.com/r/tracer0tong/android-emulator/
    this container is no-ui, but can run monkey test in it automatically
    monkey: https://developer.android.com/studio/test/monkey.html
    monkey runner:
    https://developer.android.com/studio/test/monkeyrunner/index.html
    * create virtual phone via shell script(use local genymotion install file, set the network mode as NAT)
    * **use shell script to connect simulator in android container(related process in 'run-project')**
  * real device
    * **write down the process of adding gradle dependencies in docker file**
    * use genymotion image: https://github.com/MatthewHartstonge/docker-genymotion
    * ~~download the android gradle resource in docker file
    use android studio or eclipse to view the description of android support library, figure out a way to download it via command line
    http://stackoverflow.com/questions/1776496/a-simple-command-line-to-download-a-remote-maven2-artifact-to-the-local-reposito
    http://halyph.com/blog/2015/03/17/how-to-download-jars-from-maven-central.html~~
    * ~~connect device https://developer.android.com/studio/run/device.html~~
  * ~~a script that use adb to launch many apps in adroid background to simulate the real use scenario~~ use bench mark instead
* linter for android native code
* how to add font resources into android
* cut the android image size
  * /tools/emulator*
  * /tools/support
  * /tools/qemu
  * /tools/NOTICE
  * /tools/bin or bin64(depend on which one is not used)
  * /support/v1*
  ``$ rm emulator*``

# react and redux
* how server side rendering work
* tap event support on web
* doc how to use non-style component
* doc how to use shouldComponentUpdate, control render inside child componenet
* add immutable.js

# CI server
## prod:
* unit test, and do search about how to write unit test efficiently then doc it
* build docker image then push it to private registry.
* generate documentation about:
  1. 'file hash -> build version' map
  2. resource map(js, css map)
  3. release documentation(**what's that?**)
## dev:
* update code in app hub

# node environment
## prod:
* fix private npm module login issue:
https://docs.npmjs.com/private-modules/docker-and-private-modules
* similarly, fix clone code from private repo
* performance measure

## dev:
* ~~install project dependencies via node script
``https://nodejs.org/api/child_process.html#child_process_child_process_execsync_command_options``~~
* ~~a script to install package to particular project
``npm install --prefix ./src/web_static package name``~~
* fix the npm install issue:
http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
* ~~compile the nodejs code with webpack~~

# docker compose
* ~~build base images -- without the source code, but with global package like gulp~~
* ~~run the base image -- mount the source code, install dependencies, then run the webpack task~~
* ~~create docker ignore for each build: put under config folder, then copy it in each docker file~~
* re-think the package.json file management
* ~~avoid contaminate the origin file/folder~~
* **include android image process**
* use tini to make sure server stop as expect
  https://github.com/krallin/tini/issues/45#issuecomment-236117771
  https://github.com/krallin/tini
## prod:
* overide the dev yaml setting
## dev:
* ~~create a volume for each service~~
* IOS development environment

# **handle build error and show message log errors in static file**
* ~~option 1: generate error report as html, and set a express server for it~~
* ~~option 2: output to console directly~~
* android: use adb logcat --filter in android studio to track run time error, but build error?
* web_static: generate error report and use tail command in atom shell package

# github
* decide which cloud to use
* webhook on github
  * on client side, do all unit test before commit
  * on server side, trigger CI server when commit into master

# ~~tree tool~~
