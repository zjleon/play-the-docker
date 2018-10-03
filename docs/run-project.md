# first-time setup:

## Setup for linux only:
https://stackoverflow.com/questions/22475849/node-js-error-enospc/32600959#32600959

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

# web service helper:

## docker
### run postgres container on local
``docker run -d --rm -v DBVolume:/var/lib/postgresql/data -e POSTGRES_PASSWORD=example -e POSTGRES_DB=webDB -e PGDATA=/var/lib/postgresql/data/pgdata -p 5432:5432 postgres``

### run all services at once(production mode)
1. build all web services(may need to install docker-compose):
``docker-compose -f configs/compose.web.yml -f configs/compose.web.local.yml build``
2. run them
``docker-compose -f configs/compose.web.yml -f configs/compose.web.local.yml up``

## AWS
## Preparation on your local
1. install aws cli:
``pip install awscli --upgrade --user``
2. config aws cli IAM:
``aws configure``
3. install aws ecs cli(**remember to set the cli permission**):
https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_CLI_installation.html

## Setup network and cluster in AWS
1. create cluster:
``aws ecs create-cluster --cluster-name web-cluster``
2. create task definition from docker file:
``ecs-cli compose -p web -f ./configs/compose.web.yml --ecs-params ./configs/ecs.task.definition.params.yml create --launch-type FARGATE -c web-cluster --create-log-groups``
3. VPC in cloud console
4. create namespace for service discovery:
``aws servicediscovery create-private-dns-namespace --name service-discovery-namespace --vpc vpc-029a32644eaca0dba --region us-east-2``
5. create service for service discovery:
``aws servicediscovery create-service --name web-service-discovery-service --dns-config 'NamespaceId="ns-npp246z3pebsa7wz",DnsRecords=[{Type="A",TTL="300"}]' --health-check-custom-config FailureThreshold=1 --region us-east-2``

## Deploy container via service
1. create a service for deployment:
``aws ecs create-service --cli-input-json file://configs/ecs.web.service.deployment.json --region us-east-2``
*Update service after creating new task definition:
``aws ecs update-service --cluster web-cluster --service web-service-deployment --task-definition web``*
2. get public ip:
1. go into the cluster via cloud console
2. click the task
3. check the public ip assign via fargate
