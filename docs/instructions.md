# atom packages management:
* import packages
``apm install --packages-file ./configs/atom.packages.txt``
* export packages
``apm list --installed --bare > ./configs/atom.packages.txt``

# docker helper:
* installation
**instruction to installation**
* build image:
``docker build -t test_gradle -f configs/docker.dev.android .``
* run image(**all docker parameteor must add before image tag**):
```
docker run -it -v /home/zjleon/play-the-docker/src/ud867:/app test_gradle
docker run -it -v /Users/appledev114/Desktop/practise/docker/src/ud867:/app test_gradle
```

# docker-compose helper
* installation
**instruction to installation**
## 1. build docker images
``docker-compose -f configs/compose.dev.web_static.yml build``
## 2. start them all services
``docker-compose -f configs/compose.dev.web_static.yml up -d``
## 3. check the logs of web_static
``docker-compose -f configs/compose.dev.web_static.yml logs web_static
