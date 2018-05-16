# fill in readme

## the interactive game:
* [device orientation](https://w3c.github.io/deviceorientation/spec-source-orientation.html#deviceorientation)

## eslint and autofix and unit test
* ~~set on atom, export the package list.~~
* how to write unit test quickly
* static the unit test coverage by tool
* ~~apply FLOW(in atom)~~ use Typescript?
* when bdd test fail, give the related business logic(link to JIRA task, fetch the JIRA description)
* bdd and agile, user story creation
  * [bdd intro](https://en.wikipedia.org/wiki/Behavior-driven_development#cite_note-IntroToBDD_DanNorth-11)[epic and user story in agile](http://www.mountaingoatsoftware.com/agile/user-stories)
  * bdd with saga generator
  1. bdd is start from BA, help BA to split the user story to small pieces,
  2. in each small story, developer and QA can help to create all the scenarios(when things go toward right way and wrong way),
  3. then developer can use bdd tool to create test case
  4. then developer can start to implement code to make the test case pass
* Phantomjs

# css or sass or html
* doc down how to avoid reflow
http://taligarsiel.com/Projects/howbrowserswork1.htm
* shared element transition
* **is it possible to generate final style to specified element while using sass or less(for using out link stylesheet in web, and use in-line css for android)**
* research [stylus](http://stylus-lang.com/) and [radium](https://github.com/FormidableLabs/radium#how-does-radium-work)
[react-css-modules](https://github.com/gajus/react-css-modules#the-implementation)

# react-native
## Road map: https://github.com/exponentjs/ex-navigation
* how to support animation, gesture
* fix the gap between react and react-native:
  1. fix the element difference: https://github.com/search?utf8=%E2%9C%93&q=react+native+web
  2. organize code:
  https://habd.as/awesome-react-boilerplates/#react-native
  3. platform specify code:
  https://facebook.github.io/react-native/releases/0.26/docs/platform-specific-code.html
  4. webpack 'alias' in 'resolve' section
  https://webpack.github.io/docs/configuration.html#resolve-alias
  5. ~~how the navigator work when integrate with native function?~~catalyst ui
* *rich text editor*
* ~~port forward in mac: http://superuser.com/questions/30917/how-to-make-a-port-forward-in-mac-os-x~~
* react-native navigator:
  https://github.com/exponentjs/ex-navigation

## nginx:
* **play the nginx starter tutorial**
* OPTION can be use for auth check and prevent api error
* sever domain.com for prod config
* [tsl](https://letsencrypt.org/getting-started/), [http2](https://www.nginx.com/blog/nginx-1-9-5/)
* open debug: https://coderwall.com/p/nmgwnw/debugging-nginx-rewrite
* map all backend api to each front end service instance automatically
* ~~auto reload the configs~~ ``docker-compose restart`` instead
* ~~support hash and test the history api~~
* ~~web socket to frontend and backend services in nginx~~
* ~~nginx container~~
* ~~if destination server unavailable, redirect to another one~~ set 404 default page

## web
* doc the pointer event usage, https://github.com/facebook/react/pull/12507, and the 300ms delay will be solved by browser
* review the product build process
* deploy to AWS
* upgrade to babel v7 when it ready
* ~~make redux hot reload~~
* gulp task for reducer and saga
* load all backend api when fontend server start
* put all express server instances under one shell script, use ONE command to start all service, ~~remove the docker dev~~
* ~~case sensitive check plugin in webpack~~
* **shell script for build production code, script to run production code**
    * copy the common code folder into each execute app
    * build code
    * launch the express
* **production optimize**:
  * [apply gzip in webpack build process](https://medium.com/@rajaraodv/two-quick-ways-to-reduce-react-apps-size-in-production-82226605771a)
  * [apply server push](https://www.smashingmagazine.com/2017/04/guide-http2-server-push/)
  * ~~[webpack bundle size plugin](https://www.npmjs.com/package/webpack-bundle-analyzer)~~
  * [express production settings](https://expressjs.com/en/advanced/best-practice-performance.html#use-gzip-compression)
  * [webpack build settings](https://webpack.js.org/guides/build-performance/)
  * [react router](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/code-splitting.md)
* production environment security setup http://expressjs.com/zh-cn/advanced/best-practice-security.html
* ~~the script should be able to read different configs at different environment~~ use env secure server
* doc how to use non-style component
* doc how to use shouldComponentUpdate, control the render of inner componenet
* move header into router, connect each component at root router, so no more repeat code
* ~~[the router push in saga](https://github.com/jfairbank/redux-saga-router)~~ use common history object
* the media query
* the [rxjs](https://github.com/Reactive-Extensions/RxJS) can use with complicated data interaction
* why reselect?
* Progressive Web App:
  * github: lighthouse,
  * [PWA course](https://www.youtube.com/watch?v=17kGWJOuL-A&list=PLNYkxOF6rcIAdnzEsWkg0KpMn2WJwMBmN)
  * [navigator.serviceworker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
  * [serviceworker webpack plugin](https://github.com/NekR/offline-plugin)
  * [mobile web w3c](https://www.w3.org/TR/mobile-bp/#d0e128)
  * [react component lazy load](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/code-splitting.md)
  * use the SSR to render ~~the basic html~~ for the search engine only.
    * stream rendering(v16)
    * [staticRouter](https://reacttraining.com/react-router/web/api/StaticRouter)
    * [Code Splitting and Server-Side Rendering](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/code-splitting.md#code-splitting-and-server-side-rendering)
    basic content in it so user can see some content without waiting,
    but how to handle the js render after the initial render
    * read cookie to know which page to be render(is auth?)
* [d3 with react](http://nicolashery.com/integrating-d3js-visualizations-in-a-react-app/)
* babel source map
* applied 'react-native-web' https://github.com/necolas/react-native-web
* unit test process, include UI test -- make sure app stable after small UI changes. Issue: support traditional non-js-render web(https://github.com/b00giZm/docker-compose-nodejs-examples/tree/master/03-express-gulp-watch)
* doc how to use async module(https://github.com/petehunt/webpack-howto)
* *auto install missing packages:https://github.com/webpack-contrib/npm-install-webpack-plugin*
* ~~hapi and backend container~~ use loopback
* ~~apply react fragment~~
* ~~pass file buffer to sharp in gulp task~~
* ~~smart redux action~~
* ~~change to material v1~~
* ~~env for client and server.~~
* ~~code structure for real big code base project~~
* ~~the folder structure of child project should be same as root project~~
* ~~different of font-size unit~~
* ~~[ignore click on touch devices](https://github.com/zilverline/react-tap-event-plugin#ignoring-ghost-clicks)~~ Deprecated
* ~~tap event support on web~~
* ~~how server side rendering work~~``renderToString in server side router``
* ~~[go through the es6 class](http://2ality.com/2015/02/es6-classes-final.html)~~
* ~~use WebpackDevServer.define a gulp task to: use production config and auto pack -> run the project using webpack and express in container~~
* ~~unified the entry of prod and dev~~done
* ~~web socket on express server~~
* ~~router strategic for prod and dev env~~replace with nginx
* ~~run gulp in an isolated container, observe code changes, send signal to other container~~run webpack, *hapi* as gulp tasks
* ~~gulp task to split the platform specified code with annotation~~use webpack resolve.alias
* ~~image component that can:~~
  * ~~a function that add screen info to all image requests[sharp](http://sharp.dimens.io/en/stable/api-output/#withmetadata)  [Responsive_images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)~~
  * ~~add query to image url base on screen resolution(runtime, support different window.devicePixelRatio)~~
  * ~~lazy load, only load the best suitable image for current screen resolution~~
  * ~~create place holder to avoid content reflow(get info from json file that auto generate by gulp plugin)[link](https://www.codecaptain.io/blog/web-development/responsive-images-and-preventing-page-reflow/474)~~, place error image when target image was not found
  * can use with the service worker cache: a global switch for service worker
  * response to font-size changes
  * ~~the documentation~~
* ~~apply immutable js~~
* ~~static resources server, apply hash to all resources~~
* ~~API to generate the resources link to other services,~~put in common folder instead
* ~~use webworker for web and mobile web~~ no need for now
* ~~run dirTree, generate atom package task~~
* ~~just use the webpack and setup an hapi server for production to serve all static files~~
* ~~hash for js files and change it in html~~

## backend:
* install [strongloop](https://docs.strongloop.com/display/SLC/Debugging+applications)
* handle high concurrency in node
* find a way to debug the code(start by gulp)

## android
* **many docker build process are similar to jenkins android build, search accordingly**
* **remove yarn.lock after yarn install and before android build**
* **learn how the redux work in android**
* **Change the android folder to adapt new folder structure**
* remove lfs resources, use init script to install it before building app
* adb response for apk install on device, **buck** and gradle response for compile the code to apk
* ~~gradle setup in container~~
* ~~finish the apk build-install-start process~~
* ~~add watchman to react-native packager~~
* ~apply docker-sync and new file structure to android and packager container~~
* switch packager container's network from NAT to bridge
* ~~packager not refresh after files change~~
  * ~~use gulp to restart the packager~~
  * ~~fix by:
https://github.com/facebook/react-native/issues/7257~~
  * ~~docker-sync: https://github.com/EugenMayer/docker-sync/wiki~~
  * ~~other solutions: https://github.com/EugenMayer/docker-sync/wiki/Alternatives-to-docker-sync~~
  * ~~packager not refresh after files change, because '*.lock' existing in current folder, use ``find $directory -type f -name "*.lock"`` to confirm.https://github.com/facebook/react-native/issues/4357~~
  * ~~related discussion:~~
    * ~~https://github.com/docker/docker/issues/15793~~
    * ~~https://github.com/docker/docker/issues/18246~~
* ~~try to decompose the android container, by learning how the react packager interact with build process, with link resource folder to build folder~~
* ~~set up a proxy for maven download~~
* **figure out how and where the js run in android**
* **use proxy for packager:https://github.com/silarsis/docker-proxy, put packager server link into android container env**
* request 'draw over other app' privilege
* android back button handler ``AndroidBackButtonBehavior``
* install react-native from npm only in the android container
* how to build android app in container. specify sdk version for app
  * integrate react-native to android project: https://facebook.github.io/react-native/docs/integration-with-existing-apps.html
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
  * a gulp task monitor the java code and when they changes, run the ``gradle assembleDebug`` command; ``gradle assembleRelease`` for production, **run ``gradle lint && gradle clean`` to verify any configuration error**
  * **run ``adb uninstall com.androidApp`` to clear app remaining and ``adb install -rdg app/build/outputs/apk/app-debug.apk``, run command in gradle task?**
  * ~~a systemd service to start the react native packager when container runs.(https://certsimple.com/blog/deploy-node-on-linux#node-js-ssl)~~put packager server in other container instead
  * ~~android support seems intall fail or the version of appcompat-v7 should be 25.0.0~~
  * ~~is NDK required for react-native?~~No, only required when change react-native android code
  * ~~figure out how gralde build an android application~~
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

# backend service
* token with hot reload
* restart dev server in gulp
* nodejs debug tool
* services share a common config list that define access auth to each data table, so service know which service should it talk to

# CI server
## prod:
* ~~use config for develop and production env~~
* ~~unit test~~, and do search about how to write unit test efficiently then doc it
* build docker image then push it to private registry.
* ~~use webpack to generate code then pack those code into image~~
  * ~~``webpack --config configs/webpack.prod.web_static.js -p`` to pack for product env~~
  * ~~put db link into environment variable~~manage env in project level
* generate documentation about:
  1. 'file hash -> build version' map
  2. ~~resource map(js, css map)~~
  3. release documentation(**what's that?**)
## dev:
* update code in app hub

# node environment
## prod:
* *link instead of cp node modules.*yarn cache is enough for now
* fix private npm module login issue:
https://docs.npmjs.com/private-modules/docker-and-private-modules
* similarly, fix clone code from private repo
* performance measure
* error, debug info logging, Profiling: https://www.npmjs.com/package/winston, can it record the request only when error happens?

## dev:
* ~~install project dependencies via node script
https://nodejs.org/api/child_process.html#child_process_child_process_execsync_command_options~~
* ~~a script to install package to particular project
``npm install --prefix ./src/web_static package name``~~
* ~~fix the npm install issue:
http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/~~
* ~~compile the nodejs code with webpack~~

# docker
* container for building and runtime
* sharable file and config between projects
* vault service for env storage
* **put the nginx endpoint in compose instead of .env**
* use rolling update to update k8s deployment
* ~~build multi containers.~~ ~~docker-compose already build those to configs_XXX, override the compose config with: https://docs.docker.com/compose/extends/#multiple-compose-files, add the codes and override it with volume in dev env~~
* ~~faster remove folder http://unix.stackexchange.com/questions/37329/efficiently-delete-large-directory-containing-thousands-of-files~~
* *change yarn registry to cnpm: https://cnodejs.org/topic/581d96d5bb9452c9052e7b58*
* generate the docker ignore file base on project, for web, ignore android resources, but how to leverage the compose
* **manage docker container in local using nodejs api**
  * sdk: https://docs.docker.com/engine/api/v1.27/#tag/Container
  * node api: https://github.com/apocas/dockerode
  * python: https://docs.docker.com/engine/api/sdks/
* **docker log:**
  * https://www.slideshare.net/raychaser/6-million-ways-to-log-in-docker-nyc-docker-meetup-12172014
  * https://github.com/veggiemonk/awesome-docker#monitoring--logging
* ~~build base images -- without the source code, but with global package like gulp~~
* ~~run the base image -- mount the source code, install dependencies, then run the webpack task~~
* ~~create docker ignore for each build: put under config folder, then copy it in each docker file~~
* ~~re-think the package.json file management~~src/project have project specify package, package under root only for atom eslint
* ~~avoid contaminate the origin file/folder~~
* ~~include android image process~~
* ~~use tini to make sure server stop as expect
  https://github.com/krallin/tini/issues/45#issuecomment-236117771
  https://github.com/krallin/tini~~

## prod:
* ~~overide the dev yaml setting~~
* apply production error track tool: https://sentry.io/welcome/

## dev:
* ~~create a volume for each service~~
* IOS development environment

* ~~option 1: generate error report as html, and set a express server for it~~
* ~~option 2: output to console directly~~
* android: use adb logcat --filter in android studio to track run time error, but build error?
* web_static: generate error report and use tail command in atom shell package

# github
* decide which cloud to use as CI
* webhook on github
  * on client side, do all unit test before commit
  * on server side, trigger CI server when commit into master

# ~~tree tool~~
# ~~source map~~
# ~~docker image watch issue~~solved in 1.13
~~https://github.com/brikis98/docker-osx-dev
https://github.com/rnplay/react-native-packager-docker/issues/1~~
