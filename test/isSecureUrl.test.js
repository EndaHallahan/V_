import {strict as assert} from "assert";
import {JSDOM} from "jsdom";
import {v_ify, V_} from "../src/js/v_.js";

describe("Validation Unit Tests", () => {
	const { document } = (new JSDOM(`<!DOCTYPE html><p>Hello world</p>`)).window;
	const testForm = document.createElement("FORM");
	const testVal = new V_(testForm);

	describe("v_is-secure-url", () => {
		it("should not pass if value is undefined", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(!testVal.v_isSecureUrl(testInput, undefined, " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is null", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(!testVal.v_isSecureUrl(testInput, null, " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is not a URL", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(!testVal.v_isSecureUrl(testInput, "alphabet soup", " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is not a valid URL", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(!testVal.v_isSecureUrl(testInput, "htps:/e.eeee.org/eeee.ee.e", " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is not a secure URL", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(!testVal.v_isSecureUrl(testInput, "http://e.eeee.org/eee.ee", " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should pass if value is a valid and secure URL", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(testVal.v_isSecureUrl(testInput, "https://e.eeee.org/eee.ee", " "));
			assert.ok(!testInput.validity.customError);
			done();
		});
	});
});