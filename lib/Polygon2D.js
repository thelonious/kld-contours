if (typeof module !== "undefined") {
    let BoundingBox2D = require('./BoundingBox2D');
}

/**
 *  Polygon2D
 *
 *  @param {Array<Point2D>} points
 *  @returns {Polygon2D}
 */
function Polygon2D(points) {
    Object.defineProperties(this, {
        "points": {
            value: (points !== undefined) ? points : [],
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
Polygon2D.prototype.getBoundingBox = function() {
    if (this.points.length > 0) {
        var min = this.points[0];
        var max = this.points[0];

        for (var i = 1; i < this.points.length; i++) {
            let point = this.points[i];

            min = min.min(points);
            max = max.max(points);
        }

        return new BoundingBox2D(
            min.x,
            min.y,
            max.x - min.x,
            max.y - max.y
        );
    }
    else {
        return new BoundingBox2D(0, 0, 0, 0);
    }
};

/**
 *  tesselate
 *
 *  @returns {Polygon2D}
 */
Polygon2D.prototype.tesselate = function() {
    return this;
};

if (typeof module !== "undefined") {
    module.exports = Polygon2D;
}
