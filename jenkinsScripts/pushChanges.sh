#!/bin/bash
git config --global user.email "ericmancebo6950@gmail.com"
git config --global user.name "$1"
git add README.md
git commit -m "Pipeline ejecutada por $1. Motiu: $2"
git push origin ci_jenkins
