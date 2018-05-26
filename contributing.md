# Contributing

When contributing to this repository, please first discuss the change you wish to make via the [issues on Github](https://github.com/portable-cto/rss-to-email/issues).

Please note we have a code of conduct, please follow it in all your interactions with the project.

## Local Development

### Prerequisites

In order to do local development on this project, you'll need to be running:

- [Node 8.0+](https://nodejs.org/)
- [npm 5.0+](https://www.npmjs.com/)

### Installation

Clone this repository:

```
$ git clone https://github.com/portable-cto/rss-to-email.git
```

Install the dependencies:

```
$ npm install 
```

### Testing and Linting

Tests are written using [Jest](https://facebook.github.io/jest/), and are kept in the `tests/` directory. We use integration tests to ensure that the whole library works as intended, and unit tests to evaluate individual functions and classes in isolation.

To run the whole test suite once:

```
npm test
```

Or to run it and watch for updates:

```
npm run test:watch
```

We use [eslint](https://eslint.org/) to standardize code styles and [JSDoc](http://usejsdoc.org/index.html) style docblocks are enforced. Run the linter with:

```
npm run lint
```

PRs will not be evaluated until the tests and linting passes.

## Pull Request Process

1. Make sure tests are running and linting passes before you submit a PR.
2. Update any relevant parts of the documentation in the `readme.md` file.
3. Update the `changelog.md` file with any new updates, breaking changes, or important notes.
3. Run the build process: `npm run build`.
4. Include a link to any relevant issues in the PR on Github. If there are problems with your PR, we will discuss them in Github before merging.

## Releases

This library uses [semantic versioning](https://semver.org/) to inform users of breaking and non-breaking changes. When a new release is ready, the following steps will be taken:

- Make sure tests still pass: `npm run test`.
- Run the release script: `npm version <SEMANTIC_VERSION> && npm publish && git push --tags` with the release number you want to use.

This will create a new Tag in Github and a new release on NPM.

## Code of Conduct

### Our Pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
our community a harassment-free experience for everyone, regardless of age, body
size, disability, ethnicity, gender identity and expression, level of experience,
nationality, personal appearance, race, religion, or sexual identity and
orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment
include:

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community
* Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

* The use of sexualized language or imagery and unwelcome sexual attention or
advances
* Trolling, insulting/derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or electronic
  address, without explicit permission
* Other conduct which could reasonably be considered inappropriate in a
  professional setting

### Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable
behavior and are expected to take appropriate and fair corrective action in
response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or
reject comments, commits, code, wiki edits, issues, and other contributions
that are not aligned to this Code of Conduct, or to ban temporarily or
permanently any contributor for other behaviors that they deem inappropriate,
threatening, offensive, or harmful.

### Scope

This Code of Conduct applies both within project spaces and in public spaces
when an individual is representing the project or its community. Examples of
representing a project or community include using an official project e-mail
address, posting via an official social media account, or acting as an appointed
representative at an online or offline event. Representation of a project may be
further defined and clarified by project maintainers.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported by contacting the project team at [karl@portablecto.com]. All
complaints will be reviewed and investigated and will result in a response that
is deemed necessary and appropriate to the circumstances. The project team is
obligated to maintain confidentiality with regard to the reporter of an incident.
Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good
faith may face temporary or permanent repercussions as determined by other
members of the project's leadership.
