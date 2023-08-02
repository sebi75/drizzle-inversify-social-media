This is not a production ready project. It is just a sample project mainly
created for learning purposes ( and also for fun ).

The purpose of this repository is to display
how to create a project using the haxagonal architecture pattern with inversify
in a nodejs application with cutting edge ORM drizzle and message broker RabbitMQ
with publisher-consumer pattern where it makes sense ( like feed generations )

## Why am I using Webpack?

1. To bundle the code and to make it easier to run the project and for other meta programming purposes like aliased imports.

2. To make it easier to split the services for deployment, considering for example the queue worker will be another instance(s) that will be running on a different machine.

3. It is the closest feel to a compiled language, the result being only one js minified bundle file that can be run on any machine that has the right nodejs version, without other hassles.

## Why am I using docker and docker-compose?

1. To emulate a production environment and make the development process easier for anyone who wants to run the project, establishing a standard environment for everyone.

2. To make it easier to deploy the project in a production environment ( considering the project is not production ready yet ) especially using kubeernetes or aws ecs.
