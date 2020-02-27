import {strict as assert} from "assert";
import {JSDOM} from "jsdom";
import {v_ify, V_} from "../src/v_.js";

describe("Validation Unit Tests", () => {
	const { document } = (new JSDOM(`<!DOCTYPE html><p>Hello world</p>`)).window;
	const testForm = document.createElement("FORM");
	const testVal = new V_(testForm);

	describe("v_length-less-than", () => {
		it("should not run without an argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_length-less-than", "");
			assert.throws(() => {testVal.v_lengthLessThan(testInput, "troubadour")}, Error);
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not run with an improper argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_lengthLessThan = "alphabet soup";
			assert.throws(() => {testVal.v_lengthLessThan(testInput, "troubadour")}, Error);
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is undefined", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_lengthLessThan = "10";
			assert.ok(!testVal.v_lengthLessThan(testInput, undefined));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is null", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_lengthLessThan = "10";
			assert.ok(!testVal.v_lengthLessThan(testInput, null));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if length greater than argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_lengthLessThan = "10";
			assert.ok(!testVal.v_lengthLessThan(testInput, "alphabet soup"));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should pass if length less than argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_lengthLessThan = "10";
			assert.ok(testVal.v_lengthLessThan(testInput, "soup"));
			assert.ok(!testInput.validity.customError);
			done();
		});
	});

	describe("v_length-greater-than", () => {
		it("should not run without an argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_length-greater-than", "");
			assert.throws(() => {testVal.v_lengthGreaterThan(testInput, "troubadour")}, Error);
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not run with an improper argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_lengthGreaterThan = "alphabet soup";
			assert.throws(() => {testVal.v_lengthGreaterThan(testInput, "troubadour")}, Error);
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is undefined", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_lengthGreaterThan = "10";
			assert.ok(!testVal.v_lengthGreaterThan(testInput, undefined));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is null", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_lengthGreaterThan = "10";
			assert.ok(!testVal.v_lengthGreaterThan(testInput, null));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if length less than argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_lengthGreaterThan = "10";
			assert.ok(!testVal.v_lengthGreaterThan(testInput, "soup"));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should pass if length greater than argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_lengthGreaterThan = "10";
			assert.ok(testVal.v_lengthGreaterThan(testInput, "alphabet soup"));
			assert.ok(!testInput.validity.customError);
			done();
		});
	});

	describe("v_length-between", () => {
		it("should not run without an argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_length-between", "");
			assert.throws(() => {testVal.v_lengthBetween(testInput, "troubadour")}, Error);
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not run with an improper argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_lengthBetween = "alphabet soup";
			assert.throws(() => {testVal.v_lengthBetween(testInput, "troubadour")}, Error);
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not run if missing an argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_lengthBetween = "56";
			assert.throws(() => {testVal.v_lengthBetween(testInput, "troubadour")}, Error);
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is undefined", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_lengthBetween = "5, 10";
			assert.ok(!testVal.v_lengthBetween(testInput, undefined));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is null", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_lengthBetween = "5, 10";
			assert.ok(!testVal.v_lengthBetween(testInput, null));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if length less than lower argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_lengthBetween = "5, 10";
			assert.ok(!testVal.v_lengthBetween(testInput, "soup"));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if length greater than higher argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_lengthBetween = "5, 10";
			assert.ok(!testVal.v_lengthBetween(testInput, "alphabet soup"));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should pass if length between arguments", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.dataset.v_lengthBetween = "5, 10";
			assert.ok(testVal.v_lengthBetween(testInput, "alphabet"));
			assert.ok(!testInput.validity.customError);
			done();
		});
	});
});