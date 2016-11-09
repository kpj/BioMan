# leave current swarm
eval $(docker-machine env -u)

yes | docker-machine rm swarm-master
yes | docker-machine rm swarm-agent-00
yes | docker-machine rm swarm-agent-01

# create new one
token=$(docker run swarm create) && echo $token

docker-machine create \
  -d virtualbox \
  --swarm \
  --swarm-master \
  --swarm-discovery token://$token \
  swarm-master

docker-machine create \
  -d virtualbox \
  --swarm \
  --swarm-discovery token://$token \
  swarm-agent-00

docker-machine create \
  -d virtualbox \
  --swarm \
  --swarm-discovery token://$token \
  swarm-agent-01

# check if it worked
eval $(docker-machine env --swarm swarm-master)
docker info
docker-machine ls

echo "Token: $token"
