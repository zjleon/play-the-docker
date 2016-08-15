# install atom and its package
instruction to installation

# install docker
instruction to installation

# install docker-machine(only required on ubuntu)

# docker helper:
* build image:
``docker build -t test_gradle -f configs/docker.dev.android .``
* run image(**all docker parameteor must add before image tag**):
```
docker run -it -v /home/zjleon/play-the-docker/src/ud867:/app test_gradle
docker run -it -v /Users/appledev114/Desktop/practise/docker/src/ud867:/app test_gradle
```

# docker-compose helper
## 1. build docker images
``docker-compose -f configs/compose.dev.web_static.yml build``
## 2. start them all services
``docker-compose -f configs/compose.dev.web_static.yml up -d``
## 3. check the logs of web_static
``docker-compose -f configs/compose.dev.web_static.yml logs web_static``
