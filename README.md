# CaddyTaylor

CaddyTaylor is a framework to build themes for the [Caddy server](https://caddyserver.com/).

Caddy allows to display nearly static pages from markdown files using a [template module](https://caddyserver.com/docs/modules/http.handlers.templates). So it is not required anymore to compile your content with some tool like the famous [Jekyll](http://jekyllrb.com/), or one of his followers.

The pain with Caddy templates is that content and templates easily goes mixed and messy. So came up the idea of themes using only Caddy templates and some conguration tricks with the Caddyfile. And it works !

This project is a framework to code your own Caddy theme. You find here all you need to do so : a docker environment and three themes with few contents :

- [base](/themes/base): handles a directory tree of markdown files : each (sub)directory is a (sub)category display a list of available markdown pages ; the menu handle all this hierarchy in a nested tree.
- [baseonepage](/themes/baseonepage): displays all markdown files one after the other, each on it own screen, with a menu ;
- [baseonepage2d](/themes/baseonepage): baseonepage on steroid, each row displays the markdown files contained in a directory ; each file is displayed on a screen, just swipe left or right.
