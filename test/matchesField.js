const assert = require("assert");
const jsdom = require("jsdom");
const v_ = require("../");

describe("Validation Unit Tests", () => {
	const { document } = (new jsdom.JSDOM(`<!DOCTYPE html><p>Hello world</p>`)).window;
	const testForm = document.createElement("FORM");
	const testVal = new v_.V_(testForm);

	describe("v_matches-field", () => {
		it("should not run without an argument", (done) => {
			const testSubForm = document.createElement("FORM");
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_matches-field", "");
			testSubForm.appendChild(testInput);
			const testInput2 = document.createElement("INPUT");
			testInput2.setAttribute("type", "text");
			testInput2.setAttribute("name", "testInput2");
			testInput2.value = "test string";
			testSubForm.appendChild(testInput2);
			assert.throws(() => {!testVal.v_matchesField(testInput, "test string", " ")}, Error);
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not run if input element is not in a form", (done) => {
			const testSubForm = document.createElement("DIV");
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_matches-field", "");
			testSubForm.appendChild(testInput);
			const testInput2 = document.createElement("INPUT");
			testInput2.setAttribute("type", "text");
			testInput2.setAttribute("name", "testInput2");
			testInput2.value = "test string";
			testSubForm.appendChild(testInput2);
			assert.throws(() => {!testVal.v_matchesField(testInput, "test string", " ")}, Error);
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not run if it cannot find the specified field", (done) => {
			const testSubForm = document.createElement("FORM");
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_matches-field", "");
			testSubForm.appendChild(testInput);
			const testInput2 = document.createElement("INPUT");
			testInput2.setAttribute("type", "text");
			testInput2.setAttribute("name", "faultyInput");
			testInput2.value = "test string";
			testSubForm.appendChild(testInput2);
			assert.throws(() => {!testVal.v_matchesField(testInput, "test string", " ")}, Error);
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is undefined", (done) => {
			const testSubForm = document.createElement("FORM");
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_matchesField = "testInput2";
			testSubForm.appendChild(testInput);
			const testInput2 = document.createElement("INPUT");
			testInput2.setAttribute("type", "text");
			testInput2.setAttribute("name", "testInput2");
			testInput2.value = "test string";
			testSubForm.appendChild(testInput2);
			assert.ok(!testVal.v_matchesField(testInput, undefined, " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is null", (done) => {
			const testSubForm = document.createElement("FORM");
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_matchesField = "testInput2";
			testSubForm.appendChild(testInput);
			const testInput2 = document.createElement("INPUT");
			testInput2.setAttribute("type", "text");
			testInput2.setAttribute("name", "testInput2");
			testInput2.value = "test string";
			testSubForm.appendChild(testInput2);
			assert.ok(!testVal.v_matchesField(testInput, null, " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if values do not match", (done) => {
			const testSubForm = document.createElement("FORM");
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_matchesField = "testInput2";
			testSubForm.appendChild(testInput);
			const testInput2 = document.createElement("INPUT");
			testInput2.setAttribute("type", "text");
			testInput2.setAttribute("name", "testInput2");
			testInput2.value = "test string";
			testSubForm.appendChild(testInput2);
			assert.ok(!testVal.v_matchesField(testInput, "wrong string", " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should pass if values match", (done) => {
			const testSubForm = document.createElement("FORM");
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_matchesField = "testInput2";
			testSubForm.appendChild(testInput);
			const testInput2 = document.createElement("INPUT");
			testInput2.setAttribute("type", "text");
			testInput2.setAttribute("name", "testInput2");
			testInput2.value = "test string";
			testSubForm.appendChild(testInput2);
			assert.ok(testVal.v_matchesField(testInput, "test string", " "));
			assert.ok(!testInput.validity.customError);
			done();
		});
	});
});