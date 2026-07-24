# Git collaboration — runnable demos

Companion scripts for the [Working with Git](https://your-hub/topics/git-collaboration)
series. Each script builds a throwaway repo in a temp folder and walks a
scenario end to end, so you can *watch* git behave instead of just reading
about it. Nothing touches your real repos.

## Scripts

| Script | Demonstrates |
|--------|--------------|
| `conflict_demo.sh` | Two "people" editing the same line → push rejection → pull → merge conflict → resolution |
| `worktree_demo.sh` | Adding a second working tree so two branches are checked out at once |

## Run them

```bash
bash conflict_demo.sh
bash worktree_demo.sh
```

Each prints what it's doing at every step and cleans up after itself
(everything happens under a fresh temp directory). Read the output alongside
the article — the commands and git's responses will line up with the
diagrams.

## What conflict_demo.sh shows

1. Creates a repo with one file, two clones (`alice`, `bob`) — same starting commit.
2. Both edit the *same line* and commit.
3. Alice pushes → succeeds.
4. Bob pushes → **rejected** (behind).
5. Bob pulls → **merge conflict** (you'll see the `<<<<<<<` markers).
6. The script resolves it and Bob pushes successfully.

## What worktree_demo.sh shows

1. Creates a repo on `main` with a feature branch.
2. `git worktree add` checks out the feature branch in a *separate folder*.
3. `git worktree list` shows both trees sharing one `.git`.
4. Proves a commit in one worktree is instantly visible in the other.
