---
title: Getting a solid CI/CD with Gitlab CI/CD
date: "2019-07-06T22:12:03.284Z"
tags: ["gitlab", "ci_cd"]
description: Getting started with gitlab ci/cd 🦊🏗
---
Pipe dream
# Building a Gitlab CI/CD pipeline
Let’s say you have created an npm package and shared it with the world. awesome. 
You soon realise that for every little patch you create, you need to go through several steps to publish your changes.
If you are practicing unit tests and have a build process than really, your process should resemble something like:

1. test
2. build (if needed)
3. publish

This is great - you are handling the release of your package and happily code away assuming you are the only one developing that package. 
BUT since we are software developers - and naturally lazy - we need to make it automatic! What if we could automate every aspect of the release with the only work left for us as developers is concentrating on the code and it’s design. Literally just opening a branch off master - make changes - push it, and everything starts working for you.	
	
> though we are using an npm package as an example - it should somewhat resemble other packages\libs development process

## Choosing a git strategy
Before embarking on automating everything - we should strive to have a basic git branching model.
We need to consider the way we work with git to make automation and other workflow steps more consistent and scaleable.

Some of these branching models include [gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) and [trunk based development](https://trunkbaseddevelopment.com/)	

In this article I will cover a full CI/CD pipeline using Gitlab’s CI\CD and trunk based development.

## Starting off
We start with a single `master` branch - all feature branches are created from master and are *frequently merged back to master. 

*frequently - at least once every 24 hrs

## gitlab-runner
For a consistent CI/CD pipeline I will recommend using the gitlab-runner’s docker executor.
With a docker executor - gitlab runner will run your pipelines inside docker containers - making it extremely versatile (you can choose a different docker image per job) - consistent, and decoupled from your infrastructure. No more OS based CI agents !  Especially when dealing with package dependencies 🥵

## Stages
It is recommended to test, build and publish your package on every *integration* (e.g every merge to master).
Gitlab CI allows us to configure stages and create a visually segregated pipeline - using the stages you configured.

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

This simple file is a full CI pipeline (we’ll get to CD later on) - which lives with your code and is committed like any other source file.

Our sample pipeline file will:
1. Download `node@10` image from the docker registry. (Only once - than gitlab runner will use the fetched image on the build server)
2. Run `npm install` - note the `before_script` section.
3. Run `npm install` and then `npm test`
4. Run `npm install` and then `npm build`

## Things we currently don’t have in this pipelines configuration
1. Cache
2. Artifacts
3. Integration

> We will explore these three important aspects of the CI/CD within gitlab CI - this will also serve other CI systems although syntax will definitely differ.

## Running it
If you copy the above yaml excerpt and put it in a new file called `.gitlab-ci.yml` in your project’s root directory - AND have runners setup correctly (if you are using gitlab.com - runners are available for you as shared runners) you should notice a new pipeline being created and executed in the pipelines section of the CI/CD menu in Gitlab.

## When to run
The example `.gitlab-ci.yml` file triggers the entire pipeline for every push to the repository. This is great, but we need to be conscious about what stages run when dealing with the release of our app. We should be good for now, but we will play around with condition-specific stages.


## Optimize
It is unbelievably ease to add cache to a pipeline. You can define cache per job or globally for all stages - which is what we’ll use here.

Adding the cache is as easy as adding the following section at the top of our `.gitlab-ci.yml` file:

```yaml
cache:
  key: ${CI_COMMIT_REF_SLUG}
  policy: pull
  paths:
  - node_modules/
```

We use a global cache which will be available for every stage of our pipeline.

`key: ${CI_COMMIT_REF_SLUG}` means we are adding the branch name for this cache’s key - meaning that subsequent pipelines and jobs will use this cache. If you pushed a new branch - it will create a new cache.

`policy: pull` changes Gitlab CI/CD’s default behaviour which is to upload the cache on every stage’s end. Since we are using `node_modules` and none of our stages are changing those `node_modules` we simply skip the upload of cache at the end of each stage.

## Adding a release stage
In order to automate the CD part of our CI/CD pipeline - we need a way to release our package at the end of the pipe - assuming tests and build process (if any) has been executed successfully.

```yaml
release:
  only:
    - master
  stage: release
  script:
    - npm run publish
```

We had stated that the release job will run `only` on the master branch.
It is associated with a stage called release (which we will soon define at the top of our `.gitlab-ci.yml` file along with test and build.


So our `.gitlab-ci.yml` file now looks like this:
```yaml
image: node@10

stages:
- test
- build
- release

before_script:
  - npm install

cache:
  key: ${CI_COMMIT_REF_SLUG}
  policy: pull
  paths:
  - node_modules/

test:
	stage: test
	script:
	  - npm test

build:
	stage: build
  script:
    - npm run build

release:
  only:
    - master
  stage: release
  script:
    - npm run publish
```

COOL! So what do we have so far? 
A full CI/CD pipeline which runs on every push to the repository. 
We had rightfully limited the `release` stage to only run off master - since merging back to master usually means a new patch\minor\major version according to your release architecture.

Also we have optimised things a bit and now we are using cache and minimise `npm install` times.

But we can do better.

# Dependencies installation time
We can further speed up our install times using 2 other methods:
1. Utilize `package-lock.json` and `npm ci` instead of `npm install`
2. Use `yarn`

From my experience - a small package can use `npm ci` with a `package-lock.json` and a get a fair performance boost.

However, from my personal experience, when dealing with a large scale project, or a lib that has a tremendous amount of dependencies - `yarn` can really help us speed things up significantly.

# Auto merge request
If you are using Gitlab - than you know that a merge request is the safest way to review and integrate code back to your main branch.
One great thing about Gitlab is that it exposes an awesome RESTful APIs.

What we can do, is create a stage that will open a merge request back to our master branch. That way all we’ll have to do is review and click the merge button when all changes have been approved. 

## Creating the merge request stage
I will start by pasting  the `yaml` excerpt here, and go on to explain it’s different intricacies.
```yaml
open_merge_request:
  image: alpine:3.9.4
  stage: integrate
  before_script: []
  except:
    - master
  only:
    - branches
  script:
    - apk add --no-cache httpie
    - http POST http://gitlab.com/api/v4/projects/45/merge_requests?private_token=$MONKEY_TOKEN
      source_branch=$CI_COMMIT_REF_NAME
      target_branch=master
      id=$CI_COMMIT_SHORT_SHA
      title="🔀 auto merge $CI_COMMIT_REF_NAME to master [$CI_COMMIT_SHORT_SHA]"
      squash=true
      remove_source_branch=true
      labels="auto-merge"
      description="🐒 this is an automatic merge request created by a monkey in the CI servers 🐒"
      --ignore-stdin
      --json
```

We start off at the top - as said here previously, Gitlab allows us to use a docker image globally for all stages, or specific ones per job - you really have a lot of flexibility. 
Here we start with `alpine:3.9.4` - which is a lightweight container which makes our REST calls easy to make using the awesome `httpie` cli.

We are associating this job with the `integreate` stage - which we will define at the top of our `.gitlab-ci.yml` file.
We skip the `before_script` here - by assigning it to an empty array - essentially overriding it with nothing - since there is no need for us to install dependencies - this job will only execute an http request to our Gitlab server.

It only runs on branches OTHER than `master` - since we want to automatically create a merge request between our feature branch and our master branch.

### Integration script
The script section starts with adding the `httpie` cli to our `alpine` container.
Then, we make a `POST` request to our Gitlab server, essentially with the following body:
```json
{
	"source_branch": "$CI_COMMIT_REF_NAME",
	"target_branch": "master",
  "id": "$CI_COMMIT_SHORT_SHA",
	"title": "🔀 auto merge $CI_COMMIT_REF_NAME to master [$CI_COMMIT_SHORT_SHA]",
	"squash": true,
	"remove_source_branch": true,
	"labels": "auto-merge",
	"description": "🐒 this is an automatic merge request created by a monkey in the CI servers 🐒"
}
```

### Variables
Let’s review the variables used in our integration stage, they are all configured in the Variables section of the CI/CD settings menu in Gitlab:
1. $MONKEY_TOKEN - I have created a user called “Code Monkey” and used an `api` scoped private token.
2. $CI_COMMIT_REF_NAME - essentially the current branch name.
3. $CI_COMMIT_SHORT_SHA - the first 8 characters of the commit sha.

> Note that the only variables we had to configure ourselves was the `$MONKEY_TOKEN` wherein `$CI_COMMIT_REF_NAME` and `$CI_COMMIT_SHORT_SHA` are available by default by gitlab.
> See the full [variables](https://docs.gitlab.com/ee/ci/variables/)list.


Let’s have a look at our `.gitlab-ci.yml` file once again, in it’s entirety: 
```yaml
image: node@10

stages:
- test
- build
- integrate
- release

before_script:
  - npm install

cache:
  key: ${CI_COMMIT_REF_SLUG}
  policy: pull
  paths:
  - node_modules/

test:
	stage: test
	script:
	  - npm test

build:
	stage: build
  script:
    - npm run build

open_merge_request:
  image: alpine:3.9.4
  stage: integrate
  before_script: []
  except:
    - master
  only:
    - branches
  script:
    - apk add --no-cache httpie
    - http POST http://gitlab.com/api/v4/projects/45/merge_requests?private_token=$MONKEY_TOKEN
      source_branch=$CI_COMMIT_REF_NAME
      target_branch=master
      id=$CI_COMMIT_SHORT_SHA
      title="🔀 auto merge $CI_COMMIT_REF_NAME to master [$CI_COMMIT_SHORT_SHA]"
      squash=true
      remove_source_branch=true
      labels="auto-merge"
      description="🐒 this is an automatic merge request created by a monkey in the CI servers 🐒"
      --ignore-stdin
      --json

release:
  only:
    - master
  stage: release
  script:
    - npm run publish
```


# Recap
Right now, we have a full CI/CD pipeline which also automatically creates merge requests back to master on any new branches created and pushed to the git repository.