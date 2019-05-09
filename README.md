# kld-contours

- [Installation](#installation)
- [Importing](#importing)
- [API](#api)
- [Links and Related Projects](#links-and-related-projects)

---

A collection of classes to represent and manipulate various vector shapes

# Installation

```
npm install kld-contours
```

# Importing

The following sections indicate how you can import the code for use in various environments.

## Node

```javascript
import {CubicBezier2D, QuadraticBezier2D, Rectangle2D} = require("kld-contours");
```

## ESM in Modern Browsers

```javascript
import {CubicBezier2D, QuadraticBezier2D, Rectangle2D} from './node_modules/kld-contours/dist/index-esm.js';
```

## Older Browsers

```html
<script src="./node_modules/kld-contours/dist/index-umd.js"></script>
<script>
  var CubicBezier2D = KldContours.CubicBezier2D;
  var QuadraticBezier2D = KldContours.QuadraticBezier2D;
  var Rectangle2D = KldContours.Rectangle2D;
</script>
```

## Bundlers

```javascript
import {CubicBezier2D, QuadraticBezier2D, Rectangle2D} from "kld-contours";
```

# API

## BoundingBox2D

- overlaps
- isEmpty
- toString

## Circle2D

- getBoundingBox

## CubicBezier2D

- getPointAtParameter
- splitAtParameter
- getBernsteinPolynomials
- getArcLengthPolynomial
- getParameterFromArcLength
- getBoundingBox
- getAlignedBoundingBox
- getAlignedBezier
- toPolygon2D
- toString

## Ellipse2D

- getBoundingBox

## Line2D

- getBoundingBox
- toPolygon2D

## Polygon2D

- getBoundingBox
- toPolygon2D

## QuadraticBezier2D

- getPointAtParameter
- splitAtParameter
- getBernsteinPolynomials
- getArcLengthPolynomial
- getParameterFromArcLength
- getBoundingBox
- getAlignedBoundingBox
- getAlignedBezier
- toPolygon2D
- toString

## Rectangle2D

- getBoundingBox
- toPolygon2D

# Links and Related Projects

- [kld-affine](https://github.com/thelonious/kld-affine)
- [kld-polynomial](https://github.com/thelonious/kld-polynomial)
- [kld-intersections](https://github.com/thelonious/kld-intersections)
