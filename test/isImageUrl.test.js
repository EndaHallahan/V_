const assert = require("assert");
const jsdom = require("jsdom");
const v_ = require("../");

describe("Validation Unit Tests", () => {
	const { document } = (new jsdom.JSDOM(`<!DOCTYPE html><p>Hello world</p>`)).window;
	const testForm = document.createElement("FORM");
	const testVal = new v_.V_(testForm);

	describe("v_is-image-link", () => {
		it("should not pass if value is undefined", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(!testVal.v_isImageUrl(testInput, undefined, " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is null", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(!testVal.v_isImageUrl(testInput, null, " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is not a URL", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(!testVal.v_isImageUrl(testInput, "alphabet soup", " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is not a valid URL", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(!testVal.v_isImageUrl(testInput, "htps:/e.eeee.org/eeee.ee.e", " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is a valid URL but does not end in a supported image extension", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(!testVal.v_isImageUrl(testInput, "https://e.eeee.org/eee.ee", " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should pass if value is a valid URL and ends in a supported image extension: APNG", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(testVal.v_isImageUrl(testInput, "https://e.eeee.org/eee.apng", " "));
			assert.ok(!testInput.validity.customError);
			done();
		});
		it("should pass if value is a valid URL and ends in a supported image extension: GIF", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(testVal.v_isImageUrl(testInput, "https://e.eeee.org/eee.gif", " "));
			assert.ok(!testInput.validity.customError);
			done();
		});
		it("should pass if value is a valid URL and ends in a supported image extension: JPEG", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(testVal.v_isImageUrl(testInput, "https://e.eeee.org/eee.jpg", " "));
			assert.ok(!testInput.validity.customError);
			assert.ok(testVal.v_isImageUrl(testInput, "https://e.eeee.org/eee.jpeg", " "));
			assert.ok(!testInput.validity.customError);
			assert.ok(testVal.v_isImageUrl(testInput, "https://e.eeee.org/eee.jfif", " "));
			assert.ok(!testInput.validity.customError);
			assert.ok(testVal.v_isImageUrl(testInput, "https://e.eeee.org/eee.pjpeg", " "));
			assert.ok(!testInput.validity.customError);
			assert.ok(testVal.v_isImageUrl(testInput, "https://e.eeee.org/eee.pjp", " "));
			assert.ok(!testInput.validity.customError);
			done();
		});
		it("should pass if value is a valid URL and ends in a supported image extension: PNG", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(testVal.v_isImageUrl(testInput, "https://e.eeee.org/eee.png", " "));
			assert.ok(!testInput.validity.customError);
			done();
		});
		it("should pass if value is a valid URL and ends in a supported image extension: SVG", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(testVal.v_isImageUrl(testInput, "https://e.eeee.org/eee.svg", " "));
			assert.ok(!testInput.validity.customError);
			done();
		});
		it("should pass if value is a valid URL and ends in a supported image extension: WebP", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(testVal.v_isImageUrl(testInput, "https://e.eeee.org/eee.webp", " "));
			assert.ok(!testInput.validity.customError);
			done();
		});
	});
});