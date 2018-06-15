# RSS-to-Email Demo

This demo site illustrates using RSS-To-Email with a backend API and frontend preview. It is built on Jekyll, and you can run or build or run it locally with Docker:

- Build the site: `docker run --rm -it -v $PWD:/srv/jekyll jekyll/jekyll:latest jekyll build`
- Serve locally: `docker run --rm -it -v $PWD:/srv/jekyll -p 4000:4000 jekyll/jekyll:latest jekyll serve`

To deploy, I recommend using Github pages.
