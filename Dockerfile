FROM node
RUN mkdir -p /src/app
WORKDIR /usr/src/app
COPY package.json /src/app/package.json
RUN npm install
COPY . /src/app
EXPOSE 8000
CMD [ "npm", "start" ]
