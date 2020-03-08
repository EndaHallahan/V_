import {strict as assert} from "assert";
import {JSDOM} from "jsdom";
import {v_ify, V_} from "../src/js/v_.js";

describe("Validation Unit Tests", () => {
	const { document } = (new JSDOM(`<!DOCTYPE html><p>Hello world</p>`)).window;
	const testForm = document.createElement("FORM");
	const testVal = new V_(testForm);

	describe("v_is-integer", () => {
		it("should not pass if value is undefined", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(!testVal.v_isInteger(testInput, undefined, " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is null", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(!testVal.v_isInteger(testInput, null, " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is not a numerical string", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(!testVal.v_isInteger(testInput, "alphabet soup", " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is a float", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(!testVal.v_isInteger(testInput, 0.04, " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is a float string", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(!testVal.v_isInteger(testInput, "0.04", " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is a negative float", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(!testVal.v_isInteger(testInput, -0.04, " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is a negative float string", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(!testVal.v_isInteger(testInput, "-0.04", " "));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should pass if value is an integer", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(testVal.v_isInteger(testInput, 600, " "));
			assert.ok(!testInput.validity.customError);
			done();
		});
		it("should pass if value is an integer string", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(testVal.v_isInteger(testInput, "600", " "));
			assert.ok(!testInput.validity.customError);
			done();
		});
		it("should pass if value is a bigint", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(testVal.v_isInteger(testInput, 4n, " "));
			assert.ok(!testInput.validity.customError);
			done();
		});
		it("should pass if value is a negative integer", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(testVal.v_isInteger(testInput, -600, " "));
			assert.ok(!testInput.validity.customError);
			done();
		});
		it("should pass if value is a negative integer string", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(testVal.v_isInteger(testInput, "-600", " "));
			assert.ok(!testInput.validity.customError);
			done();
		});
		it("should pass if value is 0", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(testVal.v_isInteger(testInput, 0, " "));
			assert.ok(!testInput.validity.customError);
			done();
		});
		it("should pass if value is string 0", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			assert.ok(testVal.v_isInteger(testInput, "0", " "));
			assert.ok(!testInput.validity.customError);
			done();
		});
	});
});