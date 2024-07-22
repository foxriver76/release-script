/** Class to manage an isolated test "filesystem" for unit tests */
export declare class TestFS {
    private testFsRoot;
    getRoot(): Promise<string>;
    private normalizePath;
    /** Creates a test directory and file structure with the given contents */
    create(structure?: Record<string, string | null>): Promise<void>;
    /** Removes the test directory structure */
    remove(): Promise<void>;
}
//# sourceMappingURL=testFS.d.ts.map