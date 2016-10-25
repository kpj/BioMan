## Dockerfile for tool-manager
FROM node

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
