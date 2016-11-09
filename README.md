# BiotoolsManager

Dockerize bioinf tools for "better" usage. `Dockerfile` dockerizes the manager application itself.

Currently the service is running on port `3000`.

## Setup

### Registry

Start and populate the internal registry with

```bash
$ docker run -d -p 5000:5000 --restart=always --name registry registry
$ ./registry/build_images.sh
```

Query its content with

```bash
$ curl -s http://localhost:5000/v2/_catalog
```

### Swarm

Create swarm discovery:

```bash
$ token=$(docker run swarm create) && echo $token
```

Add swarm manager:

```bash
$ docker-machine create \
  -d virtualbox \
  --swarm \
  --swarm-master \
  --swarm-discovery token://$token \
  swarm-master
```

Add agents (repeat with different name for multiple agents):

```bash
$ docker-machine create \
  -d virtualbox \
  --swarm \
  --swarm-discovery token://$token \
  swarm-agent-00
```

See `scripts/setup_swarm.sh`.

## Usage

Build the server image with

```bash
$ docker build -t kpj/bioman/manager .
```

and then run it using

```bash
$ eval $(docker-machine env --swarm swarm-master)
$ docker run \
  -e "TOKEN=$token"
  -v /var/run/docker.sock:/var/run/docker.sock \
  -p 3000:3000 \
  kpj/bioman/manager
```
