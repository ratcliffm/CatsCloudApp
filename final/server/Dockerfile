# python image
FROM python:3.9
# EXPOSE 5432

# copy files to image
ADD . /server
WORKDIR /server

# install packages
RUN pip install -r requirements.txt
