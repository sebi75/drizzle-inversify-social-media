FROM node:18

WORKDIR /usr/src/app
COPY package*.json ./

# installing netcat for checking that mysql server is up before trying to connect to it
RUN apt-get update && apt-get install -y netcat-openbsd && npm install -g pnpm && pnpm install

# copy the rest of the files into
# the working directory /usr/src/app
COPY . .

RUN pnpm build

EXPOSE 8081

CMD ["pnpm", "start"]