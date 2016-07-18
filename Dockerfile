FROM node 
MAINTAINER Brandon Max <bmax1337@gmail.com>

ENV NODE_VERSION 5.4.0

RUN apt-get update && \
    apt-get install --no-install-recommends -yq \
    curl 

RUN apt-get remove --purge -yq \
        unattended-upgrades \
        software-properties-common \
    && \
    apt-get autoclean -y && \
    apt-get autoremove -y && \
    rm -rf /tmp/* /var/tmp/* && \
    rm -rf /var/lib/apt/lists/*


#add or copy source code here so it can have a package.json to load from
COPY ./ /src/

WORKDIR /src

RUN npm install && \
        npm run build
EXPOSE 3000

CMD npm start
