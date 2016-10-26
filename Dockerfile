## Dockerfile for tool-manager
FROM node
MAINTAINER kpj <kpjkpjkpjkpjkpjkpj@gmail.com>

# install docker
RUN apt-get update && apt-get install -y apt-transport-https
RUN echo "deb https://apt.dockerproject.org/repo debian-jessie main" >> /etc/apt/sources.list
RUN apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
RUN apt-get update && apt-get install -y docker-engine

# prepare environment
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install node dependencies
COPY node_app/package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /usr/src/app

# install node app
COPY node_app/ /usr/src/app/

EXPOSE 3000

CMD ["npm", "start"]
