import {strict as assert} from "assert";
import {JSDOM} from "jsdom";
import {v_ify, V_} from "../src/js/v_.js";

describe("Validation Unit Tests", () => {
	const { document } = (new JSDOM(`<!DOCTYPE html><p>Hello world</p>`)).window;
	const testForm = document.createElement("FORM");
	const testVal = new V_(testForm);

	describe("v_is-email", () => {
		it("should not pass if value is undefined", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(!testVal.v_isEmail(testInput, undefined, " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is null", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(!testVal.v_isEmail(testInput, null, " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is not an email", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(!testVal.v_isEmail(testInput, "alphabet soup", " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is not a valid email", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(!testVal.v_isEmail(testInput, "e.ee.eeeee@ee.eee.ee.e", " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should pass if value is a valid email", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(testVal.v_isEmail(testInput, "e.ee.eeeee@ee.eee", " "));
			assert.ok(!testInput.validity.customError);
			done();
		});
	});
});