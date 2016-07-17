FROM nginx
MAINTAINER Brandon Max <bmax1337@gmail.com>

ENV SERVER_GZIP_OPTIONS 1

ENV NODE_VERSION 5.4.0

RUN apt-get update && \
    apt-get install --no-install-recommends -yq \
    curl 

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" \
      && tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 \
      && rm "node-v$NODE_VERSION-linux-x64.tar.gz"

RUN apt-get remove --purge -yq \
        unattended-upgrades \
        software-properties-common \
    && \
    apt-get autoclean -y && \
    apt-get autoremove -y && \
    rm -rf /tmp/* /var/tmp/* && \
    rm -rf /var/lib/apt/lists/* && \
    \
    # Prepare the final resting place for the application \
    mkdir -p /var/www/html

# Ensure application code makes it into the /app directory
COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /app
