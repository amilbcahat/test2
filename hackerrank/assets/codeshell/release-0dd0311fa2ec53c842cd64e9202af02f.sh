#!/bin/bash

[ -z "$1" ] && exit 1 || JUMBO=$1
[ -z "$2" ] && exit 1 || MAJOR=$2
[ -z "$3" ] && exit 1 || MINOR=$3
grunt build && git add -f dist && git commit -am "Version $1.$2.$3" && git tag -a v$1.$2.$3 -m "Version $1.$2.$3" && git push origin v$1.$2.$3 && git reset --hard HEAD~1
