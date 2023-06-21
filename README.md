# CaddyTailor

CaddyTailor is a framework to build themes using template feature provided by the [Caddy web server](https://caddyserver.com/).

**WARNING !**
Some themes will not work with the current (2.6.4) and lower versions of Caddy, because the template engine has no way to distinct directories from ordinary files. A fix was proposed and will be available with Caddy 2.7.0. In the meantime, you have to compile caddy by yourself with `xcaddy build master`. Of course, this is handled by Docker if you use it.

## Introduciton

Caddy is an efficient and practical web server with some unique features. One of those is the ability to use templates to build web pages from Markdown files. This functionality inspired the development of CaddyTailor, a project aimed at creating themes for Caddy's templates.

Caddy allows to display nearly static pages from markdown files using a [template module](https://caddyserver.com/docs/modules/http.handlers.templates). So it is not required anymore to compile your content with some tool like the famous [Jekyll](http://jekyllrb.com/), or one of its followers.

The pain with Caddy templates is that content and templates easily goes mixed and messy. So came up the idea of themes using only Caddy templates and some conguration tricks with the Caddyfile. And it works !

This project is a framework to code your own Caddy theme. You find here all you need to do so : a docker environment and three basic themes with few contents :

## Themes to start with

The easiest to start creating a new theme with CaddyTailor is to copy one of the base theme, the one that fit the best and adapt it.

- [base](https://github.com/taophp/caddy-tailor/tree/main/sites/themes/base): presents articles categorized by a menu ; articles are organized as Markdown files within corresponding category folders, supporting an arbitrary depth of sub-categories ;
- [baseonepage](https://github.com/taophp/caddy-tailor/tree/main/sites/themes/baseonepage): displays articles stacked vertically on a single page without categorization ; Markdown files are placed in a single folder ;
- [baseonepage2d](https://github.com/taophp/caddy-tailor/tree/main/sites/themes/baseonepage): baseonepage on steroid, each row displays the markdown files contained in a directory ; each file is displayed on a screen, just swipe left or right.

Start from them to make you own !

## Themes to use

I use this repository also to store the themes I work on, so they are available for inspiration.

- [Pure](https://github.com/taophp/caddy-tailor/tree/main/sites/themes/pure): a Bootstrap theme, migrated from [Sculpin](https://sculpin.io/), I'm using for my [personal website](https://stephanemourey.fr) (french only, sorry !).


## How to start

```bash
$ git clone git@github.com:taophp/caddy-tailor.git
$ cd caddy-tailor
$ docker-compose up
```

Then open your browser to https://sample.localhost, https://sampleonepage.localhost or https://sampleonepage2d.localhost. Next explore and play with the [base](https://github.com/taophp/caddy-tailor/tree/main/sites/themes/base) theme and [others](https://github.com/taophp/caddy-tailor/tree/main/sites/themes) ! And explore and play with the [contents samples](https://github.com/taophp/caddy-tailor/tree/main/sites/subdomains) !

## License

Caddy Tailor is released under the [MIT License](https://github.com/caddytailor/caddytailor/blob/main/LICENSE).