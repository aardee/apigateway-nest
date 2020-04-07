#!/bin/sh

cat <<EOF > service.rendered.json
{
  "Name": "apigateway",
  "Tags": [
    "API Gateway"
  ],
  "Address": "${POD_IP}",
  "Port": 3000,
  "Check": {
    "Method": "GET",
    "HTTP": "http://${POD_IP}:3000/health",
    "Interval": "1s"
  }
}
EOF

curl \
    --request PUT \
    --data @service.rendered.json \
    "http://$HOST_IP:8500/v1/agent/service/register"
