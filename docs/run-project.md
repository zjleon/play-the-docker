# first-time setup:
## install and config atom
```
// export packages and settings
pushd ~/.atom/ && zip -r -X atom.zip ./styles.less ./config.cson ./packages && popd && mv ~/.atom/atom.zip ./resources/atom.zip

// import packages and settings
unzip -o -u -C ./resources/atom.zip -d ~/.atom/
// under 'play-the-docker' folder, install linter packages
npm i
```
config linter-eslint: 'enable fix error on save'
config the flow-bin path in atom package 'linter-flow': ``./node_modules/.bin/flow``

## config git, use one of below option:
1. username and email
```
git config --global user.name "zjleon"
git config --global user.email zjleon2010@gmail.com
```
2. [setup the github ssh key](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/) then ``git remote set-url origin git@github.com:username/your-repository.git``

## config chrome:
1. install [redux-devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

## add flow type for new packages
1. run ``npm run flow-typed-search packageName`` to check if package has flow type support, or
1. find the library definition [here](https://github.com/flowtype/flow-typed/tree/master/definitions/npm)
1. use ``npm run flow-typed-install package@version`` to install
3. follow the instruction [here](https://flow.org/en/docs/react/redux/)
and [here](https://github.com/flowtype/flow-typed/wiki/Importing-And-Using-Type-Definitions)

## install docker
instruction to installation

## convert compose to kubernete
download: http://kompose.io/setup/

# android container build helper:
## development environment:
1. build image:
```
docker build -t test_gradle -f configs/docker.dev.android .
docker build -t packager -f configs/docker.dev.react_native_packager .
```
1. forward react-native packager for real phone visiting: ``$ ssh -L 192.168.2.1:8081:192.168.99.100:8081 -N 127.0.0.1``
1. run image(**all docker parameter must add before image tag**):
```
docker run -it -p 8081:8081 -v $(pwd)/src/android:/app packager
docker run --privileged -it -v $(pwd)/src/android:/app -v /dev/bus/usb:/dev/bus/usb test_gradle
docker run --privileged -it -v $(pwd)/src/android:/app -v /Volumes/VirtualBox:/var/media test_gradle bash
```
1. enter docker, ``$ adb logcat *:S ReactNative:V ReactNativeJS:V``
1. make sure device is not used by chrome: open ``chrome://inspect/#devices`` in chrome
* Mac only - enable usb function in virtual box
  1. open virtualbox, check it's version: Help - Contents
  2. download and install properer extend package: http://www.virtualbox.org/wiki/Download_Old_Builds
  3. stop the 'default' vm
  4. click 'settings' - ports - usb - enable USB controller - select usb 2.0
  5. plugin the device, click 'add new usb filter' on the bottom right of the window, select the device name
  5. run ``df`` and make sure there is a row ends with '/Volumes/VirtualBox'
  6. unplug the device, detachable start the vm, restart docker machine in command line
  7. run docker image with ``-v /Volumes/VirtualBox:/var/media``

* connect genymotion on Mac:
  1. disable host machine's adb before start genymotion:
  ``$ adb kill-server``
  2. in host machine:
  ```
  adb devices // mark the device ip
  adb tcpip 5559 // OPTIONAL: change the device or simulator port, to avoid adb conflict
  ```
  3. disable host machine's adb:
  ``$ adb kill-server``
  4. in container, connect to the host simulator:
  ```
  adb connect 192.168.56.101:5555 //connect to remote devices
  ```
  then use gradle task to build and install apk
* to install the apk to device, uninstall it first
* [maven repository](https://mvnrepository.com/repos)

# web container build helper:
* use source-map to debug in prod, in source panel of chrome debug tool, click webpack
## development environment:
```
docker build -t asia.gcr.io/pwc-mwc-app/phone -f configs/docker.dev.web_static --build-arg PROJECT=phone .
docker build -t asia.gcr.io/pwc-mwc-app/tv -f configs/docker.dev.web_static --build-arg PROJECT=tv .
docker build -t asia.gcr.io/pwc-mwc-app/nginx -f configs/docker.prod.nginx .
```
* run image(**all docker parameter must add before image tag**):
```
docker run -it -p 8080:8080 -v $(pwd)/src/phone:/app -v $(pwd)/src/reusableComponents:/app/common asia.gcr.io/pwc-mwc-app/phone
docker run -it -p 8080:8080 -v $(pwd)/src/phone:/app asia.gcr.io/pwc-mwc-app/phone
docker run -it -p 8081:8081 -v $(pwd)/src/tv:/app asia.gcr.io/pwc-mwc-app/tv
docker run -it -p 3000:3000 -v $(pwd)/configs:/etc/nginx nginx
```

## production environment:
1. test in local: check docker-compose helper
1. push image:
```
/bin/bash ./scripts/gcloud.push_images.sh
```
1. deploy to kubernete:
```
kompose -f configs/compose.prod.yml up
// or
kompose -f configs/compose.prod.yml convert
kubectl create -f phone-deployment.yaml -f tv-deployment.yaml
```


# docker-compose helper
## 1. build docker images
``docker-compose -f configs/compose.prod.yml -f configs/compose.dev.yml build``
for production build:
``docker-compose -f configs/compose.prod.yml build``
## 2. start all services
``docker-compose -f configs/compose.prod.yml -f configs/compose.dev.yml up``
for production build:
``docker-compose -f configs/compose.prod.yml up``
## 3. check the logs of web_static
``docker-compose -f configs/compose.prod.yml logs web_static``
## 4. check status:
``docker-compose -f configs/compose.prod.yml ps``
## 4. restart nginx service:
``docker-compose -f configs/compose.prod.yml restart nginx``
## 1. clear non-used images and containers to free space
install this tool: https://github.com/zzrotdesign/docker-clean#homebrew-install
or:
```
# Delete all stopped containers
docker ps -q -f status=exited | xargs docker rm
# Delete all dangling (unused) images
docker images -q -f dangling=true | xargs docker rmi
```

# remove docker on mac:
`` sudo ./scripts/docker.uninstall.sh``
