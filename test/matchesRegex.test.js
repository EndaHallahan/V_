const assert = require("assert");
const jsdom = require("jsdom");
const v_ = require("../");

describe("Validation Unit Tests", () => {
	const { document } = (new jsdom.JSDOM(`<!DOCTYPE html><p>Hello world</p>`)).window;
	const testForm = document.createElement("FORM");
	const testVal = new v_.V_(testForm);

	describe("v_matches-regex", () => {
		it("should not run without an argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_matches-regex", "");
			assert.throws(() => {testVal.v_matchesRegex(testInput, "troubadour", " ")}, Error);
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is undefined", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_matchesRegex = "/.*/";
			assert.ok(!testVal.v_matchesRegex(testInput, undefined, " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is null", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_matchesRegex = "/.*/";
			assert.ok(!testVal.v_matchesRegex(testInput, null, " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value does not match", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_matchesRegex = "/betAlpha.*/";
			assert.ok(!testVal.v_matchesRegex(testInput, "alphabet soup", " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should pass if value does match", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_matchesRegex = "/alphabet.*/";
			assert.ok(testVal.v_matchesRegex(testInput, "alphabet soup", " "));
			assert.ok(!testInput.validity.customError);
			done();
		});
		it("should still pass if regex is not enclosed in slashes and value does match", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_matchesRegex = "alphabet.*";
			assert.ok(testVal.v_matchesRegex(testInput, "alphabet soup", " "));
			assert.ok(!testInput.validity.customError);
			done();
		});
	});
});