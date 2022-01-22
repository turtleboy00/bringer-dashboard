FROM node

WORKDIR /usr/src/bringer
EXPOSE 3000

COPY . .
RUN mv example.env .env
RUN export REACT_APP_BE_PORT=9030
RUN npm i
CMD [ "npm", "start" ]