---
title: Whats new in nicli
date: "2019-04-01T22:12:03.284Z"
tags: ["bash", "javascript", "nicli"]
---

# 🔥 What’s new in `nicli` 🔥 
## status   
use this command to see the git status of each of the sub systems.
`ra status` will return a list of all projects - their current branch - and whether there were any changes.

## open
use this command to open our subsystem’s main pages in gitlab.

`ra open analytics` - will open a browser tab with the analytics main page in gitlab.

`ra open merge analytics master qa` - will open a browser tab with a new merge request in analytics from master to qa.

adding a `—-dryRun`  || `-n` flag will simply return the url of the command without actually opening it in the browser.

run `ra open` for detailed help.

## exec
use this command to run *any* custom command for a subsystem.
example: `ra exec ‘touch yo.txt’ -z` will create `yo.txt` in the analytics subsystem.

## tricks
### go to workspace root dir:
`cd $(ra --dir)`

### clean all file changes in all subsystems 
this command is useful when bootstrap fails for some reason and lerna leaves us with a bunch of broken package.jsons
`ra exec 'git clean -fd' -a`

### stop a service in pm2 by it’s short name
instead of the usual annoying flow of:
pm2 ls -> find service PID -> pm2 stop PID
`ra stop cv` will stop client-views in pm2.
run `ra -m` to see the full service name map.

## more ?
something missing in nicli ? want to improve an existing functionality? 
please let me know through a [gitlab issue](http://zgitlab.zerto.local/talhayut/cli/issues/new?issue%5Bassignee_id%5D=&issue%5Bmilestone_id%5D=)! 