FROM node:16

ARG WORK_DIR=/var/src/node
WORKDIR ${WORK_DIR}

COPY package*.json ./
COPY config ./config

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build
RUN rm -rf node_modules && yarn

EXPOSE 3001
CMD yarn run start:dev