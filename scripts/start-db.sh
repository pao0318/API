#!/bin/bash

set -e

CONTAINER="postgis";
GREEN_COLOR='\033[1;32m'
NO_COLOR='\033[0m'

echo "Removing old container [$CONTAINER] and starting new fresh instance of [$CONTAINER]"
(docker kill $CONTAINER || :) && \
  (docker rm $CONTAINER || :) && \
  docker run --name $CONTAINER \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_USER=root \
  -e ALLOW_IP_RANGE=0.0.0.0/0 \
  -p 5432:5432  \
  -v /database/postgres:/var/lib/postgresql/data \
  -d kartoza/postgis:9.6-2.4 \

echo -e "${GREEN_COLOR}[$CONTAINER] has started successfully!${NO_COLOR}";