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

### How it works

### Caddyfile trick

The first thing that allows CaddyTailor to work is the [route directive in the Caddyfile](https://github.com/taophp/caddy-tailor/blob/main/Caddyfile#L11) :
```yaml
    route {
        try_files /subdomains/{http.request.host.labels.1}/{path} {path} index.html
    }
```

It makes the webserver to looks for a file in three locations, in this order, and the first win :

1. in the directory of the website, so any file define here will be served directly,
2. from the root of the site : use it to addresse theme assets,
3. [index.html](https://github.com/taophp/caddy-tailor/blob/main/sites/index.html) : it is the _router template_ of CaddyTailor, which make the themes working.


### Directory structure

Except the trick in Caddyfile, CaddyTailor resides belongs to the [sites directory](https://github.com/taophp/caddy-tailor/tree/main/sites).
OK, you may configure your project another way, but it is the case wit this project.


```
├── subdomains
│   ├── sample
│   │   └── .config.yml
│   ├── sampleonepage
│   │   └── .config.yml
│   ├── sampleonepage2d
│   │   └── .config.yml
├── themes
│   ├── base
│   ├── baseonepage
│   ├── baseonepage2d
│   ├── core
│   ├── pixy
│   └── pure
├── index.html
└── default.config.ymml
```

In this project, all sites are [subdomains of localhost](https://github.com/taophp/caddy-tailor/blob/main/Caddyfile#L6) and their datas are stored in the `subdomains` directory, on per site.

All themes are stored in the [`themes`](https://github.com/taophp/caddy-tailor/tree/main/sites/themes) directory, one directory per theme. They contains templates, and, eventually, assets.

`index.html` is the _router template_ that routes data into the theme templates. It is required to make CaddyTailor work and contains it mains logic.

`default.config.yml` contains the default configuration to adapt the behavior of the theme. Each theme may define its own directives, but this file define a minimal set that should be shared by all. It can also be seen as a documentation to help writing the sites configuration. This configuration is overwriten by the sites configuration, which stands in the `.config.yml` in each site directory.

Some files may be shared by themes. So, the pseudo-theme `core` was created to prevent re-inventing the wheel for each theme. 

Each theme requires the sites that uses them to adopt an specific directory structure. `sample` sites are presents in this project to document those expectations. Each theme _should_ contains a `README.md` to document how it works (directory structure expected, specific configuration directives...).

## License

Caddy Tailor is released under the [MIT License](https://github.com/caddytailor/caddytailor/blob/main/LICENSE).