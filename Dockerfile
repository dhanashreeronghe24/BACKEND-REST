#comment
FROM node:14
#create app directory
WORKDIR /usr/src/app
#Install dependencies
COPY package*.json ./
RUN npm install
#Bundle app source
COPY . .
#Expose port & run application
EXPOSE 3000
CMD ["npm","run", "start-ts"]