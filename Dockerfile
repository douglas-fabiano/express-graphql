FROM node:12

COPY package.json /conta-corrente-graphql/package.json
COPY yarn.lock /conta-corrente-graphql/yarn.lock

WORKDIR /conta-corrente-graphql

RUN yarn install

COPY . /conta-corrente-graphql

RUN yarn build

EXPOSE 8000

CMD [ "yarn", "start" ]


# FROM node:12 AS build-stage

# COPY package.json /conta-corrente-graphql/package.json
# COPY yarn.lock /conta-corrente-graphql/yarn.lock

# WORKDIR /conta-corrente-graphql

# RUN yarn

# COPY . /conta-corrente-graphql

# RUN yarn build

# FROM build-stage

# COPY --from=build-stage /conta-corrente-graphql/dist dist
# COPY --from=build-stage /conta-corrente-graphql/node_modules node_modules
# COPY --from=build-stage /conta-corrente-graphql/package.json package.json

# CMD [ "yarn", "start" ]
