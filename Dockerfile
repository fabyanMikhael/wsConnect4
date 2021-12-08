FROM node:16

# Create app directory
WORKDIR /app

COPY ./client ./client
COPY wsEnums.js ./wsEnums.js
RUN cd ./client && npm i && npm run build 
RUN cp -R ./client/public ./public
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./server/package*.json ./

RUN npm install
# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY ./server .

EXPOSE 80
CMD [ "node", "server.js" ]