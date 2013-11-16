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
    // this.x = x;
    // this.y = y;
    // this.width = width;
    // this.height = height;
}

Rectangle2D.prototype.toString = function() {
	return (
		"rectangle(" +
		this.x + "," +
		this.y + "," +
		this.width + "," +
		this.height + ")"
	);
};

if (typeof module !== "undefined") {
	module.exports = Rectangle2D;
}
