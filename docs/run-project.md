# pre-request:
## install atom and its package
```
// export packages
apm list --installed --bare > configs/atom.packages.txt
// import packages
apm install --packages-file atom.packages.txt
```

## install docker
instruction to installation

## convert compose to kubernete
download: http://kompose.io/setup/

# web container helper:
* use source-map to debug in prod, in source panel of chrome debug tool, click webpack

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

# web container build helper:
## development environment:
```
docker build -t web_static -f configs/docker.dev.web_static .
```
* run image(**all docker parameter must add before image tag**):
```
docker run -it -p 8080:8080 -v $(pwd)/src/web_static:/app -v $(pwd)/src/reusableComponents:/app/common web_static
```

## production environment:
1. build image:
``docker build -t asia.gcr.io/pg-us-e-app-518137/phone:prod -f configs/docker.prod.web_static  --build-arg PROJECT=phone .
``
1. test in local: check docker-compose helper
1. convert the production config files: ``kompose -f configs/compose.prod.yml convert``
1. deploy to kubernete:


# docker-compose helper
## 1. build docker images
``docker-compose -f configs/compose.dev.yml build``
## 2. start them all services
``docker-compose -f configs/compose.dev.yml up -d``
## 3. check the logs of web_static
``docker-compose -f configs/compose.dev.yml logs web_static``
## 4. check status:
``docker-compose -f configs/compose.prod.yml -f configs/compose.dev.yml ps``
## 1. clear non-used images and containers to free space
```
# Delete all stopped containers
docker ps -q -f status=exited | xargs docker rm
# Delete all dangling (unused) images
docker images -q -f dangling=true | xargs docker rmi
```

# convert compose to kubernete:
1. download the convert tool: http://kompose.io/setup/
1. convert the production config files: ``kompose -f configs/compose.prod.yml convert``


# [maven repository](https://mvnrepository.com/repos)

# remove docker on mac:
`` sudo ./scripts/docker.uninstall.sh``
