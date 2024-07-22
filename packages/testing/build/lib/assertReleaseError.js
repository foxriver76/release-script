"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertReleaseError = void 0;
const release_script_core_1 = require("@alcalzone/release-script-core");
const assert_1 = require("assert");
/**
 * Asserts that a value is or a method returns a ReleaseError.
 * @param valueOrFactory An error object or method that is expected to throw
 * @param options Additional assertions
 */
function assertReleaseError(valueOrFactory, options = {}) {
    const { messageMatches, fatal, exitCode } = options;
    function handleError(e) {
        if (e.constructor.name !== "ReleaseError") {
            throw new assert_1.AssertionError({
                actual: e,
                expected: new release_script_core_1.ReleaseError(""),
            });
        }
        if (messageMatches != undefined)
            expect(e.message).toMatch(messageMatches);
        if (exitCode != undefined)
            expect(e.exitCode).toBe(exitCode);
        if (fatal != undefined)
            expect(e.fatal).toBe(fatal);
    }
    function fail() {
        // We should not be here
        throw new Error("The factory function did not throw any error!");
    }
    if (typeof valueOrFactory === "function") {
        try {
            // This call is expected to throw if valueOrFactory is a synchronous function
            const result = valueOrFactory();
            if (result instanceof Promise) {
                return result.then(fail, // If valueOrFactory is an async function the promise should be rejected
                handleError);
            }
        }
        catch (e) {
            return void handleError(e);
        }
        fail();
    }
    else {
        // Directly assert the error object
        handleError(valueOrFactory);
    }
    return undefined;
}
exports.assertReleaseError = assertReleaseError;
//# sourceMappingURL=assertReleaseError.js.map