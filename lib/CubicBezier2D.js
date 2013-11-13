var Polynomial = require('kld-polynomial').Polynomial;

function CubicBezier2D(p1, p2, p3, p4) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.p4 = p4;
}

CubicBezier2D.prototype.getBernsteinPolynomials = function() {
    var a, b, c, d; // temporary variables
    var c3x, c3y;   // coefficients of cubic
    var c2x, c2y;
    var c1x, c1y;
    var c0x, c0y;

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
    d = a.add(b.add(c.add(this.p4)));
    c3x = d.x;
    c3y = d.y;

    a = this.p1.multiply(3);
    b = this.p2.multiply(-6);
    c = this.p3.multiply(3);
    d = a.add(b.add(c));
    c2x = d.x;
    c2y = d.y;

    a = this.p1.multiply(-3);
    b = this.p2.multiply(3);
    c = a.add(b);
    c1x = c.x;
    c1y = c.y;

    c0x = this.p1.x;
    c0y = this.p1.y;

    return {
        x: new Polynomial(c3x, c2x, c1x, c0x),
        y: new Polynomial(c3y, c2y, c1y, c0y)
    }
};

module.exports = CubicBezier2D;
