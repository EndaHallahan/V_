import {strict as assert} from "assert";
import {JSDOM} from "jsdom";
import {v_ify, V_} from "../src/js/v_.js";

describe("Validation Unit Tests", () => {
	const window = (new JSDOM(`<!DOCTYPE html><p>Hello world</p>`)).window;
	const { document } = window;

	describe("Constructor Options", () => {
		it("should be able to take an options object in the constructor", (done) => {
			const testVal = new V_({});
			const testForm = document.createElement("FORM");
			testVal.setValidations(testForm);
			done();
		});
		it("should be able to take an options object with a form element in the constructor", (done) => {
			const testForm = document.createElement("FORM");
			const testVal = new V_(testForm, {});
			done();
		});
		it("should be able to take an options object with a messages option and apply it", (done) => {
			const testVal = new V_({
				messages: {
					v_isEmail: "Email address, if you please."
				}
			});
			const testForm = document.createElement("FORM");
			const testInput = document.createElement("INPUT");
			const testLabel = document.createElement("LABEL");
			testLabel.setAttribute("data-v_error-output", "");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_is-email", "");
			testInput.value = "Not an email.";
			testLabel.appendChild(testInput);
			testForm.appendChild(testLabel);
			testVal.setValidations(testForm);
			testInput.dispatchEvent(new window.Event('input', { bubbles: true }));
			assert.ok(testInput.validity.customError);
			assert.ok(testLabel.dataset.v_errorOutput === "Email address, if you please.");
			done();
		});
	});
});