# infrastructure
``./common/Router.js`` is where the actual logic lives
``./index.js`` is only responsible for referring ``./common/Router.js`` and do the hot-reloading stuff
``./redux/reducers/index.js`` is the entry for all the reducers

# env config
``.env.development`` is where the local env setting with and without docker lives
``.env.production`` is where the production env setting lives(in docker)

# (recommanded) install eslint in your editor

# websocket config
``./.env`` is where the socket url lives
## usage:
* once the app start, the socket will be set automatically, and an action will be dispatched like:
```
{
  type: 'SOCKET_OPEN',
}
```

* once a message is arrived the client side, an action will be dispatched with format:
```
{
  type: 'SOCKET_MESSAGE_ARRIVED',
  message,
}
```
and in each saga, use ``takeEvery('SOCKET_MESSAGE_ARRIVED', handler)`` to get the message

* To send a message, dispatched below action:
```
{
  type: 'SOCKET_SEND_MESSSGE',
  message,
}
```

# make file changes hot reload:
In ``index.js``, add file names in:
```
if (module.hot) {
  module.hot.accept('./common/Router.js', () => {
    hotRender()
  })
  module.hot.accept('./redux/store.js', () => {
    hotRender()
  })
}
```

# the image auto resize component:
this component will automatically create images for different screen resolution, use lazy load and avoid page reflow
config lives in gulp.dev and .env
usage:
```
<ImageContainer
  name={'test.jpg'} />
```

# actions, reducers will be import by gulp tasks automatically
Any file creation that path match pattern modules/moduleName/action(s).js or shared/namedAction(s).js will be added to ``configs/gulpGenerated/actions``, same for reducers

## Action type pattern
Actions should live in the actions.js file of related business modules or shared folder

## Reducer pattern
