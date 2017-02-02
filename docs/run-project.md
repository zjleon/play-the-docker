# install atom and its package
instruction to installation

# install docker
instruction to installation

# docker helper:
* build image:
```
docker build -t test_gradle -f configs/docker.dev.android .
docker build -t packager -f configs/docker.dev.react_native_packager .
```
* react-native packager port forward: ``$ ssh -L 192.168.2.1:8081:192.168.99.100:8081 -N 127.0.0.1``
* run image(**all docker parameter must add before image tag**):
```
docker run -it -p 8081:8081 -v $(pwd)/src/android:/app packager
docker run --privileged -it -v $(pwd)/src/android:/app -v /dev/bus/usb:/dev/bus/usb test_gradle
docker run --privileged -it -v $(pwd)/src/android:/app -v /Volumes/VirtualBox:/var/media test_gradle bash
```
* enter docker, ``$ adb logcat *:S ReactNative:V ReactNativeJS:V``
* make sure device is not used by chrome: open ``chrome://inspect/#devices`` in chrome
* clear non-used images and containers to free space
```
# Delete all stopped containers
docker ps -q -f status=exited | xargs docker rm
# Delete all dangling (unused) images
docker images -q -f dangling=true | xargs docker rmi
```
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

# docker-compose helper
## 1. build docker images
``docker-compose -f configs/compose.dev.web_static.yml build``
## 2. start them all services
``docker-compose -f configs/compose.dev.web_static.yml up -d``
## 3. check the logs of web_static
``docker-compose -f configs/compose.dev.web_static.yml logs web_static``

# [maven repository](https://mvnrepository.com/repos)

# remove docker on mac:
`` sudo ./scripts/docker.uninstall.sh``
