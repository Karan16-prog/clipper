## Clipper

A fullstack application used to save articles and access it from any device. It parses and scrapes the article's metadata and saves them in a card format with their title, image and domain.
Built using Next, Prisma ORM, Postgresql, Next Auth & Typescript.

Hosted Link :- https://clipper-nine.vercel.app/


## Status - In Progress

This project is currently in development.
  1. Mobile responsiveness
  2. iOS & Android apps
  3. Bug/Issue fixes
  4. Empty states
  5. Opening the article within the page

## Screenshots

[![Screenshot-2024-01-19-at-12-16-10-PM.png](https://i.postimg.cc/2y3Hd1W3/Screenshot-2024-01-19-at-12-16-10-PM.png)](https://postimg.cc/SYF7kNDp)

[![Screenshot-2024-01-19-at-12-05-08-PM.png](https://i.postimg.cc/63NsWLDw/Screenshot-2024-01-19-at-12-05-08-PM.png)](https://postimg.cc/5HpKpv4k)

[![Screenshot-2024-01-19-at-12-20-52-PM.png](https://i.postimg.cc/Dy3FgG6t/Screenshot-2024-01-19-at-12-20-52-PM.png)](https://postimg.cc/pyCgVpgZ)

## Installation and Setup Instructions

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Installation

`npm install`

Run development server:

`npm run dev`

To visit app:

`http://localhost:3000`

To visit deployed application (via Vercel):

`https://clipper-nine.vercel.app/`

The application has Google and Github ouath along with guest login. The application cannot be accessed locally without db keys.

## Reflection

This project's goals included learning the app router introduced in NEXT 13/14, best practices of server side rendering, server components and server actions, and how to parse & scrape
a website using Javascript/Typescript.

One of the main challenges I ran into was how to determine if a url points to an article or not.
For eg [medium](https://medium.com/) is not an article but  [Stop using localstorage](https://medium.com/@julienetienne/stop-using-localstorage-64a6d6805da8) is an article.
If url is not an article, the app just saves the url and scrapes for the website logo.
If url is an article, the app scrapes the title of the article, the main image if present in the article, and the author of the article.

I wrote an algorithm that needs to be further refined but works for articles with well defined HTML semantics that follow the Open Graph Protocol (`https://ogp.me/`). 
OGP enables any website to become an object in a social graph. It does so by adding metadata tags in your website.

`<meta property="og:title" content="The Rock" />`

`<meta property="og:type" content="video.movie" />`

`<meta property="og:url" content="https://www.imdb.com/title/tt0117500/" />`

`<meta property="og:image" content="https://ia.media-imdb.com/images/rock.jpg" />`

This application scrapes the metadata tags for urls with og:type article, title etc and based on that returns a JSON response. This api can be found in the `src/api/add/route.ts` file

