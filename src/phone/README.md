# infrastructure
``./common/Router.js`` is where the actual logic lives
``./index.js`` is only responsible for referring ``./common/Router.js`` and do the hot-reloading stuff
``./redux/reducers/index.js`` is the entry for all the reducers

# env config
``development.env`` is where the local env setting with and without docker lives
``production.env`` is where the production env setting lives(in docker)

# (recommanded) install eslint in your editor

# websocket config
``./.env`` is where the socket url lives
## usage:
once the app start, the socket will be set automatically
once a message is arrived the client side, an action will be dispatch with format:
```
{
  type: 'SOCKET_MESSAGE_ARRIVED',
  message,
}
```
and in each saga, use ``takeEvery('SOCKET_MESSAGE_ARRIVED', handler)`` to get the message
