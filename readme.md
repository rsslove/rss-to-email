# rss-to-email

Generate HTML emails and [mjml](https://mjml.io/) templates from one or more RSS feeds.

> Note: This project is pre-version 1.0.0, so breaking changes may occur. Use at your own risk or lock down to a specific version using NPM. 

[![Travis Build Status](https://travis-ci.org/portable-cto/rss-to-email.png?branch=master)](https://travis-ci.org/portable-cto/rss-to-email)
[![Coverage Status](https://coveralls.io/repos/github/portable-cto/rss-to-email/badge.svg)](https://coveralls.io/github/portable-cto/rss-to-email)
[![npm](https://img.shields.io/npm/v/rss-to-email.svg)](https://www.npmjs.com/package/rss-to-email)
[![GitHub stars](https://img.shields.io/github/stars/portable-cto/rss-to-email.svg?style=social&label=Stars)](https://github.com/portable-cto/rss-to-email)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

```
                                          _                                   _ _ 
                       _ __ ___ ___      | |_ ___         ___ _ __ ___   __ _(_) |
                      | '__/ __/ __|_____| __/ _ \ _____ / _ \ '_ ` _ \ / _` | | |
                      | |  \__ \__ \_____| || (_) |_____|  __/ | | | | | (_| | | |
                      |_|  |___/___/      \__\___/       \___|_| |_| |_|\__,_|_|_|
                                                                                  

 ```

[![rss-to-email example](http://g.recordit.co/tIa8cImPWS.gif)](http://recordit.co/tIa8cImPWS)

You can see a sample email generated in the browser live at [portable-cto.github.io/rss-to-email](https://portable-cto.github.io/rss-to-email/).


## Table of Contents

- [Usage](#usage)
  - [Node](#node)
  - [Command Line](#command-line)
  - [Browser](#browser)
  - [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)


## Usage

### Node

The recommended way to use this package is as [an npm package](https://www.npmjs.com/package/rss-to-email). To install and save it to your project's dependencies, run:

```
npm install rss-to-email --save
```

After installing, call the `RssToEmail` factory with [a config object](#configuration). Use the resulting `rssToEmail` object to get emails in `mjml` or `html` formats: 

```
const RssToEmail = require('rss-to-email');
const config = {
  // See #Configuration section of the docs below
};
const rssToEmail = RssToEmail(config);

rssToEmail.getEmail('html').then((email) => {
  console.log(email); // The HTML version of your email
});

rssToEmail.getEmail('mjml').then((email) => {
 console.log(email); // The MJML version of your email
});
```

### Command Line

You can install this package globally and run it as a command line tool as well. First install it:

```
npm install -g rss-to-email
```

Then run the tool:

```
rss-to-email <config-file-path> <output-folder-path>
```

The path should be relative to your current directory. For example, if your config file is at `./config.json` and you want to output the resulting files to a directory `./output`, you would run:

```
rss-to-email ./config.json ./output
```

### Browser

Unfortunately [mjml pulled support for browser-side usage](https://github.com/mjmlio/mjml/issues/438#issuecomment-302712905), so you can't use this library in client-side applications. That said, I'd like to come up with a solution for this, perhaps by providing an API or using a different email templating library.

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


## Contributing

All patches, fixes, and ideas welcome! Please read [contributing.md](contributing.md) for furthers details.


## License

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
