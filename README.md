<p align='center'>
  <a href="https://mike.works" target='_blank'>
    <img height=40 src='https://assets.mike.works/img/login_logo-33a9e523d451fb0d902f73d5452d4a0b.png' />
  </a>
</p>
<p align='center'>
  <a href="https://mike.works/course/rxjs-fundamentals-c26ec72" target='_blank'>
    <img height=150 src='https://user-images.githubusercontent.com/558005/38284417-f86a8a7c-376f-11e8-8409-7b8847c5f234.png' />
  </a>
</p>

<p align='center'>
  <a href="https://travis-ci.org/mike-works/rxjs-fundamentals?branch=solutions" title="Build Status">
    <img title="Build Status" src="https://travis-ci.org/mike-works/rxjs-fundamentals.svg?branch=solutions"/>
  </a>
  <a href="https://github.com/mike-works/rxjs-fundamentals/releases" title="Version">
    <img title="Version" src="https://img.shields.io/github/tag/mike-works/rxjs-fundamentals.svg" />
  </a>
</p>
<p align='center'>
This is the example project used for the <a title="Mike.Works" href="https://mike.works">Mike.Works</a> <a title="RxJS Fundamentals" href="https://mike.works/course/rxjs-fundamentals-c26ec72">RxJS Fundamentals</a> course.
</p>

# Where are the slides?

- [RxJS Fundamentals](https://mike.works/course/rxjs-fundamentals-c26ec72) slides are [here](https://docs.mike.works/rxjs-fundamentals)

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

| Solutions Branch                                                                    | Status                                                                                                                                                          |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [RxJS Fundamentals](https://github.com/mike-works/rxjs-fundamentals/tree/solutions) | [![Build Status](https://travis-ci.org/mike-works/rxjs-fundamentals.svg?branch=solutions)](https://travis-ci.org/mike-works/rxjs-fundamentals?branch=solutions) |

# License

While the general license for this project is the BSD 3-clause, the exercises
themselves are proprietary and are licensed on a per-individual basis, usually
as a result of purchasing a ticket to a public workshop, or being a participant
in a private training.

Here are some guidelines for things that are **OK** and **NOT OK**, based on our
understanding of how these licenses work:

### OK

- Using everything in this project other than the exercises (or accompanying tests)
  to build a project used for your own free or commercial training material
- Copying code from build scripts, configuration files, tests and development
  harnesses that are not part of the exercises specifically, for your own projects
- As an owner of an individual license, using code from tests, exercises, or
  exercise solutions for your own non-training-related project.

### NOT OK (without express written consent)

- Using this project, or any subset of
  exercises contained within this project to run your own workshops
- Writing a book that uses the code for these exercises
- Recording a screencast that contains one or more of this project's exercises

# Copyright

&copy; 2018 [Mike.Works](https://mike.works), All Rights Reserved

###### This material may not be used for workshops, training, or any other form of instructing or teaching developers, without express written consent
