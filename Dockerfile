############################################################
# Dockerfile to run Apache usergrid_
# Based on Ubuntu Image
############################################################

# Set the base image to use to Ubuntu
FROM ubuntu

MAINTAINER Gabor Wnuk <gabor.wnuk@me.com>

RUN mkdir /usergrid-portal
WORKDIR /usergrid-portal

RUN apt-get update
RUN apt-get install -y python
RUN apt-get install -y wget curl


RUN curl -sLo /usr/local/bin/ep https://github.com/kreuzwerker/envplate/releases/download/v0.0.5/ep-linux && chmod +x /usr/local/bin/ep


ADD usergrid-portal /usergrid-portal

EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/ep", "/usergrid-portal/config.js", "--", "/usr/bin/python"]
CMD ["-m", "SimpleHTTPServer", "3000"]
