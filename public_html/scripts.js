var _kbel, _kb = {};

function attachKb(el) {
    el.onkeydown = function(e) {
        e = e || window.event, _kb[e.keyCode] = !0;
    }, el.onkeyup = function(e) {
        e = e || window.event, _kb[e.keyCode] = !1;
    }, _kbel = el, focusKb();
}

function focusKb() {
    _kbel.focus();
}

function kbd(c) {
    return !!_kb[c];
}

var _landAlt = [ 0, 0, 0, 0, 0, 2, 5, 6, 11, 14, 15, 16, 17, 16, 16, 14, 12, 12, 16, 16, 16, 15, 12, 12, 12, 14, 14, 15, 14, 12, 12, 12, 12, 15, 15, 16, 16, 16, 15, 14, 14, 14, 14, 14, 14, 14, 14, 14, 15, 14, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 15, 15, 15, 16, 16, 16, 15, 14, 14, 12, 12, 14, 16, 16, 16, 15, 14, 14, 16, 16, 16, 16, 16, 16, 16, 15, 10, 10, 5, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

function start() {
    attachKb(document.getElementById("top")), createLevel();
}

function createLevel() {
    create("plane", "main", 1800, 0), create("plane", "main", 1800, 200), create("plane", "enemy", 1800, 300), 
    setInterval(function() {
        document.getElementById("world").classList.toggle("y84", kbd(32));
    }, 500);
}

function create(id, cls, x, y) {
    var e = document.importNode(document.querySelector("#" + id).content, !0).querySelector("g");
    return e.setAttribute("transform", "translate(" + x + "," + y + ")"), e.classList.add(cls), 
    document.getElementById("world").appendChild(e), ret = {
        e: e
    }, _sodef[id] && Object.assign(ret, _sodef[id]), ret.onCreate && ret.onCreate(), 
    ret;
}

sobdefs = {
    plane: {}
};
//# sourceMappingURL=scripts.js.map