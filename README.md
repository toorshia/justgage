# JustGage

<p align="center"><img src="docs/img/logo.png"/></p>

[![Downloads](https://img.shields.io/npm/dm/justgage.svg)](https://www.npmjs.com/package/justgage)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.png?v=103)](https://opensource.org/licenses/mit-license.php)

[![NPM](https://nodei.co/npm/justgage.png?downloads=true)](https://nodei.co/npm/justgage/)

JustGage is a handy JavaScript plugin for generating and animating nice &amp; clean dashboard gauges. It is based on Raphaël library for vector drawing.

<p align="center"><img src="docs/img/screenshot.gif"/></p>

- [JustGage](#JustGage)
  - [Getting Started](#Getting-Started)
  - [Basic usage](#Basic-usage)
  - [Demo](#Demo)
  - [Examples](#Examples)
  - [Changelog](#Changelog)
  - [License](#License)
  - [Author](#Author)

## Getting Started

Installing Justgage is as easy as...

```bash
bower install justgage-official
```

or maybe you wish to use NPM...

```bash
npm install justgage --save
```

or you can always download the CSS and JS files...

```html
<!-- Raphael must be included before justgage -->
<script type="text/javascript" src="path/to/raphael-2.1.4.min.js"></script>
<script type="text/javascript" src="path/to/justgage.js"></script>
```

or if even don't want to download the files use [cdnjs](https://cdnjs.com/libraries/justgage)

```html
<!-- Raphael must be included before justgage -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.4/raphael-min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/justgage/1.2.9/justgage.min.js"></script>
```

## Basic usage

**Html**

```html
<div id="gauge"></div>
```

**JS**

```js

var gauge = new JustGage({
            id: "gauge", // the id of the html element
            value: 50,
            min: 0,
            max: 100,
            decimals: 2,
            gaugeWidthScale: 0.6
        });

// update the value randomly
setInterval(() => {
  gauge.refresh(Math.random() * 100);
}, 5000)

```

## Demo

Click [here](https://justgage.com/) to see a demo

## Examples

Click [here](http://justgage.com/examples/) for a list of examples

## Changelog

Check out the auto-generated [Changelog](CHANGELOG.md)

Or [here](CHANGELOG_OLD.md) you can find the old changelog (up to version 1.2.9)

## License

This project is licensed under [MIT](LICENSE) License

## Author

- [Bojan Djuricic](https://github.com/toorshia)