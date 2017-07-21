if (typeof module !== "undefined") {
    let BoundingBox2D = require('./BoundingBox2D'),
        Polygon2D    = require('./Polygon2D');
}

/**
 *  Ellipse2D
 *
 *  @param {Point2D} center
 *  @param {Number} radiusX
 *  @param {Number} radiusY
 *  @returns {Ellipse2D}
 */
function Ellipse2D(center, radiusX, radiusY) {
    Object.defineProperties(this, {
        "center": {
            value: center,
            writable: false,
            enumerable: true,
            configurable: false
        },
        "radiusX": {
            value: radiusX,
            writable: false,
            enumerable: true,
            configurable: false
        },
        "radiusY": {
            value: radiusY,
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
Ellipse2D.prototype.getBoundingBox = function() {
    return new BoundingBox2D(
        this.center.x - this.radiusX,
        this.center.y - this.radiusY,
        this.radiusX * 2.0,
        this.radiusY * 2.0
    );
};

/**
 *  toPolygon2D
 *
 *  @returns {Polygon2D}
 */
Ellipse2D.prototype.toPolygon2D = function() {
    return new Polygon2D();
};

if (typeof module !== "undefined") {
    module.exports = Ellipse2D;
}
