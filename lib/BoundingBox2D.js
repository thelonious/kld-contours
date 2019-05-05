"use strict";

/**
 *  BoundingBox2D
 *
 *  @class
 *  @param {number} x
 *  @param {number} y
 *  @param {number} width
 *  @param {number} height
 *  @returns {BoundingBox2D}
 */
function BoundingBox2D(x, y, width, height) {
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
 *  overlaps
 *
 *  @param {BoundingBox2D} that
 *  @returns {boolean}
 */
BoundingBox2D.prototype.overlaps = function(that) {
    return (
        this.x < (that.x + that.width) && (this.x + this.width) > that.x &&
        this.y < (that.y + that.height) && (this.y + this.height) > that.y
    );
};

/**
 *  isEmpty
 *
 *  @returns {boolean}
 */
BoundingBox2D.prototype.isEmpty = function() {
    return this.width !== 0 && this.height !== 0;
};

/**
 *  toString
 *
 *  @returns {string}
 */
BoundingBox2D.prototype.toString = function() {
    return (
        "bbox(" +
        this.x + "," +
        this.y + "," +
        this.width + "," +
        this.height + ")"
    );
};

if (typeof module !== "undefined") {
    module.exports = BoundingBox2D;
}
