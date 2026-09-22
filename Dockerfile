# dev.xlaunch.work — plain HTML, CSS and JavaScript served by nginx.
#
# There is nothing to build: the image is nginx plus the files in site/, and
# the security headers are the file the site ships with.

FROM nginx:1.29-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY security-headers.conf /etc/nginx/xlaunch/security-headers.conf
COPY site/ /usr/share/nginx/html/

# Served files are world-readable whatever mode they carried on the build host.
RUN chmod -R a+rX /usr/share/nginx/html

EXPOSE 80
