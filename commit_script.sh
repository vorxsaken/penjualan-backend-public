#bin/bash

read -p "commit message: " commit

git add .
git commit -m "$commit"
git push -u origin main
