FROM mysql:5.7.36

ENV MYSQL_ROOT_PASSWORD test123

EXPOSE 3306

COPY ./docker /docker-entrypoint-initdb.d

RUN chmod -R 775 /docker-entrypoint-initdb.d
