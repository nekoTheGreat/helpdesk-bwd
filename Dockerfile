FROM webdevops/apache:ubuntu-18.04

COPY ./docker/apache/client.conf /opt/docker/etc/httpd/conf.d
COPY ./docker/apache/api.conf /opt/docker/etc/httpd/conf.d
COPY ./docker/supervisord/client.conf /opt/docker/etc/supervisor.d/client.conf
COPY ./docker/supervisord/api.conf /opt/docker/etc/supervisor.d/api.conf

RUN mkdir /app && \
    mkdir /var/www/bwd && \
    mkdir /var/www/bwd/api && \
    mkdir /var/www/bwd/client && \
    chown -R www-data:www-data /var/www/bwd/api && \
    chmod -R 755 /var/www/bwd
    
RUN apt-get update && \
    apt-get install -y software-properties-common gcc && \
    add-apt-repository -y ppa:deadsnakes/ppa && \
    apt-get update

RUN apt-get install -y python3.8 python3-distutils python3-pip python3-apt

RUN  curl -sL https://deb.nodesource.com/setup_16.x | bash - \
        && apt-get install -y nodejs

RUN a2enmod rewrite && \
    a2enmod proxy && \
    a2enmod proxy_http && \
    a2enmod proxy_balancer && \
    a2enmod lbmethod_byrequests && \
    service apache2 restart


WORKDIR /var/www/bwd

COPY ./api/requirements.txt /tmp/requirements.txt

RUN pip3 install -r /tmp/requirements.txt

ENV PYTHONPATH=/usr/bin/python3

WORKDIR /var/www/bwd/client

COPY ./nuxt/package.json /var/www/bwd/client

RUN npm install && npm run build