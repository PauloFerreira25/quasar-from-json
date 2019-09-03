FROM node as app_build

RUN npm i -g @quasar/cli

COPY . /source

WORKDIR /source

RUN npm i
RUN quasar build
RUN cp -R dist/spa /app

FROM nginx

COPY --from=app_build /app /app

COPY nginx/default.conf /etc/nginx/conf.d
