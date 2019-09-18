# RSS To Email - Zeit Now

Because this service currently won't work in the browser, we've created a [Webtask](https://webtask.io/) to make it easy to deploy your own microservice. Just sign up for an account, download the [Webtask CLI](https://webtask.io/docs/wt-cli), and run the webtask from this subdirectory:

```
wt create -p node8 -n rss-to-email-webtask index.js
``` 

Your webtask will now be available at the URL returned by the Webtask CLI. You can now make a `POST` request to that URL to create an email from the RSS feeds you pass in.

The body of your `POST` should pass in a [configuration object](../readme.md#Configuration) as JSON, and may also include a `format` parameter with the value `html` (default) or `mjml`.

The response will contain the entire email with a `Content-Type` of `text/html`.
