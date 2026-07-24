#!/usr/bin/env bash
# Demonstrates the same-branch collision end to end: push rejection, pull,
# merge conflict, and resolution. Builds a throwaway repo in a temp dir.
set -euo pipefail

say() { printf "\n\033[1;36m== %s ==\033[0m\n" "$1"; }

WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
cd "$WORK"

say "1. Create a 'remote' seeded with commit C0, then two clones (alice, bob)"
git init -q -b main --bare origin.git
git init -q -b main seed
git -C seed config user.email seed@example.com
git -C seed config user.name Seed
printf 'threshold = 10\n' > seed/rule.txt
git -C seed add rule.txt
git -C seed commit -qm "C0: initial rule"
git -C seed remote add origin ../origin.git
git -C seed push -q origin main
git -C origin.git symbolic-ref HEAD refs/heads/main

git clone -q origin.git alice
git clone -q origin.git bob
for who in alice bob; do
  git -C "$who" config user.email "$who@example.com"
  git -C "$who" config user.name "$who"
done
echo "   alice and bob both start at C0"

say "2. Both edit the SAME line and commit locally"
printf 'threshold = 5\n'  > alice/rule.txt && git -C alice commit -qam "C1: Alice lowers to 5"
printf 'threshold = 20\n' > bob/rule.txt   && git -C bob   commit -qam "C2: Bob raises to 20"

say "3. Alice pushes first -> succeeds"
git -C alice push -q origin main && echo "   pushed C1"

say "4. Bob pushes -> REJECTED (he is behind)"
git -C bob push origin main || echo "   ^ rejected, as expected"

say "5. Bob pulls -> MERGE CONFLICT (same line changed)"
git -C bob pull --no-rebase origin main || true
echo "   conflicted file:"
sed 's/^/     /' bob/rule.txt

say "6. Bob resolves (keeps 10 as the agreed value) and pushes"
printf 'threshold = 10\n' > bob/rule.txt
git -C bob add rule.txt
git -C bob commit -qm "merge: resolve threshold conflict -> 10"
git -C bob push -q origin main && echo "   pushed the resolved merge"

say "Done — remote now contains both people's history, conflict resolved."
