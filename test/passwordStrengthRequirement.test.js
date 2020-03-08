import {strict as assert} from "assert";
import {JSDOM} from "jsdom";
import {v_ify, V_} from "../src/js/v_.js";

describe("Validation Unit Tests", () => {
	const { document } = (new JSDOM(`<!DOCTYPE html><p>Hello world</p>`)).window;
	const testForm = document.createElement("FORM");
	const testVal = new V_(testForm);

	describe("v_password-strength-requirement", () => {
		it("should not run without an argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_password-strength-requirement", "");
			assert.throws(() => {testVal.v_passwordStrengthRequirement(testInput, "troubadour", " ")}, Error);
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not run with an improper argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_passwordStrengthRequirement = "5";
			assert.throws(() => {testVal.v_passwordStrengthRequirement(testInput, "troubadour", " ")}, Error);
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is undefined", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_passwordStrengthRequirement = "1";
			assert.ok(!testVal.v_passwordStrengthRequirement(testInput, undefined, " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is null", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_passwordStrengthRequirement = "1";
			assert.ok(!testVal.v_passwordStrengthRequirement(testInput, null, " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is weaker than requirement", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_passwordStrengthRequirement = "4";
			assert.ok(!testVal.v_passwordStrengthRequirement(testInput, "pass", " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should pass if value is stronger than requirement", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_passwordStrengthRequirement = "1";
			assert.ok(testVal.v_passwordStrengthRequirement(testInput, "Correct Horse Battery Staple", " "));
			assert.ok(!testInput.validity.customError);
			done();
		});
	});
});