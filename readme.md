# rss-to-email

Generate HTML emails and [mjml](https://mjml.io/) templates from one or more RSS feeds.

> Note: This project is pre-version 1.0.0, so breaking changes may occur. Use at your own risk or lock down to a specific version using NPM.

[![example workflow](https://github.com/rsslove/rss-to-email/actions/workflows/test-and-lint.yml/badge.svg)](https://github.com/rsslove/rss-to-email/actions)
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

[![rss-to-email example](http://g.recordit.co/KKSAZBRdsT.gif)](http://g.recordit.co/KKSAZBRdsT.gif)


## Table of Contents

- [Usage](#usage)
  - [Node](#node)
  - [Command Line](#command-line)
  - [Browser](#browser)
  - [Configuration](#configuration)
  - [Templates](#templates)
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

### Configuration

For an example config file, see `config.example.json`.

- `accentColor`: A hex or html-safe color code.
- `filename`: The base name of the output files to generate (do not include extensions).
- `header`: Configuration for the header section of the email:
  - `banner`: (optional) An image url for the banner at the top of the email.
  - `link`: A link for the header image or text.
  - `title`: Shown if the banner is not set or as an `alt` tag on the image.
- `intro`: The first line of the email. Can use HTML or plain text.
- `feeds`: An array of RSS feeds you'd like to include. Only `url` is required:
  - `url`: The url to the RSS feed.
  - `title`: (optional) A custom feed title. Will use the RSS feed's embedded one by default.
  - `description`: (optional) A short custom feed description. Will use the RSS feed's embedded one by default.
  - `limit`: (optional) Truncate items greater than a given limit.
  - `publishedSince`: (optional) Filter out posts published before this date.
  - `parserOptions`: (optional) Custom RSS parser options outlined in the Node [rss-parser](https://www.npmjs.com/package/rss-parser#xml-options) documentation.
- `outro`: The last line of the email. Can use HTML or plain text.
- `templateUrl`: (optional) A handlebars/mjml template. For more details, see [Templates](#templates) section.

### Templates
In order to compose custom emails, you can build your own [MJML templates](https://mjml.io/) with [Handlebars](). If you don't specify a template URL, the library defaults to [this file](https://raw.githubusercontent.com/portable-cto/rss-to-email/master/src/templates/default.mjml).

Many of the config file's variables are exposed in the templates including:

- `header`
- `intro`
- `outro`

The `feeds` variable contains an array of all of the feeds with an array of all of the items in each. For example, the following is a basic template that will loop through all the RSS feeds and items, displaying the title and content of each:

```html
{{#each feeds}}
  <!-- Feed -->
  <mj-section>
    <mj-column>
      <mj-text>{{this.title}}</mj-text>
      <mj-text>{{this.description}}</mj-text>
    </mj-column>
  </mj-section>
  {{#each items}}
    <!-- Item -->
    <mj-section>
      <mj-column>
        <mj-text>
          <a href="{{this.link}}">{{this.title}}</a>
        </mj-text>
        <mj-text>{{{this.content}}}</mj-text>
      </mj-column>
    </mj-section>
  {{/each}}
{{/each}}
```

You can also use any helper in the [handlebars-helpers](https://github.com/helpers/handlebars-helpers) library:

```html
{{#is intro "A certain intro"}}
  <p>A certain intro was used.</p>
{{/is}}
```

## Contributing

All patches, fixes, and ideas welcome! Please read [contributing.md](contributing.md) for furthers details.


## License

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Copyright 2021, Hughes Domains, LLC.
