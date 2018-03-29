# rss-to-email

> Generate HTML emails and [mjml](https://mjml.io/) templates from your RSS feed. 

<!-- [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome) [![Travis Build Status](https://travis-ci.org/{ORG-or-USERNAME}/{REPO-NAME}.png?branch=master)](https://travis-ci.org/{ORG-or-USERNAME}/{REPO-NAME}) [![Appveyor Build Status](https://ci.appveyor.com/api/projects/status/%7B%7Bstatus_id%7D%7D)](https://ci.appveyor.com/project/%7B%7Busername%7D%7D/%7B%7Bproject_name%7D%7D) [![Join the chat at https://gitter.im/{ORG-or-USERNAME}/{REPO-NAME}](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/dwyl/?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![GitHub forks](https://img.shields.io/github/forks/satwikkansal/readme_styles.svg?style=social&label=Fork)](https://github.com/{USERNAME}/{REPO-NAME}) [![GitHub stars](https://img.shields.io/github/stars/{USERNAME}/{REPO-NAME}.svg?style=social&label=Star)](https://github.com/readme_styles) [![GitHub tag](https://img.shields.io/github/tag/{USERNAME}/{REPO-NAME}.svg)](https://github.com/{USERNAME}/{REPO-NAME})
[![GitHub release](https://img.shields.io/github/release/{USERNAME}/{REPO-NAME}.svg)](https://github.com/{USERNAME}/{REPO-NAME}) -->

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

- [Node 9+](https://nodejs.org/)*
- [npm 5.8.0+](https://www.npmjs.com/)*

_\*This project will likely work with earlier versions of Node/npm, but I haven't tested it. If you'd like to validate that and/or submit a PR, feel free!_

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

Run the script from the command line (will run `config.json`):

```sh
$ npm start
```

Or, specify a config file when you run:

```sh
$ node index.js config.ext.json
```

Your output files will be in the `output/` directory.

### Configuration

For an example config file, see `config.example.json`.

- `accentColor`: A hex or html-safe color code.
- `feedUrl`: The URL to the RSS feed you'd like to read.
- `greeting`: The first line of the email.
- `header`: Configuration for the header section of the email:
  - `banner`: (optional) An image url for the banner at the top of the email.
  - `link`: A link for the header image or text.
  - `title`: Shown if the banner is not set or as an `alt` tag on the image.
- `intro`: The second line of the email. Serves as an introduction to the main feed content.
- `output`: Configuration for the output format of the email:
  - `filename`: The name of the output file(s) to generate.
  - `types`: An array of filetypes to generate. Valid options are `html` and `mjml`.
- `outro`: The second to last line of the email. Closes out the main content or allows you to add a call to action.
- `signature`: Your signature or a final line of the email.

You can store multiple config files in the root of this project, and the `.gitignore` file should ignore them if you follow the naming convention, `config.[NAME].json` where `[NAME]` is your identifying name for the config.

### Output

This project will output either HTML, [mjml](https://mjml.io/), or both depending on what you specify in your config file. All files will be saved to the `output/` directory upon completion. 

## Contributing

All patches, fixes, and ideas welcome! Please read [contributing.md](contributing.md) for furthers details.

## License

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
