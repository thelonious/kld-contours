/**
 *  BoundingBox2D
 *
 *  @param {Number} x
 *  @param {Number} y
 *  @param {Number} width
 *  @param {Number} height
 *  @returns {BoundingBox2D}
 */
function BoundingBox2D(x, y, width, height) {
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
 *  overlaps
 *
 *  @param {BoundingBox2D} that
 *  @returns {Boolean}
 */
BoundingBox2D.prototype.overlaps = function(that) {
    return (
        this.x < (that.x + that.width)  && (this.x + this.width)  > that.x &&
        this.y < (that.y + that.height) && (this.y + this.height) > that.y
    );
};

/**
 *  isEmpty
 *
 *  @returns {Boolean}
 */
BoundingBox2D.prototype.isEmpty = function() {
    return this.width !== 0 && this.height !== 0;
};

/**
 *  toString
 *
 *  @returns {String}
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
