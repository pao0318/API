#!/bin/bash

set -e

CONTAINER="redis";
GREEN_COLOR='\033[1;32m'
NO_COLOR='\033[0m'

echo "Removing old container [$CONTAINER] and starting new fresh instance of [$CONTAINER]"
(docker kill $CONTAINER || :) && \
  (docker rm $CONTAINER || :) && \
  docker run --name $CONTAINER \
  -p 6379:6379  \
  -d redis:6.0-alpine \

echo -e "${GREEN_COLOR}[$CONTAINER] has started successfully!${NO_COLOR}";