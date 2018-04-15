# RSS To Email Webtask

Because this service currently won't work in the browser, we've created a [Webtask](https://webtask.io/) to make it easy to deploy your own microservice. Just sign up for an account, download the [Webtask CLI](https://webtask.io/docs/wt-cli), and run the webtask from this subdirectory:

```
wt create -p node8 -n rss-to-email-webtask index.js
``` 
