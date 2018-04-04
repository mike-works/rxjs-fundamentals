<p align='center'>
  <a href="https://mike.works" target='_blank'>
    <img height=40 src='https://assets.mike.works/img/login_logo-33a9e523d451fb0d902f73d5452d4a0b.png' />
  </a> 
</p>
<p align='center'>
  <a href="https://mike.works/course/sql-fundamentals-ad811af" target='_blank'>
    <img height=150 src='https://user-images.githubusercontent.com/558005/33009968-b8a0ea60-cd7c-11e7-81af-b48a6273b12b.png' />
  </a>
</p>
<p align='center'>
  <a href="https://mike.works/course/professional-sql-c9c7184" target='_blank'>
    <img height=150 src='https://user-images.githubusercontent.com/558005/38008070-40db7658-3212-11e8-879e-7efcf767777e.png' />
  </a>
</p>
<p align='center'>
  <a href="https://travis-ci.org/mike-works/sql-fundamentals?branch=solutions-pro" title="Build Status">
    <img title="Build Status" src="https://travis-ci.org/mike-works/sql-fundamentals.svg?branch=solutions-pro"/>
  </a>
  <a href="https://mike.works/course/sql-fundamentals-ad811af" title="SQL Fundamentals">
    <img title="Course Outline" src="https://img.shields.io/badge/mike.works-course%20outline-blue.svg"/>
  </a>
  <a href="https://docs.mike.works/sql-slides" title="Slides">
    <img title="Slides" src="https://img.shields.io/badge/mike.works-slides-blue.svg"/>
  </a>
  <a title='GreenKeeper'>
    <img title='GreenKeeper' src='https://badges.greenkeeper.io/mike-works/sql-fundamentals.svg'>
  </a>
</p>
<p align='center'>
This is the example project used for the <a title="Mike.Works" href="https://mike.works">Mike.Works</a> <a title="SQL Fundamentals" href="https://mike.works/course/sql-fundamentals-ad811af">SQL Fundamentals</a> and <a title="Professional SQL" href="https://mike.works/course/professional-sql-c9c7184">Professional SQL</a> courses.
</p>

# Where are the slides?

* [SQL Fundamentals](https://mike.works/course/sql-fundamentals-ad811af) slides are [here](https://docs.mike.works/sql-slides)
* [Professional SQL](https://mike.works/course/professional-sql-c9c7184) slides are [here](https://docs.mike.works/pro-sql-slides)

# What are we building?

We'll be working with several flavors of the [Northwind Database](https://docs.microsoft.com/en-us/dotnet/framework/data/adonet/sql/linq/downloading-sample-databases), which Microsoft uses to demonstrate a wide range of features across their MS Access and MS SQL Server product lines. You'll be writing some application code in a small [Node.js](https://nodejs.org) web application (built with [Express](https://expressjs.com)) to view and make changes to this data.


<p align="center">
<img height=400 src="https://user-images.githubusercontent.com/558005/35312473-7646b68c-0070-11e8-83df-25800047b763.png" />
</p>

This app is not in a good state at the beginning of the workshop. Features are missing, there are major performances, and quite a few database-related bugs. We'll fix all these problems and learn as we go!

# Setup Instructions

## Clone this project

In your terminal, run

```sh
git clone https://github.com/mike-works/rxjs-workshop rx
cd rx
```

## Install node dependencies

```sh
npm install
```

## Run the tests

There's an initial set of tests that ensure the app is correctly setup for the beginning of the course. You should be able to run this command and see them all passing

```sh
npm run test --- EX00
```

# Commands & Scripts

## Starting the app

The app can be built and started up by running

```sh
npm run watch
```

This will shutdown, rebuild and restart the app whenever source files are changed. If you want to start the app so that a debugger may be connected, run

```sh
npm run watch:debug
```

## Running Tests

You may run a subset of test suites whotes names match a string by running

```sh
npm run test --- <string>
```

or if you wish for the tests to re-run on code changes

```sh
npm run test:watch --- <string>
```

and if you want to connect a debugger...

```sh
npm run test --- EX00 --inspect-brk
```

Additionally, you can run tests for a particular exercise, and all exercises before it. This is useful when trying to ensure that an exercise can be completed without breaking previous work.

```sh
npm run test:ex 4 # run tests up through exercise 4
```

or, if you want to re-run tests on code changes

```sh
npm run test:ex:watch 4
```

# Build Status

| Solutions Branch                                                                               | Status                                                                                                                                                                                  |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [SQL Fundamentals](https://github.com/mike-works/sql-fundamentals/tree/solutions-fundamentals) | [![Build Status](https://travis-ci.org/mike-works/sql-fundamentals.svg?branch=solutions-fundamentals)](https://travis-ci.org/mike-works/sql-fundamentals?branch=solutions-fundamentals) |
| [SQL Pro](https://github.com/mike-works/sql-fundamentals/tree/solutions-pro)                   | [![Build Status](https://travis-ci.org/mike-works/sql-fundamentals.svg?branch=solutions-pro)](https://travis-ci.org/mike-works/sql-fundamentals?branch=solutions-pro)                   |

# License

While the general license for this project is the BSD 3-clause, the exercises
themselves are proprietary and are licensed on a per-individual basis, usually
as a result of purchasing a ticket to a public workshop, or being a participant
in a private training.

Here are some guidelines for things that are **OK** and **NOT OK**, based on our
understanding of how these licenses work:

### OK

* Using everything in this project other than the exercises (or accompanying tests)
  to build a project used for your own free or commercial training material
* Copying code from build scripts, configuration files, tests and development
  harnesses that are not part of the exercises specifically, for your own projects
* As an owner of an individual license, using code from tests, exercises, or
  exercise solutions for your own non-training-related project.

### NOT OK (without express written consent)

* Using this project, or any subset of
  exercises contained within this project to run your own workshops
* Writing a book that uses the code for these exercises
* Recording a screencast that contains one or more of this project's exercises

# Copyright

&copy; 2018 [Mike.Works](https://mike.works), All Rights Reserved

###### This material may not be used for workshops, training, or any other form of instructing or teaching developers, without express written consent
