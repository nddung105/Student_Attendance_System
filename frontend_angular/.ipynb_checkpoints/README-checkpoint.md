[![@coreui angular](https://img.shields.io/badge/@coreui%20-angular-lightgrey.svg?style=flat-square)](https://github.com/coreui/angular)
[![npm package][npm-coreui-angular-badge]][npm-coreui-angular]
[![NPM downloads][npm-coreui-angular-download]][npm-coreui-angular]  
[![@coreui coreui](https://img.shields.io/badge/@coreui%20-coreui-lightgrey.svg?style=flat-square)](https://github.com/coreui/coreui)
[![npm package][npm-coreui-badge]][npm-coreui]
[![NPM downloads][npm-coreui-download]][npm-coreui]  
![angular](https://img.shields.io/badge/angular-^9.1.1-lightgrey.svg?style=flat-square&logo=angular)  

[npm-coreui-angular]: https://www.npmjs.com/package/@coreui/angular  
[npm-coreui-angular-badge]: https://img.shields.io/npm/v/@coreui/angular.png?style=flat-square  
[npm-coreui-angular-download]: https://img.shields.io/npm/dm/@coreui/angular.svg?style=flat-square  
[npm-coreui]: https://www.npmjs.com/package/@coreui/coreui
[npm-coreui-badge]: https://img.shields.io/npm/v/@coreui/coreui.png?style=flat-square
[npm-coreui-download]: https://img.shields.io/npm/dm/@coreui/coreui.svg?style=flat-square
![TECHPRO](https://techpro.vn/FileUpload/Images/logo.png)
# TECHPRO CoreUI Free Angular 2 + Admin Template 

#### Prerequisites
Before you begin, make sure your development environment includes `Node.js®` and an `npm` package manager.

###### Node.js
Angular 9 requires `Node.js` version 10.13 or later.

- To check your version, run `node -v` in a terminal/console window.
- To get `Node.js`, go to [nodejs.org](https://nodejs.org/).

###### Angular CLI
Install the Angular CLI globally using a terminal/console window.
```bash
sudo npm install -g @angular/cli

```

##### Update to Angular 9
Angular 9 requires `Node.js` version 10.x or newer    
Update guide - see: [https://update.angular.io](https://update.angular.io)

## Installation

### Clone repo


## install app's dependencies
```
$ sudo npm install
```

## Run Project
``` bash
# serve with hot reload at localhost:4200.
$ ng serve

# build for production with minification
$ ng build
```

## Build and Run PRODUCTION
``` bash
# install forever
sudo npm install forever -g

# Config server link to static link
$ nano src/config.ts

# build for production with minification
$ ng build --prod --output-path ./dist

# run server forever
$ forever start server.js
```

## DEPLOY TO FASTAPI BACKEND
``` bash
# Config server link to protocol + host + port
$ nano src/config.ts

# build for production with minification
$ ng build --prod --output-path ./dist --base-href /techpro/

# Put resource to right place
$ mv dist FOLDER_ENGINE 
$ cd FOLDER_ENGINE 
$ mv dist/index.html templates
```

## Create new function
```
ng g c views/NAME
ng g m views/NAME --routing
==> Fix app.routing; app.module; routing.module; module
```
---------------------------------------------------

Please help us on [Product Hunt](https://www.producthunt.com/posts/coreui-open-source-bootstrap-4-admin-template-with-angular-2-react-js-vue-js-support) and [Designer News](https://www.designernews.co/stories/81127). Thanks in advance!

Curious why I decided to create CoreUI? Please read this article: [Jack of all trades, master of none. Why Bootstrap Admin Templates suck.](https://medium.com/@lukaszholeczek/jack-of-all-trades-master-of-none-5ea53ef8a1f#.7eqx1bcd8)

CoreUI is an Open Source Bootstrap Admin Template. But CoreUI is not just another Admin Template. It goes way beyond hitherto admin templates thanks to transparent code and file structure. And if that's not enough, let’s just add that CoreUI consists bunch of unique features and over 1000 high quality icons.

CoreUI is based on Bootstrap 4 and offers 6 versions: 
[HTML5 AJAX](https://github.com/coreui/coreui-free-bootstrap-admin-template-ajax), 
[HTML5](https://github.com/coreui/coreui-free-angular-admin-template), 
[Angular 2+](https://github.com/coreui/coreui-free-angular-admin-template), 
[React.js](https://github.com/coreui/coreui-free-react-admin-template), 
[Vue.js](https://github.com/coreui/coreui-free-vue-admin-template)
 & [.NET Core 2](https://github.com/mrholek/CoreUI-NET).

CoreUI is meant to be the UX game changer. Pure & transparent code is devoid of redundant components, so the app is light enough to offer ultimate user experience. This means mobile devices also, where the navigation is just as easy and intuitive as on a desktop or laptop. The CoreUI Layout API lets you customize your project for almost any device – be it Mobile, Web or WebApp – CoreUI covers them all!

## Table of Contents

- [CoreUI Free Angular 2+ Admin Template ![Tweet](https://twitter.com/intent/tweet?text=CoreUI%20-%20Free%20Bootstrap%204%20Admin%20Template%20&url=https://coreui.io&hashtags=bootstrap,admin,template,dashboard,panel,free,angular,react,vue)](#coreui-free-angular-2-admin-template-tweethttpstwittercomintenttweettextcoreui20-20free20bootstrap20420admin20template20urlhttpscoreuiiohashtagsbootstrapadmintemplatedashboardpanelfreeangularreactvue)
  - [Table of Contents](#table-of-contents)
  - [Versions](#versions)
  - [CoreUI Pro](#coreui-pro)
  - [Admin Templates built on top of CoreUI Pro](#admin-templates-built-on-top-of-coreui-pro)
      - [Prerequisites](#prerequisites)
          - [Node.js](#nodejs)
          - [Angular CLI](#angular-cli)
        - [Update to Angular 9](#update-to-angular-9)
  - [Installation](#installation)
    - [Clone repo](#clone-repo)
  - [Usage](#usage)
  - [What's included](#whats-included)
  - [Documentation](#documentation)
  - [Contributing](#contributing)
  - [Versioning](#versioning)
  - [Creators](#creators)
  - [Community](#community)
    - [Community Projects](#community-projects)
  - [Copyright and license](#copyright-and-license)
  - [Support CoreUI Development](#support-coreui-development)

## Versions

CoreUI is built on top of Bootstrap 4 and supports popular frameworks.

* [CoreUI Free Bootstrap Admin Template](https://github.com/coreui/coreui-free-bootstrap-admin-template)
* [CoreUI Free Bootstrap Admin Template (Ajax)](https://github.com/coreui/coreui-free-bootstrap-admin-template-ajax)
* [CoreUI Free Angular 2+ Admin Template](https://github.com/coreui/coreui-free-angular-admin-template)
* 🚧 CoreUI Free .NET Core 2 Admin Template (Available Soon)
* [CoreUI Free React.js Admin Template](https://github.com/coreui/coreui-free-react-admin-template)
* [CoreUI Free Vue.js Admin Template](https://github.com/coreui/coreui-free-vue-admin-template)

## CoreUI Pro

* 💪  [CoreUI Pro Bootstrap Admin Template](https://coreui.io/pro/)
* 💪  [CoreUI Pro Bootstrap Admin Template (Ajax)](https://coreui.io/pro/)
* 💪  [CoreUI Pro Angular Admin Template](https://coreui.io/pro/angular)
* 💪  [CoreUI Pro React Admin Template](https://coreui.io/pro/react)
* 💪  [CoreUI Pro Vue Admin Template](https://coreui.io/pro/vue)

## Admin Templates built on top of CoreUI Pro

| CoreUI Pro | Prime | Root | Alba | Leaf |
| --- | --- | --- | --- | --- |
| [![CoreUI Pro Admin Template](https://coreui.io/assets/img/example-coureui.jpg)](https://coreui.io/pro/angular/)| [![Prime Admin Template](https://coreui.io/assets/img/responsive-prime.png)](https://coreui.io/admin-templates/angular/prime/?support=1)| [![Root Admin Template](https://coreui.io/assets/img/responsive-root.png)](https://coreui.io/admin-templates/angular/root/?support=1)| [![Alba Admin Template](https://coreui.io/assets/img/responsive-alba.png)](https://coreui.io/admin-templates/angular/alba/?support=1)| [![Leaf Admin Template](https://coreui.io/assets/img/responsive-leaf.png)](https://coreui.io/admin-templates/angular/leaf/?support=1)
