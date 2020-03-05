---
title: Bump Action!
date: "2020-03-04T12:00:00.284Z"
description: get started with github-actions using this quick, short summary of my experience.
tags: [ "npm", "node", "javascript", "github", "ci-cd" ]
---
I have been meaning to write this post for a while now, and with the github-actions [hackathon](https://githubhackathon.com/#hackathon) coming tomorrow, I thought today is a good chance. oh yeah and this is my first post ! 🚀

[TL;DR](#tldr)   
[Show me the code](#show-me-the-code)   

# What is it
Github actions allows one to define workflows based on given conditions.
We can think of a workflow as a CI/CD pipeline. This is very similar to existing implementations such as CircleCI, Travis CI, or Gitlab CI/CD.

# Comparing to other services
As I explained, `github-actions` is part of a long list of awesome CI/CD services - which almost all use a `.yml` as the pipeline configuration file.
Where `github-actions` differ is in it's ability to configure many small actions under your `.github/workflows` repo directory - which is so great for managing pipelines and segregating your actions based on different conditions\areas\subjects - however you would like to section it.  

# Why should you care
If you’re like me, you’d like quick feedback and automated repetitive tasks in terms of developing and publishing code (especially packages).

A quick way to understand our ideal and *minimal* workflow, is to think about what we *don’t* want.

What I don’t want:

1. Manually creating git tags.
2. Manually bumping the patch version in my `package.json`.
3. Manually pushing the `package.json` version change.
4. Manually releasing to some registry.

These *actions* (pun definitely intended) are repetitive and manual. we don't like this. we be smart. we be lazy.

# Ready, set, action! 🎬
Getting our first action running is easy thanks to great documentation and more importantly, many existing open source github actions!  

I used the `javascript-action` template repo to get me started...immediately I noticed that I didn't read enough to know that any action you release has to be compiled. 

Wait, what ?! compiled say you ?? no, no sir, you must be confused, see we are in javascript land, what compilation are you talking about ? 

So...yeah - a github action is released using a compiled version of your code - which also means all of your dependencies (`node_modules` in this case) as well.

# Bump action
The purpose of the action I created, obviously already existed in other github actions in the Github Marketplace, but they all seemed either too complicated, or doing too many things.

Introducing my very first github-action ! it's a template so you can quickly bootstrap your own github action using my repo 🎉 

{% github tool3/bump %}

# Compiling `.js`
At first, beside being very weird, the whole compilation process annoyed me. 
I had to compile my `index.js` with `node_modules` present (remember - the compiled version of your code will be a single file with all dependencies already baked into it) every time I wanted to push a new version of my action.

## Git hooks to the rescue ! 

using a simple `pre-commit` hook - I used `zeit/ncc` (from the github actions documentation) to compile my `.js` files before pushing to the repo - this ensured I did not forget to compile when I `git push`ed later on.

> TIP 💡
> use `husky` to quickly define a pre-commit git hook which compiles your code using `zeit/ncc`


# Show me the action
In order to get started with creating a github-action, let's first quickly review my current `bump` repo structure:

```text
├── LICENSE
├── README.md
├── dist              -> compiled code (this committed and pushed!)
├── action.yml        -> action metadata
├── index.js.         -> action logic
├── node_modules      -> needed for compile time
├── package-lock.json
└── package.json
```

### dist/
the `dist` directory will host our compiled `index.js` which will be committed and pushed to the repo in order to make this action executable.

### action.yml
this file includes meta information for our action such as:
- marketplace icon and color
- input variables definitions
- output information

### node_modules/
I don't feel the need to explain what `node_modules` are, but what I do feel the need to explain is that it has to exist when you are compiling your code. this might sound logical for folks that are used to compile javascript - but I don't, and it wasn't for me.

# Show me the code
my action consists of a single `index.js` file - 58 lines long - with whitespace of course - and that goes to show that you can create very small actions which do very little - or go all out and have a crazy technodrome-like big action - which I would probably root against.

To the index! 

```js
const core = require('@actions/core');
const { exec } = require('@actions/exec');
const github = require('@actions/github');
const { Toolkit } = require('actions-toolkit');

const STRATEGIES = [
  '#patch',
  '#minor',
  '#major'
];

Toolkit.run(async tools => {
  {
    try {
      // get context
      const { pusher: { email, name }, head_commit: { message } } = github.context.payload;

      // get input credentials
      const inputUser = core.getInput('user');
      const inputEmail = core.getInput('email');
      const inputBranch = core.getInput('branch');
      const unrelated = core.getInput('unrelated');

      const userName = inputUser || name;
      const userEmail = inputEmail || email;

      const defaultStrategy = STRATEGIES.filter(strat => message.includes(strat))[0] || STRATEGIES[0];
      const strategy = defaultStrategy.replace('#', '');
      const commitMessage = message.replace(defaultStrategy, '');

      tools.log(`Latest commit message: ${commitMessage}`);
      tools.log(`Running with ${userName} ${userEmail} and bumping strategy ${strategy}`);
      tools.log(`Branch is ${inputBranch}`);


      // git login and pull
      const pullArgs = ['pull', 'origin', inputBranch, '--tags'];
      if (unrelated) {
        pullArgs.push('--allow-unrelated-histories');
      }

      await exec('git', ['config', '--local', 'user.name', userName]);
      await exec('git', ['config', '--local', 'user.email', userEmail]);
      await exec('git', pullArgs);

      // version by strategy
      await exec('npm', ['version', strategy, '--no-commit-hooks', '-m', `${commitMessage} %s`]);

      // push new version and tag
      await exec('git', ['push', 'origin', `HEAD:${inputBranch}`, '--tags'])

    }
    catch (error) {
      core.setFailed(error.message);

    }
  }
});

```

Github gives us some packages to access input/output and to get context repository and user information. Read about that in the [github-actions documentation](https://help.github.com/en/actions)

Pardon me for not explaining any part of this code - as it is not really relevant for this post. 
I wanted to give you all the steps which were not obvious for me - but the actual code is up to you of course :)

I'll happily answer any questions about my `index.js` shown above, if such arises. 

# TL;DR
- github actions are awesome.
- you can define many small actions in different `.yml` files.
- compile your code (`zeit/ncc` is a great way to do that).
- `action.yml` meta file in the root directory of your github action.


For those about to code... I salute you!

Happy Coding 👨🏻‍💻
