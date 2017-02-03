# container:
* web_static: build and hold web app resources
* android: build android code with react-native

# key feature:
* use docker to isolate each build environment, manage by docker-compose
* use webpack to build web front end code(react)
* use gradle to build android code(react-native)
* run unit test, eslint in atom and build process
* auto generate [project_structure](../docs/project_structure.md) after each build.
