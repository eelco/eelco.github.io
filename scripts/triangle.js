addEventListener("load", function(event) {
    var minRotation = 0;
    var maxRotation = 9;
    var maxScroll = -30;

    var triangle = document.getElementById("triangle");
    var planes = triangle.getElementsByClassName("plane");

    var waitForTransition = [].slice.call(planes[1].getElementsByClassName("cube"))
    waitForTransition.push(planes[0])

    var twistElements = []

    triangle.addEventListener("transitionend", function(event) {
        var targetIndex = waitForTransition.indexOf(event.target)
        if (targetIndex >= 0) {
            event.target["_matrix3d"] = new WebKitCSSMatrix(getComputedStyle(event.target)["transform"]);
            twistElements.push(event.target);
            waitForTransition.splice(targetIndex, 1);
        }
    });

    document.addEventListener("scroll", function() {
        if (waitForTransition.length != 0) {
            return;
        } // else

        var relativeScroll = document.scrollingElement.scrollTop / maxScroll;
        var rotationZ = Math.max(minRotation, Math.min(maxRotation, maxRotation * relativeScroll));

        if (rotationZ != minRotation) { triangle.classList.add("pulling"); }
        if (rotationZ == maxRotation) { triangle.classList.remove("twisted"); }

        twistElements.map(function(element) {
            matrix = element["_matrix3d"];
            element.style.transform = matrix.rotate(0, 0, rotationZ).toString()
        });

        if (rotationZ != maxRotation) { triangle.classList.add("twisted"); }
        if (rotationZ == minRotation) { triangle.classList.remove("pulling"); }
    });

    setTimeout(function() { triangle.classList.add("twisted") }, 500);
});
