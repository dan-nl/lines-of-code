# lines-of-code

this project was generated with [angular cli](https://github.com/angular/angular-cli) version 1.3.1.


## table of contents
1. [getting started](#getting-started)
    1. [installation dependencies](#installation-dependencies)
    1. [clone the repo](#clone-the-repo)
    1. [install application dependencies](#install-application-dependencies)
1. [start the application](#start-the-application)
1. [running unit tests](#running-unit-tests)
    1. [with code coverage](#with-code-coverage)
1. [coding challenge](LinesOfCode.md)


## getting started
### installation dependencies
you need to make sure you have the following installation dependencies installed on the computer where you will run the application; a version number is indicated when a dependency has a minimum requirement.

* cli
* default browser ( modern )
* git ( v2.10.1 )
* node ( v6.11.2 )
* npm ( v3.10.10 )


### clone the repo
create a local project directory and clone the repo into that directory. replace the content between `<>` with your related directory information.
``` sh
mkdir -p <local/project/directory>/lines-of-code
git clone https://github.com/dan-nl/lines-of-code.git <local/project/directory>
```


### install application dependencies
change directory to the new project directory and install application dependencies. replace the content between `<>` with your related directory information.
``` sh
cd <local/project/directory>/lines-of-code
npm install
```


## start the application
start the application with the following command; the `-o` flag will automatically open your default browser to the application.
``` sh
ng serve -o
```


## running unit tests
run unit tests with [karma](https://karma-runner.github.io) by issuing the following command.
```sh
ng test
```


### with code coverage
run unit tests with [karma](https://karma-runner.github.io) and create a code coverage report with [istanbul](https://github.com/mattlewis92/karma-coverage-istanbul-reporter) by issuing the following command; coverage report will be in the coverage/ directory.
```sh
ng test --code-coverage
```
