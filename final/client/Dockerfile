# base js node image
FROM node:alpine AS build

# copy files into image
ADD . /app
WORKDIR /app

# update npm
RUN npm install -g npm@8.19.3
# update packages list
RUN npm install -g npm-check-updates
RUN ncu -u
# install packages
RUN npm config set unsafe-perm true
RUN npm install
RUN npm install axios --save
# fix permission issues with node_modules and docker
RUN chown -R node /app
# add node_modules to path
ENV PATH="./node_modules/.bin:$PATH"
# build react app
RUN npm run build
USER node

# nginx
FROM nginx 
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# put react build into the nginx directory
COPY --from=build /app/build /usr/share/nginx/html