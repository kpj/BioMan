# BiotoolsManager

Dockerize bioinf tools for "better" usage. `Dockerfile` dockerizes the manager application itself.

Currently the service is running on port `3000`.

## Usage

Build the server image with

```bash
$ docker build -t kpj/bioman .
```

and then run it using

```bash
$ docker run -v /var/run/docker.sock:/var/run/docker.sock -p 3000:3000 kpj/bioman
```

The container expects its host to run docker swarm:

```bash
$ docker swarm init
$ docker swarm join --token <token> <ip>:<port> # on worker node
```
