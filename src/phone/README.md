# infrastructure
``./common/Router.js`` is where the actual logic lives
``./index.js`` is only responsible for referring ``./common/Router.js`` and do the hot-reloading stuff
``./redux/reducers/index.js`` is the entry for all the reducers

# env config
``development.env`` is where the local env setting with and without docker lives
``production.env`` is where the production env setting lives(in docker)
