import {strict as assert} from "assert";
import {JSDOM} from "jsdom";
import {v_ify, V_} from "../src/v_.js";

describe("Validation Unit Tests", () => {
	const { document } = (new JSDOM(`<!DOCTYPE html><p>Hello world</p>`)).window;
	const testForm = document.createElement("FORM");
	const testVal = new V_(testForm);

	describe("v_value-less-than", () => {
		it("should not run without an argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_value-less-than", "");
			assert.throws(() => {testVal.v_valueLessThan(testInput, "troubadour")}, Error);
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not run with an improper argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_valueLessThan = "alphabet soup";
			assert.throws(() => {testVal.v_valueLessThan(testInput, "troubadour")}, Error);
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is undefined", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_valueLessThan = "50";
			assert.ok(!testVal.v_valueLessThan(testInput, undefined));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is null", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_valueLessThan = "50";
			assert.ok(!testVal.v_valueLessThan(testInput, null));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value greater than argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_valueLessThan = "50";
			assert.ok(!testVal.v_valueLessThan(testInput, 60));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if string value greater than argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_valueLessThan = "50";
			assert.ok(!testVal.v_valueLessThan(testInput, "60"));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should pass if value less than argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_valueLessThan = "50";
			assert.ok(testVal.v_valueLessThan(testInput, 40));
			assert.ok(!testInput.validity.customError);
			done();
		});
		it("should pass if string value less than argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_valueLessThan = "50";
			assert.ok(testVal.v_valueLessThan(testInput, "40"));
			assert.ok(!testInput.validity.customError);
			done();
		});
	});

	describe("v_value-greater-than", () => {
		it("should not run without an argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_value-greater-than", "");
			assert.throws(() => {testVal.v_valueGreaterThan(testInput, "troubadour")}, Error);
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not run with an improper argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_valueGreaterThan = "alphabet soup";
			assert.throws(() => {testVal.v_valueGreaterThan(testInput, "troubadour")}, Error);
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is undefined", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_valueGreaterThan = "50";
			assert.ok(!testVal.v_valueGreaterThan(testInput, undefined));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is null", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_valueGreaterThan = "50";
			assert.ok(!testVal.v_valueGreaterThan(testInput, null));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value less than argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_valueGreaterThan = "50";
			assert.ok(!testVal.v_valueGreaterThan(testInput, 40));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if string value less than argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_valueGreaterThan = "50";
			assert.ok(!testVal.v_valueGreaterThan(testInput, "40"));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should pass if value greater than argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_valueGreaterThan = "50";
			assert.ok(testVal.v_valueGreaterThan(testInput, 60));
			assert.ok(!testInput.validity.customError);
			done();
		});
		it("should pass if string value greater than argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_valueGreaterThan = "50";
			assert.ok(testVal.v_valueGreaterThan(testInput, "60"));
			assert.ok(!testInput.validity.customError);
			done();
		});
	});

	describe("v_value-between", () => {
		it("should not run without an argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_value-between", "");
			assert.throws(() => {testVal.v_valueBetween(testInput, "troubadour")}, Error);
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not run with an improper argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_valueBetween = "alphabet soup";
			assert.throws(() => {testVal.v_valueBetween(testInput, "troubadour")}, Error);
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not run if missing an argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_valueBetween = "56";
			assert.throws(() => {testVal.v_valueBetween(testInput, "troubadour")}, Error);
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is undefined", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_valueBetween = "10, 50";
			assert.ok(!testVal.v_valueBetween(testInput, undefined));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is null", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_valueBetween = "10, 50";
			assert.ok(!testVal.v_valueBetween(testInput, null));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value less than lower argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_valueBetween = "10, 50";
			assert.ok(!testVal.v_valueBetween(testInput, 1));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if string value less than lower argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_valueBetween = "10, 50";
			assert.ok(!testVal.v_valueBetween(testInput, "1"));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value greater than higher argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_valueBetween = "10, 50";
			assert.ok(!testVal.v_valueBetween(testInput, 60));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if string value greater than higher argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_valueBetween = "10, 50";
			assert.ok(!testVal.v_valueBetween(testInput, "60"));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should pass if value between arguments", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_valueBetween = "10, 50";
			assert.ok(testVal.v_valueBetween(testInput, 40));
			assert.ok(!testInput.validity.customError);
			done();
		});
		it("should pass if string value between arguments", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_valueBetween = "10, 50";
			assert.ok(testVal.v_valueBetween(testInput, "40"));
			assert.ok(!testInput.validity.customError);
			done();
		});
	});
});