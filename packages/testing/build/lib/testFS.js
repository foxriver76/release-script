"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestFS = void 0;
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const fs = jest.requireActual("fs-extra");
/** Class to manage an isolated test "filesystem" for unit tests */
class TestFS {
    async getRoot() {
        if (!this.testFsRoot) {
            this.testFsRoot = await fs.mkdtemp(`${os_1.default.tmpdir()}${path_1.default.sep}release-script-test-`);
        }
        return this.testFsRoot;
    }
    normalizePath(testRoot, filename) {
        const relativeToFsRoot = path_1.default.relative("/", path_1.default.resolve("/", filename));
        return path_1.default.resolve(testRoot, relativeToFsRoot);
    }
    /** Creates a test directory and file structure with the given contents */
    async create(structure = {}) {
        const root = await this.getRoot();
        await fs.emptyDir(root);
        for (const [filename, content] of Object.entries(structure)) {
            const normalizedFilename = this.normalizePath(root, filename);
            if (content === null) {
                // this is a directory
                await fs.ensureDir(normalizedFilename);
            }
            else {
                // this is a file
                await fs.ensureDir(path_1.default.dirname(normalizedFilename));
                await fs.writeFile(normalizedFilename, content, "utf8");
            }
        }
    }
    /** Removes the test directory structure */
    async remove() {
        if (!this.testFsRoot)
            return;
        await fs.remove(this.testFsRoot);
    }
}
exports.TestFS = TestFS;
//# sourceMappingURL=testFS.js.map