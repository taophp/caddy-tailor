# CaddyTailor

CaddyTailor is a framework to build themes for the [Caddy server](https://caddyserver.com/).

** WARNING ! **
Some themes will not work with the current (2.6.4) and lower versions of Caddy, because the template engine has no way to distinct directories from ordinary files. A fix was proposed and will be available with Caddy 2.7.0. In the meantime, you have to compile caddy by yourself with `xcaddy build master`. Of course, this is handled by Docker if you use it.

Caddy allows to display nearly static pages from markdown files using a [template module](https://caddyserver.com/docs/modules/http.handlers.templates). So it is not required anymore to compile your content with some tool like the famous [Jekyll](http://jekyllrb.com/), or one of its followers.

The pain with Caddy templates is that content and templates easily goes mixed and messy. So came up the idea of themes using only Caddy templates and some conguration tricks with the Caddyfile. And it works !

This project is a framework to code your own Caddy theme. You find here all you need to do so : a docker environment and three basic themes with few contents :

- [base](https://github.com/taophp/caddy-tailor/tree/main/sites/themes/base): handles a directory tree of markdown files : each (sub)directory is a (sub)category display a list of available markdown pages ; the menu handle all this hierarchy in a nested tree.
- [baseonepage](https://github.com/taophp/caddy-tailor/tree/main/sites/themes/baseonepage): displays all markdown files one after the other, each on it own screen, with a menu ;
- [baseonepage2d](https://github.com/taophp/caddy-tailor/tree/main/sites/themes/baseonepage): baseonepage on steroid, each row displays the markdown files contained in a directory ; each file is displayed on a screen, just swipe left or right.
- [Pure](https://github.com/taophp/caddy-tailor/tree/main/sites/themes/pure): a Bootstrap theme I planed to use for my [personal website](https://stephanemourey.fr) (french only, sorry !).

Start from them to make you own !

## How to start

```bash
$ git clone git@github.com:taophp/caddy-tailor.git
$ cd caddy-tailor
$ docker-compose up
```

Then open your browser to https://sample.localhost, https://sampleonepage.localhost or https://sampleonepage2d.localhost.