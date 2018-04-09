# rss-to-email

> Generate HTML emails and [mjml](https://mjml.io/) templates from one or more RSS feeds. 

[![Travis Build Status](https://travis-ci.org/portable-cto/rss-to-email.png?branch=master)](https://travis-ci.org/portable-cto/rss-to-email) [![GitHub release](https://img.shields.io/github/release/portable-cto/rss-to-email.svg)](https://github.com/portable-cto/rss-to-email)
<!-- [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome) [![Appveyor Build Status](https://ci.appveyor.com/api/projects/status/%7B%7Bstatus_id%7D%7D)](https://ci.appveyor.com/project/%7B%7Busername%7D%7D/%7B%7Bproject_name%7D%7D) [![Join the chat at https://gitter.im/{ORG-or-USERNAME}/{REPO-NAME}](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/dwyl/?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![GitHub forks](https://img.shields.io/github/forks/satwikkansal/readme_styles.svg?style=social&label=Fork)](https://github.com/{USERNAME}/{REPO-NAME}) [![GitHub stars](https://img.shields.io/github/stars/{USERNAME}/{REPO-NAME}.svg?style=social&label=Star)](https://github.com/readme_styles) [![GitHub tag](https://img.shields.io/github/tag/{USERNAME}/{REPO-NAME}.svg)](https://github.com/{USERNAME}/{REPO-NAME}) -->

```
                                          _                                   _ _ 
                       _ __ ___ ___      | |_ ___         ___ _ __ ___   __ _(_) |
                      | '__/ __/ __|_____| __/ _ \ _____ / _ \ '_ ` _ \ / _` | | |
                      | |  \__ \__ \_____| || (_) |_____|  __/ | | | | | (_| | | |
                      |_|  |___/___/      \__\___/       \___|_| |_| |_|\__,_|_|_|
                                                                                  

 ```

[![rss-to-email example](http://g.recordit.co/tIa8cImPWS.gif)](http://recordit.co/tIa8cImPWS)

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [Configuration](#configuration)
  - [Output](#output)
- [Contributing](#contributing)
- [License](#license)


## Prerequisites

- [Node 7.10+](https://nodejs.org/)
- [npm 4.2+](https://www.npmjs.com/)

## Installation

Clone this repository:

```sh
$ git clone https://github.com/portable-cto/rss-to-email.git
```

Install the dependencies:

```sh
$ npm install 
```

## Usage

Copy `config.example.json` to `config.json` and customize it for your project's needs (see [#Configuration](#configuration) section below for details).

Run the script from the command line:

```sh
$ npm run cli -- config.json
```

### Output

Your output files will be in the `output/` directory. You should see both an `.mjml` file and a `.html` file. You can use [mjml's try it live](https://mjml.io/try-it-live) feature to edit the mjml file, or you can put the `.html` file right into your favorite email editor/preview tool.

### Configuration

For an example config file, see `config.example.json`.

- `accentColor`: A hex or html-safe color code.
- `filename`: The base name of the output files to generate (do not include extensions).
- `header`: Configuration for the header section of the email:
  - `banner`: (optional) An image url for the banner at the top of the email.
  - `link`: A link for the header image or text.
  - `title`: Shown if the banner is not set or as an `alt` tag on the image.
- `greeting`: The first line of the email.
- `intro`: The second line of the email. Serves as an introduction to the main feed content.
- `feeds`: An array of RSS feeds you'd like to include. Each must have a `url`, but can also have:
  - `description`: A short custom feed description. Will use the RSS feed's embedded one by default.
  - `title`: A custom feed title. Will use the RSS feed's embedded one by default.
  - `url`: The url to the RSS feed.
- `outro`: The second to last line of the email. Closes out the main content or allows you to add a call to action.
- `signature`: Your signature or a final line of the email.

You can store multiple config files in the root of this project, and the `.gitignore` file should ignore them if you follow the naming convention, `config.[NAME].json` where `[NAME]` is your identifying name for the config.

### Importing as an npm package

Coming soon!

## Contributing

All patches, fixes, and ideas welcome! Please read [contributing.md](contributing.md) for furthers details.

## Testing and Linting

Tests are written using [Jest](https://facebook.github.io/jest/), and are kept in the `tests/` directory. We use integration tests to ensure that the whole library works as intended, and unit tests to evaluate individual functions and classes in isolation.

To run the whole test suite once:

```
npm test
```

Or to run it and watch for updates:

```
npm run test:watch
```

We use [eslint](https://eslint.org/) to standardize code styles. Run the linter with:

```
npm run lint
```

PRs will not be evaluated until the tests and linting passes.

## License

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
