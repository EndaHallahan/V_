import {strict as assert} from "assert";
import {JSDOM} from "jsdom";
import {v_ify, V_} from "../src/v_.js";

describe("Validation Unit Tests", () => {
	const { document } = (new JSDOM(`<!DOCTYPE html><p>Hello world</p>`)).window;
	const testForm = document.createElement("FORM");
	const testVal = new V_(testForm);

	describe("v_is-email-with-domain", () => {
		it("should not run without an argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_is-email-with-domain", "");
			assert.throws(() => {testVal.v_isEmailWithDomain(testInput, "gmail.com")}, Error);
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is undefined", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_is-email-with-domain", "gmail.com");
			assert.ok(!testVal.v_isEmailWithDomain(testInput, undefined));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is null", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_is-email-with-domain", "gmail.com");
			assert.ok(!testVal.v_isEmailWithDomain(testInput, null));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is not an email", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_is-email-with-domain", "gmail.com");
			assert.ok(!testVal.v_isEmailWithDomain(testInput, "alphabet soup"));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is not a valid email", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_is-email-with-domain", "gmail.com");
			assert.ok(!testVal.v_isEmailWithDomain(testInput, "e.ee.eeeee@ee.eee.ee.gmail.com"));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not be affected by RegEx special characters", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_is-email-with-domain", "g.*");
			assert.ok(!testVal.v_isEmailWithDomain(testInput, "test@gmail.com"));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value domain does not match argument domain", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_is-email-with-domain", "notgmail.com*");
			assert.ok(!testVal.v_isEmailWithDomain(testInput, "test@gmail.com"));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should pass if value domain matches argument domain", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_is-email-with-domain", "gmail.com");
			assert.ok(testVal.v_isEmailWithDomain(testInput, "test@gmail.com"));
			assert.ok(!testInput.validity.customError);
			done();
		});
	});
});