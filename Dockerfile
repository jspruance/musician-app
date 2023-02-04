FROM node:16.3.0-alpine

WORKDIR app

COPY . /app

RUN npm install 

EXPOSE 8050

CMD ["node", "app.js"]
