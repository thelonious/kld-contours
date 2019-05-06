/**
 *  BoundingBox2D.js
 *
 *  @module BoundingBox2D
 *  @copyright 2011-2019 Kevin Lindsey
 */

/**
 *  BoundingBox2D
 */
class BoundingBox2D {
    /**
     *  @param {number} x
     *  @param {number} y
     *  @param {number} width
     *  @param {number} height
     *  @returns {module:kld-contours.BoundingBox2D}
     */
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    /**
     *  overlaps
     *
     *  @param {module:kld-contours.BoundingBox2D} that
     *  @returns {boolean}
     */
    overlaps(that) {
        return (
            this.x < (that.x + that.width) && (this.x + this.width) > that.x &&
            this.y < (that.y + that.height) && (this.y + this.height) > that.y
        );
    }

    /**
     *  isEmpty
     *
     *  @returns {boolean}
     */
    isEmpty() {
        return this.width !== 0 && this.height !== 0;
    }

    /**
     *  toString
     *
     *  @returns {string}
     */
    toString() {
        return (
            "bbox(" +
            this.x + "," +
            this.y + "," +
            this.width + "," +
            this.height + ")"
        );
    }
}

export default BoundingBox2D;
