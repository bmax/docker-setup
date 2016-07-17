FROM node

ADD package.json /usr/local/srv/mmo/package.json
RUN cd /usr/local/srv/mmo && npm install

ADD ./dist /usr/local/srv/mmo

EXPOSE 3000

CMD ["npm", "start"]
