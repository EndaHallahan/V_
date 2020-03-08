import {strict as assert} from "assert";
import {JSDOM} from "jsdom";
import {v_ify, V_} from "../src/js/v_.js";

describe("Validation Unit Tests", () => {
	const { document } = (new JSDOM(`<!DOCTYPE html><p>Hello world</p>`)).window;
	const testForm = document.createElement("FORM");
	const testVal = new V_(testForm);

	describe("Custom Validation", () => {
		it("should be able to register a new validation: PASS", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testVal.addCustomValidation({
				name: "v_customValidation",
				validationFunction: (content) => {
					return true;
				},
				failMessage: "Failed custom validation"
			});
			assert.ok(testVal.v_customValidation(testInput, "test", " "));
			assert.ok(!testInput.validity.customError);
			done();
		});
		it("should be able to register a new validation: FAIL", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testVal.addCustomValidation({
				name: "v_customValidation2",
				validationFunction: (content) => {
					return false;
				},
				failMessage: "Failed custom validation"
			});
			assert.ok(!testVal.v_customValidation2(testInput, "test", " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should be able to register a new validation omitting the failMessage property", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testVal.addCustomValidation({
				name: "v_customValidation3",
				validationFunction: (content) => {
					return true;
				}
			});
			assert.ok(testVal.v_customValidation3(testInput, "test", " "));
			assert.ok(!testInput.validity.customError);
			done();
		});
	});
});