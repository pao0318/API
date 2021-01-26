#!/bin/bash

set -e

CONTAINER="node-exporter";
CONTAINER2="prometheus"
CONTAINER3="grafana"
GREEN_COLOR='\033[1;32m'
NO_COLOR='\033[0m'

# Node Exporter
echo "Removing old container [$CONTAINER] and starting new fresh instance of [$CONTAINER]"
(docker kill $CONTAINER || :) && \
  (docker rm $CONTAINER || :) && \
  docker run -d \
  --name $CONTAINER \
  --net="host" \
  --pid="host" \
  -v "/:/host:ro,rslave" \
  quay.io/prometheus/node-exporter:latest \
  --path.rootfs=/host

echo -e "${GREEN_COLOR}[$CONTAINER] has started successfully!${NO_COLOR}";

# Prometheus
echo "Removing old container [$CONTAINER2] and starting new fresh instance of [$CONTAINER2]"
(docker kill $CONTAINER2 || :) && \
  (docker rm $CONTAINER2 || :) && \
  docker run \
    --name $CONTAINER2 \
    -p 9090:9090 \
    -v $PWD/prometheus.yml:/etc/prometheus/prometheus.yml \
    -d prom/prometheus

echo -e "${GREEN_COLOR}[$CONTAINER2] has started successfully!${NO_COLOR}";

# Grafana
echo "Removing old container [$CONTAINER3] and starting new fresh instance of [$CONTAINER3]"
(docker kill $CONTAINER3 || :) && \
  (docker rm $CONTAINER3 || :) && \
  docker run \
  --name $CONTAINER3 \
  -d -p 9091:3000 grafana/grafana

echo -e "${GREEN_COLOR}[$CONTAINER3] has started successfully!${NO_COLOR}";