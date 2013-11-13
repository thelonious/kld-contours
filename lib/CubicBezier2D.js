var Polynomial = require('kld-polynomial').Polynomial;

function CubicBezier2D(p1, p2, p3, p4) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.p4 = p4;
}

CubicBezier2D.prototype.getBernsteinPolynomials = function() {
    var a, b, c;        // temporary variables
    var c3, c2, c1, c0; // coefficients of cubic

    // Start with Bezier using Bernstein polynomials for weighting functions:
    //     (1-t^3)P1 + 3t(1-t)^2P2 + 3t^2(1-t)P3 + t^3P4
    //
    // Expand and collect terms to form linear combinations of original Bezier
    // controls.  This ends up with a vector cubic in t:
    //     (-P1+3P2-3P3+P4)t^3 + (3P1-6P2+3P3)t^2 + (-3P1+3P2)t + P1
    //             /\                  /\                /\       /\
    //             ||                  ||                ||       ||
    //             c3                  c2                c1       c0

    // Calculate the coefficients
    a = this.p1.multiply(-1);
    b = this.p2.multiply(3);
    c = this.p3.multiply(-3);
    c3 = a.add(b.add(c.add(this.p4)));

    a = this.p1.multiply(3);
    b = this.p2.multiply(-6);
    c = this.p3.multiply(3);
    c2 = a.add(b.add(c));

    a = this.p1.multiply(-3);
    b = this.p2.multiply(3);
    c1 = a.add(b);

    c0 = this.p1;

    return {
        x: new Polynomial(c3.x, c2.x, c1.x, c0.x),
        y: new Polynomial(c3.y, c2.y, c1.y, c0.y)
    }
};

CubicBezier2D.prototype.getBoundingBox = function() {

};

CubicBezier2D.prototype.getAlignedBoundingBox = function() {

};

CubicBezier2D.prototype.getAlignedBezier = function() {

};

CubicBezier2D.prototype.tesselate = function() {

};

module.exports = CubicBezier2D;
