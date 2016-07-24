# 1.build docker images
``docker-compose -f configs/compose.dev.web_static.yml build``
# 2.start them all services
``docker-compose -f configs/compose.dev.web_static.yml up -d``
# 3.check the logs of web_static
``docker-compose -f configs/compose.dev.web_static.yml logs web_static
