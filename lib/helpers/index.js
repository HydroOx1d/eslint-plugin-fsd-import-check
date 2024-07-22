const layers = new Set(["features", "entity", "pages", "widgets", "app"]);

function isRelative(path) {
	return path == "." || path.startsWith("../") || path.startsWith("./");
}

module.exports = {
	layers,
	isRelative
};