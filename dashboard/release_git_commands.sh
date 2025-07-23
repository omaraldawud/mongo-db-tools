#!/bin/bash
# ========================
# semantic-release Tagging Workflow
# For feat: commits triggering minor version bumps
#                   DO NOT PUSH
# ========================

# 1. [PREP] Fetch latest changes and tags
echo "Fetching latest from remote..."
git fetch origin
git fetch --tags --prune

# 2. [VERIFY] Check existing tags before changes
echo -e "\nCurrent tags:"
git tag -l | sort -V

# 3. [COMMIT] Stage and commit with conventional message
echo -e "\nCreating feature commit..."
git add .
git commit -m "feat: New Dashboard"

# 4. [VALIDATE] Confirm commit message format
echo -e "\nLast commit message:"
git log -1 --pretty=%B

# 5. [SYNC] Push to trigger semantic-release
echo -e "\nPushing to trigger release..."
git push origin main

# 6. [CONFIRM] Wait for CI/CD (if needed)
read -p "Wait for CI/CD to finish (press enter when semantic-release completes)"

# 7. [VERIFY] Check new tag creation
echo -e "\nUpdated tags:"
git fetch --tags
git tag -l | sort -V

# 8. [INSPECT] Show new tag details
NEW_TAG=$(git describe --tags --abbrev=0)
echo -e "\nRelease details for $NEW_TAG:"
git show $NEW_TAG

# ========================
# Alternative one-liner for steps 2-8:
# git add . && git commit -m "feat: New Dashboard" && git push origin main && sleep 30 && git fetch --tags && git show $(git describe --tags --abbrev=0)
# ========================