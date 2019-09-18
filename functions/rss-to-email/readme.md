# RSS To Email

> Serverless deployment with Zeit Now

Because this service currently won't work in the browser, I deployed it to [Ziet Now](https://zeit.co/) to make it easy to deploy your own microservice. Just sign up for an account, download the [Now CLI](https://zeit.co/docs#install-now-cli), and run the webtask from this subdirectory:

```
# Local dev
now dev

# Public endpoint
now
``` 

Your endpoint will now be available at the URL returned by the Now CLI. You can now make a `POST` request to that URL to create an email from the RSS feeds you pass in.

The body of your `POST` should pass in a [configuration object](../../readme.md#Configuration) as JSON, and may also include a `format` parameter with the value `html` (default) or `mjml`.

The response will contain the entire email with a `Content-Type` of `text/html`.
