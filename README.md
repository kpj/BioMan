# BiotoolsManager

Dockerize bioinf tools for "better" usage. `Dockerfile` dockerizes the manager application itself.

Currently the service is running on port `3000`.

## Setup

The container expects its host to run docker swarm:

```bash
$ docker swarm init
$ docker swarm join --token <token> <ip>:<port> # on worker node
```

It furthermore requires an internal registry:

```bash
$ docker run -d -p 5000:5000 --restart=always --name registry registry
$ ./registry/build_images.sh
```

Finally, a network must be setup:

```bash
$ docker network create --driver overlay swarm_network
```

## Usage

Build the server image with

```bash
$ docker build -t kpj/bioman/manager .
```

and then run it using

```bash
$ docker run \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -p 3000:3000 \
  --net="host" \
  kpj/bioman/manager
```
