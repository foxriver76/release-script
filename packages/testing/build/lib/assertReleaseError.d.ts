export interface AssertReleaseErrorOptions {
    messageMatches?: string | RegExp;
    fatal?: boolean;
    exitCode?: number;
}
/**
 * Asserts that a value is or a method returns a ReleaseError.
 * @param valueOrFactory An error object or method that is expected to throw
 * @param options Additional assertions
 */
export declare function assertReleaseError<T>(valueOrFactory: T, options?: AssertReleaseErrorOptions): T extends () => PromiseLike<any> ? Promise<void> : void;
//# sourceMappingURL=assertReleaseError.d.ts.map