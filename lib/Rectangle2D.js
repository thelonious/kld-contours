"use strict";

let BoundingBox2D, Point2D, Polygon2D;

if (typeof module !== "undefined") {
    BoundingBox2D = require("./BoundingBox2D");
    ({Point2D} = require("kld-affine"));
    Polygon2D = require("./Polygon2D");
}

/**
 *  Rectangle2D
 *
 *  @class
 *  @param {number} x
 *  @param {number} y
 *  @param {number} width
 *  @param {number} height
 *  @returns {Rectangle2D}
 */
function Rectangle2D(x, y, width, height) {
    Object.defineProperties(this, {
        x: {
            value: x,
            writable: false,
            enumerable: true,
            configurable: false
        },
        y: {
            value: y,
            writable: false,
            enumerable: true,
            configurable: false
        },
        width: {
            value: width,
            writable: false,
            enumerable: true,
            configurable: false
        },
        height: {
            value: height,
            writable: false,
            enumerable: true,
            configurable: false
        }
    });
}

/**
 *  getBoundingBox
 *
 *  @returns {BoundingBox2D}
 */
Rectangle2D.prototype.getBoundingBox = function() {
    return new BoundingBox2D(
        this.x,
        this.y,
        this.width,
        this.height
    );
};

/**
 *  toPolygon2D
 *
 *  @returns {Polygon2D}
 */
Rectangle2D.prototype.toPolygon2D = function() {
    return new Polygon2D([
        new Point2D(this.x, this.y),
        new Point2D(this.x + this.width, this.y),
        new Point2D(this.x + this.width, this.y + this.height),
        new Point2D(this.x, this.y + this.height)
    ]);
};

if (typeof module !== "undefined") {
    module.exports = Rectangle2D;
}
