#!/usr/bin/env bash
# Demonstrates git worktree: one repository, two branches checked out at once
# in separate folders, sharing the same .git. Builds a throwaway repo.
set -euo pipefail

say() { printf "\n\033[1;36m== %s ==\033[0m\n" "$1"; }

WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
cd "$WORK"

say "1. Create a repo on main with a feature branch"
git init -q project
cd project
git config user.email me@example.com; git config user.name Me
printf 'v1\n' > app.txt
git add app.txt && git commit -qm "initial on main"
git branch feature-x

say "2. Add a SECOND working tree for feature-x (separate folder)"
git worktree add -q ../project-feature feature-x
echo "   two folders now exist:"
ls -d "$WORK"/project "$WORK"/project-feature | sed 's/^/     /'

say "3. git worktree list — both trees, one repository"
git worktree list | sed 's/^/   /'

say "4. Commit in the feature worktree..."
(cd ../project-feature \
  && git config user.email me@example.com; git config user.name Me \
  && printf 'v2-feature\n' >> app.txt \
  && git commit -qam "work on feature-x")

say "5. ...is instantly visible from the main tree's shared .git"
echo "   feature-x log seen from ~/project:"
git log --oneline feature-x | sed 's/^/     /'
echo "   meanwhile main's app.txt is untouched:"
sed 's/^/     /' app.txt

say "6. Clean up the worktree when done"
git worktree remove ../project-feature
git worktree list | sed 's/^/   /'

say "Done — one .git served two live branches without a second clone."
