FROM node:18

WORKDIR /javaScriptSQLpracticeRemote/wigglz-module

COPY . .

RUN npm init -y && \
    npm install express

EXPOSE 3000

CMD ["node", "index.js"]
