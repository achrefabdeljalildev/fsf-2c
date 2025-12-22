# FSF 2C Front

## CI/CD and Code Quality

Our CI/CD jobs are managed in Jenkins. You can find the Jenkins jobs

We use SonarQube for code quality analysis. You can access the SonarQube dashboard

### **IMPORTANT:** The pipeline will not create and deploy a new version unless the commit message follows the specified guidelines.

## Commit Message Guidelines

We follow the Conventional Commits specification for our commit messages. This helps in automating the versioning and changelog generation.

### Commit Message Format

Each commit message should consist of a **type**, an optional **scope**, and a **subject**:

#### Types

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **chore**: Other changes that don't modify `src` or `test` files
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **revert**: Reverts a previous commit
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

#### Examples

- `feat(parser): add ability to parse arrays`
- `fix(server): handle CORS issues`
- `docs(readme): update installation instructions`

### Versioning

The versioning is determined by the types of commits that are included in a release. The following rules are used:

- **Major**: Any commit message that includes `BREAKING CHANGE` in the body.
- **Minor**: Any `feat` commit.
- **Patch**: Any `fix` commit.

### Changelog

The changelog is automatically generated based on the commit messages. Make sure to follow the commit message guidelines to ensure the changelog is accurate and informative.

## Releasing

Releases are handled automatically by the semantic release script. Ensure your commits are properly formatted and push your changes to the main branch. The script will take care of the rest.

## Branch Naming Convention

To link your development information to Jira issues, your team must include Jira issue keys in their development actions. The key you will use is **C2**.

### Branch Naming Format

When checking out a new branch in your repo, use the following format for the branch name:

**`git checkout -b C2-<issue-number>-<branch-name>`**

**Example**: If the issue number is `123` and the branch name is `feature-login`, you would use:

**`git checkout -b C2-123-feature-login`**

### Commit Messages

When committing changes to your branch, include the issue key in your commit message to link those commits to the development panel in your Jira issue:

**Example**:

**`git commit -m "feat(C2-123): Implement login feature"`**

### Pull Requests

When creating a pull request, include the issue key in the pull request title:

**`C2-<issue-number> <pull request title>`**

**Example**:

**`C2-123 Add login feature`**

After you push your branch, you'll see development information in your Jira issue.
