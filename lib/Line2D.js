if (typeof module !== "undefined") {
    let BoundingBox2D = require('./BoundingBox2D'),
        Polygon2D    = require('./Polygon2D');
}

/**
 *  Line2D
 *
 *  @param {Point2D} p1
 *  @param {Point2D} p2
 *  @returns {Line2D}
 */
function Line2D(p1, p2) {
    Object.defineProperties(this, {
        "p1": {
            value: p1,
            writable: false,
            enumerable: true,
            configurable: false
        },
        "p2": {
            value: p2,
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
    let min = this.p1.min(this.p2);
    let max = this.p1.max(this.p2);

    return new BoundingBox2D(
        min.x,
        min.y,
        max.x - min.x,
        max.y - min.y
    );
};

/**
 *  toPolygon2D
 *
 *  @returns {Polygon2D}
 */
Line2D.prototype.toPolygon2D = function() {
    return new Polygon2D([this.p1, this.p2]);
};

if (typeof module !== "undefined") {
    module.exports = Line2D;
}
