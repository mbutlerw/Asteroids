var colliding = function(b1, b2) {



    var initcheck = (b1 === b2 ||
         (b1 instanceof Asteroid && b2 instanceof Asteroid) ||
         (b1 instanceof Player && b2 instanceof Bullet) ||
         (b1 instanceof Bullet && b2 instanceof Player) ||
         (b1 instanceof Bullet && b2 instanceof Bullet) ||
         (b1 instanceof Powerup && b2 instanceof Asteroid) ||
         (b1 instanceof Asteroid && b2 instanceof Powerup) ||
         (b1 instanceof Bullet && b2 instanceof Powerup) ||
         (b1 instanceof Powerup && b2 instanceof Bullet) ||
         (b1 instanceof Powerup && b2 instanceof Powerup) ||
         (b1 instanceof Player && b2 instanceof Powerup) ||
         b1.center.x + b1.size.x < b2.center.x - b2.size.x ||
         b1.center.y + b1.size.y < b2.center.y - b2.size.y  ||
         b1.center.x - b1.size.x > b2.center.x + b2.size.x  ||
         b1.center.y - b1.size.y > b2.center.y + b2.size.y
        )

    if (!initcheck) {

      if (b1 instanceof Bullet) {
        var p1 = b1.center
        var p2 = { x: b1.center.x + b1.velocity.x, y: b1.center.y + b1.velocity.y}

        for(let j = 0; j < b2.vertices.length; j++) {
          var q1 = b2.vertices[j]
          if (j === b2.vertices.length - 1) {
            var q2 = b2.vertices[0]
          } else {
            var q2 = b2.vertices[j+1]
          }

          if (doLineSegmentsIntersect(p1, p2, q1, q2)) {return true}

        }
        return false;
       }

       if (b2 instanceof Bullet) {
         var p1 = b2.center
         var p2 = { x: b2.center.x + b2.velocity.x, y: b2.center.y + b2.velocity.y }

         for(let j = 0; j < b1.vertices.length; j++) {
           var q1 = b1.vertices[j]
           if (j === b1.vertices.length - 1) {
             var q2 = b1.vertices[0]
           } else {
             var q2 = b1.vertices[j+1]
           }

           if (doLineSegmentsIntersect(p1, p2, q1, q2)) {return true}

         }
         return false;
        }


      if (b1 != b2) {
        for(let i = 0; i < b1.vertices.length; i++) {
          var p1 = b1.vertices[i]
          if (i === b1.vertices.length - 1) {
            var p2 = b1.vertices[0]
          } else {
          var p2 = b1.vertices[i+1]
          }
          for(let j = 0; j < b2.vertices.length; j++) {
            var q1 = b2.vertices[j]
            if (j === b2.vertices.length - 1) {
              var q2 = b2.vertices[0]
            } else {
              var q2 = b2.vertices[j+1]
            }
            if (doLineSegmentsIntersect(p1, p2, q1, q2)) {return true}

          }
        }
        return false;
      }
    } else {
      return false
    }
}



/**
  * See if two line segments intersect. This uses the
  * vector cross product approach described below:
  * http://stackoverflow.com/a/565282/786339
 *
 * @param {Object} p point object with x and y coordinates
 *  representing the start of the 1st line.
 * @param {Object} p2 point object with x and y coordinates
 *  representing the end of the 1st line.
 * @param {Object} q point object with x and y coordinates
 *  representing the start of the 2nd line.
 * @param {Object} q2 point object with x and y coordinates
 *  representing the end of the 2nd line.
 */
function doLineSegmentsIntersect(p, p2, q, q2) {
	var r = subtractPoints(p2, p);
	var s = subtractPoints(q2, q);

	var uNumerator = crossProduct(subtractPoints(q, p), r);
	var denominator = crossProduct(r, s);

	if (uNumerator == 0 && denominator == 0) {
		// They are coLlinear

		// Do they touch? (Are any of the points equal?)
		if (equalPoints(p, q) || equalPoints(p, q2) || equalPoints(p2, q) || equalPoints(p2, q2)) {
			return true
		}
		// Do they overlap? (Are all the point differences in either direction the same sign)
		return !allEqual(
				(q.x - p.x < 0),
				(q.x - p2.x < 0),
				(q2.x - p.x < 0),
				(q2.x - p2.x < 0)) ||
			!allEqual(
				(q.y - p.y < 0),
				(q.y - p2.y < 0),
				(q2.y - p.y < 0),
				(q2.y - p2.y < 0));
	}

	if (denominator == 0) {
		// lines are paralell
		return false;
	}

	var u = uNumerator / denominator;
	var t = crossProduct(subtractPoints(q, p), s) / denominator;

	return (t >= 0) && (t <= 1) && (u >= 0) && (u <= 1);
}

/**
 * Calculate the cross product of the two points.
 *
 * @param {Object} point1 point object with x and y coordinates
 * @param {Object} point2 point object with x and y coordinates
 *
 * @return the cross product result as a float
 */
function crossProduct(point1, point2) {
	return point1.x * point2.y - point1.y * point2.x;
}

/**
 * Subtract the second point from the first.
 *
 * @param {Object} point1 point object with x and y coordinates
 * @param {Object} point2 point object with x and y coordinates
 *
 * @return the subtraction result as a point object
 */
function subtractPoints(point1, point2) {
	var result = {};
	result.x = point1.x - point2.x;
	result.y = point1.y - point2.y;

	return result;
}

/**
 * See if the points are equal.
 *
 * @param {Object} point1 point object with x and y coordinates
 * @param {Object} point2 point object with x and y coordinates
 *
 * @return if the points are equal
 */
function equalPoints(point1, point2) {
	return (point1.x == point2.x) && (point1.y == point2.y)
}

/**
 * See if all arguments are equal.
 *
 * @param {...} args arguments that will be compared by '=='.
 *
 * @return if all arguments are equal
 */
function allEqual(args) {
	var firstValue = arguments[0],
		i;
	for (i = 1; i < arguments.length; i += 1) {
		if (arguments[i] != firstValue) {
			return false;
		}
	}
	return true;
}

/**
 * @author Peter Kelley
 * @author pgkelley4@gmail.com
 */
