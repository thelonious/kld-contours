if (typeof module !== "undefined") {
    let BoundingBox2D = require('./BoundingBox2D'),
        Point2D       = require('kld-affine').Point2D,
}

/**
 *  Rectangle2D
 *
 *  @param {Number} x
 *  @param {Number} y
 *  @param {Number} width
 *  @param {Number} height
 *  @returns {Rectangle2D}
 */
function Rectangle2D(x, y, width, height) {
    Object.defineProperties(this, {
        "x": {
            value: x,
            writable: false,
            enumerable: true,
            configurable: false
        },
        "y": {
            value: y,
            writable: false,
            enumerable: true,
            configurable: false
        },
        "width": {
            value: width,
            writable: false,
            enumerable: true,
            configurable: false
        },
        "height": {
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
Line2D.prototype.getBoundingBox = function() {
    return new BoundingBox2D(
        this.x,
        this.y,
        this.width,
        this.height
    );
};

/**
 *  tesselate
 *
 *  @returns {Polygon2D}
 */
Rectangle2D.prototype.tesselate = function() {
    return new Polygon2D([
        new Point2D(this.x,              this.y),
        new Point2D(this.x + this.width, this.y),
        new Point2D(this.x + this.width, this.y + this.height),
        new Point2D(this.x,              this.y + this.height)
    ]);
};

if (typeof module !== "undefined") {
    module.exports = Rectangle2D;
}
