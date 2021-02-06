#!/bin/bash

set -e

CONTAINER="redis-admin";
GREEN_COLOR='\033[1;32m'
NO_COLOR='\033[0m'

echo "Removing old container [$CONTAINER] and starting new fresh instance of [$CONTAINER]"
(docker kill $CONTAINER || :) && \
  (docker rm $CONTAINER || :) && \
  docker run --name $CONTAINER \
  -p 8081:8081  \
  -d redis-commander \

echo -e "${GREEN_COLOR}[$CONTAINER] has started successfully!${NO_COLOR}";