FROM nginx

# TODO: Mudar o nome do folder
COPY dist/spa /app
COPY nginx/default.conf /etc/nginx/conf.d
