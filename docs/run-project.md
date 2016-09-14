# install atom and its package
instruction to installation

# install docker
instruction to installation

# install docker-machine(only required on ubuntu)

# docker helper:
* build image:
``docker build --rm -t test_gradle -f configs/docker.dev.android .``
* run image(**all docker parameter must add before image tag**):
```
docker run --privileged -it -v /dev/bus/usb:/dev/bus/usb test_gradle
docker run --privileged -it -v /Users/appledev114/Desktop/practise/docker/src/ud867:/app test_gradle
```
* clear non-used images and containers to free space
```
# Delete all stopped containers
docker ps -q -f status=exited | xargs --no-run-if-empty docker rm
# Delete all dangling (unused) images
docker images -q -f dangling=true | xargs --no-run-if-empty docker rmi
```
* Mac only - enable usb function in virtual box
  1. open virtualbox, check it's version: Help - Contents
  2. download and install properer extend package: http://www.virtualbox.org/wiki/Download_Old_Builds
  3. stop the 'default' vm
  4. click 'settings' - ports - usb - enable USB controller - select usb 2.0
  5. plugin the device, click 'add new usb filter' on the bottom right of the window, select the device name
  6. unplug the device, detachable start the vm, restart docker machine in command line
  7. check ``$ docker-machine ls``
* connect genymotion on Mac:
  2. disable host machine's adb before start genymotion:
  ``$ adb kill-server``
  1. in host machine:
  ```
  adb devices // mark the device ip
  adb tcpip 5559 // OPTIONAL: change the device or simulator port
  ```
  2. disable host machine's adb:
  ``$ adb kill-server``
  2. in container, connect to the host simulator:
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
