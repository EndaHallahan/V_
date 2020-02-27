import {strict as assert} from "assert";
import {JSDOM} from "jsdom";
import {v_ify, V_} from "../src/v_.js";

describe("Validation Unit Tests", () => {
	const { document } = (new JSDOM(`<!DOCTYPE html><p>Hello world</p>`)).window;
	const testForm = document.createElement("FORM");
	const testVal = new V_(testForm);

	describe("v_is-url-with-domain", () => {
		it("should not run without an argument", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_is-url-with-domain", "");
			assert.throws(() => {testVal.v_isUrlWithDomain(testInput, "https://www.twitter.com")}, Error);
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is undefined", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_is-url-with-domain", "www.twitter.com");
			assert.ok(!testVal.v_isUrlWithDomain(testInput, undefined));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is null", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_is-url-with-domain", "www.twitter.com");
			assert.ok(!testVal.v_isUrlWithDomain(testInput, null));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value is not a valid URL", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_is-url-with-domain", "www.twitter.com");
			assert.ok(!testVal.v_isUrlWithDomain(testInput, "htps:/e.eeee.org/eeee.ee.e"));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not be affected by RegEx special characters", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_is-url-with-domain", "www\.twi.*");
			assert.ok(!testVal.v_isUrlWithDomain(testInput, "https://www.twitter.com"));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if value domain does not match argument domain", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_is-url-with-domain", "www.twitter.com");
			assert.ok(!testVal.v_isUrlWithDomain(testInput, "https://www.facebook.com/"));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if argument domain is elsewhere in value URL", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_is-url-with-domain", "www.twitter.com");
			assert.ok(!testVal.v_isUrlWithDomain(testInput, "https://www.facebook.com/a/www.twitter.com"));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should not pass if argument domain is a different subdomain than argument url", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_is-url-with-domain", "www.about.twitter.com");
			assert.ok(!testVal.v_isUrlWithDomain(testInput, "https://www.twitter.com"));
			assert.ok(testInput.validity.customError);
			done();
		});
		it("should pass if value domain matches argument domain", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_is-url-with-domain", "www.twitter.com");
			assert.ok(testVal.v_isUrlWithDomain(testInput, "https://www.twitter.com"));
			assert.ok(!testInput.validity.customError);
			done();
		});
		it("should pass if value domain not https", (done) => {
			const testInput = document.createElement("INPUT");
			testInput.setAttribute("type", "text");
			testInput.setAttribute("data-v_is-url-with-domain", "www.twitter.com");
			assert.ok(testVal.v_isUrlWithDomain(testInput, "http://www.twitter.com"));
			assert.ok(!testInput.validity.customError);
			done();
		});
	});
});