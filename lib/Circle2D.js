if (typeof module !== "undefined") {
    let BoundingBox2D = require('./BoundingBox2D'),
        Polygon2D    = require('./Polygon2D');
}

/**
 *  Circle2D
 *
 *  @param {Point2D} center
 *  @param {Number} radius
 *  @returns {Circle2D}
 */
function Circle2D(center, radius) {
    Object.defineProperties(this, {
        "center": {
            value: center,
            writable: false,
            enumerable: true,
            configurable: false
        },
        "radius": {
            value: radius,
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
Circle2D.prototype.getBoundingBox = function() {
    return new BoundingBox2D(
        this.center.x - this.radius,
        this.center.y - this.radius,
        this.radius * 2.0,
        this.radius * 2.0
    );
};

/**
 *  tesselate
 *
 *  @returns {Polygon2D}
 */
Circle2D.prototype.tesselate = function() {
    return new Polygon2D();
};

if (typeof module !== "undefined") {
    module.exports = Circle2D;
}
