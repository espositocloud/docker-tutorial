# Docker Tutorial

[![](https://images.microbadger.com/badges/image/kobe25/docker-tutorial.svg)](https://microbadger.com/images/kobe25/docker-tutorial "Get your own image badge on microbadger.com")

This simple web application has been built as an example/tutorial for
introducing [Docker](https://www.docker.com/) and [Docker
Compose](https://docs.docker.com/compose/) features in a
[talk](http://informatica.uniurb.it/seminars/linux-containers-e-docker/) for the
Applied Computer Science course at University of Urbino.

The application consists of a database of students and grades, to show how is
easy to setup an application composed of more services (such as an application
server and a database management system)

## Setup

To run the application install
[Docker](https://docs.docker.com/engine/installation/) and [Docker
Compose](https://docs.docker.com/compose/install/), then run:

```
$ docker-compose up -d
```

To check the status:

```
$ docker-compose ps

        Name                   Command            State            Ports
----------------------------------------------------------------------------------
dockertutorial_app_1   /bin/sh -c python app.py   Up      127.0.0.1:8000->8000/tcp
dockertutorial_db_1    /entrypoint.sh mongod      Up      27017/tcp
```

To see the log:

```
$ docker-compose logs
```

See `docker-compose help` for additional information.
