FROM node:20-alpine
WORKDIR /app
COPY . .
RUN apk update
RUN apk add mysql-client
RUN apk add mariadb-connector-c
RUN npm install
CMD npm run init -- -u root -h quizdb.quiz; npm run populate -- -u quiz --password=quiz_password -h quizdb.quiz; npm start -- --database_host=quizdb.quiz
EXPOSE 3000
