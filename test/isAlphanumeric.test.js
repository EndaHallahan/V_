const assert = require("assert");
const jsdom = require("jsdom");
const v_ = require("../");

describe("Validation Unit Tests", () => {
	const { document } = (new jsdom.JSDOM(`<!DOCTYPE html><p>Hello world</p>`)).window;
	const testForm = document.createElement("FORM");
	const testVal = new v_.V_(testForm);

	describe("v_is-alphanumeric", () => {
		it("should not pass if value is undefined", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(!testVal.v_isAlphanumeric(testInput, undefined, " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is null", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(!testVal.v_isAlphanumeric(testInput, null, " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is a non-alphanumeric character", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(!testVal.v_isAlphanumeric(testInput, "?", " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value contains a non-alphanumeric character", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(!testVal.v_isAlphanumeric(testInput, "troubadour?", " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should pass if value is an alphabetic character", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(testVal.v_isAlphanumeric(testInput, "A", " "));
			assert.ok(!testInput.validity.customError);
			done();
		});
		it("should not pass if value contains an alphabetic character", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(testVal.v_isAlphanumeric(testInput, "999999a999", " "));
			assert.ok(!testInput.validity.customError);
			done();
		});
		it("should pass if value is a numeric character", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(testVal.v_isAlphanumeric(testInput, "9", " "));
			assert.ok(!testInput.validity.customError);
			done();
		});
		it("should pass if value contains a numeric character", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(testVal.v_isAlphanumeric(testInput, "troubad0ur", " "));
			assert.ok(!testInput.validity.customError);
			done();
		});
	});
});