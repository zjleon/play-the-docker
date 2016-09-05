# install atom and its package
instruction to installation

# install docker
instruction to installation

# install docker-machine(only required on ubuntu)

# docker helper:
* build image:
``docker build --rm -t test_gradle -f configs/docker.dev.android .``
* run image(**all docker parameteor must add before image tag**):
```
docker run --privileged -it -v /home/zjleon/play-the-docker/src/ud867:/app -v /dev/bus/usb:/dev/bus/usb test_gradle
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
  1. download and install properer extend package: http://www.virtualbox.org/wiki/Download_Old_Builds
  2. create a new docker machine, then enable the usb controller in USB tab

# docker-compose helper
## 1. build docker images
``docker-compose -f configs/compose.dev.web_static.yml build``
## 2. start them all services
``docker-compose -f configs/compose.dev.web_static.yml up -d``
## 3. check the logs of web_static
``docker-compose -f configs/compose.dev.web_static.yml logs web_static``
