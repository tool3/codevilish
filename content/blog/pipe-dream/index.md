---
title: Getting a solid CI/CD with Gitlab CI/CD
date: "2019-07-06T22:12:03.284Z"
tags: ["gitlab", "ci_cd"]
description: Getting started with gitlab ci/cd 🦊🏗
---
Pipe dream
# Building a Gitlab CI/CD pipeline
So you have tried gitlab and noticed that - hey it’s like Github only has external services such as CI/CD already baked into a single product? 
You are correct. 

## What can I do with it ?
Let’s say you are created an npm package and shared it with the world. awesome. 
After a while you realise that for every little patch you need to `npm publish` and all that good stuff.a
If you are practicing unit tests and have a build process than really, your process should resemble something like:

1. test
2. build
3. publish

This is great - but since we are software developers - and naturally lazy - we need to make it automatic! 

> NOTE: though we are using an npm package as an example - it should be almost identical to a corresponding language’s lib workflow

## Choosing a git strategy
Before embarking on automating every single aspect of our workflow - we should strive to have a basic git branching model.
In human words - we need to consider the way we work with git to make automation and other workflow steps more consistent and scaleable.

Some of these branching models include [gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) and [trunk based development](https://trunkbaseddevelopment.com/)	

In this article I will cover a full CI/CD pipeline using Gitlab’s CI\CD and trunk based development.

# Getting it on
I started my Trunk based development with a single `master` branch - all feature branches are created from master and are *frequently merged to master. 

*frequently - at least once every 24 hrs.

## gitlab-runner
When using Gitlab CI/CD - whether a self-hosted instance or gitlab.com - it is important to note that runner executor type.
For a consistent CI/CD pipeline I will recommend the docker executor.
With a docker executor - gitlab runner will run your pipelines inside docker containers - making it extremely versatile (you can choose a different docker image per job) - consistent, and decoupled from your infrastructure. No more OS based CI agents !  Especially when dealing with package dependencies.

## Stages
As stated at the above -  it is more than likely that you will want to test, build and publish your package on every *integration* (e.g every merge to master).
Gitlab CI allows us to configure stages and make it visually segregated using the stages you configured.

For example:
`.gitlab-ci.yml`
```yaml
image: node@10

stages:
- test
- build

before_script:
  - npm install

test:
  stage: test
  script:
    - npm test

build:
  stage: build
  script:
    - npm run build
```

This simple file is a full CI pipeline (we’ll get to CD in a moment) - which lives with your code and is committed like any other source file.

Our sample pipeline file will:
1. Download `node@10` image from the docker registry. (Only once - than gitlab runner will use the fetched image on the build server)
2. Run `npm install` - note the `before_script` section.
3. Run `npm install` and then `npm test`
4. Run `npm install` and then `npm build`
