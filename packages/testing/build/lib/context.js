"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockContext = exports.defaultContextOptions = void 0;
/* eslint-disable @typescript-eslint/no-inferrable-types */
const release_script_core_1 = require("@alcalzone/release-script-core");
const picocolors_1 = __importDefault(require("picocolors"));
class MockSystem {
    constructor() {
        this.exec = jest.fn();
        this.execRaw = jest.fn();
    }
    mockExec(commands) {
        const execRaw = (command) => {
            let ret;
            if (typeof commands === "function") {
                ret = commands(command);
            }
            else if (command in commands) {
                ret = commands[command];
            }
            else {
                throw new Error(`mock missing for command "${command}"!`);
            }
            return Promise.resolve(typeof ret === "string"
                ? {
                    stdout: ret,
                    stderr: "",
                    isCanceled: false,
                    failed: false,
                    exitCode: 0,
                }
                : ret);
        };
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const exec = (file, args) => {
            let command = `${file}`;
            if (args && args.length) {
                command += ` ${args.join(" ")}`;
            }
            return execRaw(command);
        };
        this.execRaw.mockReset().mockImplementation(execRaw);
        this.exec.mockReset().mockImplementation(exec);
    }
    unmockExec() {
        this.exec.mockReset().mockImplementation(release_script_core_1.exec);
        this.execRaw.mockReset().mockImplementation(release_script_core_1.execRaw);
    }
}
exports.defaultContextOptions = {
    cwd: process.cwd(),
    argv: {
        dryRun: false,
        includeUnstaged: false,
        remote: "origin",
        verbose: false,
        plugins: [],
        yes: false,
    },
    plugins: [],
    sys: new MockSystem(),
};
function createMockContext(options) {
    var _a;
    const data = new Map();
    const ret = {
        cli: {
            log: jest.fn(),
            warn: jest.fn().mockImplementation((msg) => {
                ret.warnings.push(msg);
            }),
            error: jest.fn().mockImplementation((msg) => {
                ret.errors.push(msg);
            }),
            fatal: jest.fn().mockImplementation((msg, code) => {
                throw new release_script_core_1.ReleaseError(msg, true, code);
            }),
            logCommand: jest.fn(),
            select: jest.fn(),
            ask: jest.fn(),
            clearLines: jest.fn(),
            colors: picocolors_1.default,
            stripColors: release_script_core_1.stripColors,
            prefix: "",
        },
        warnings: [],
        errors: [],
        ...exports.defaultContextOptions,
        ...options,
        argv: {
            ...exports.defaultContextOptions.argv,
            ...((_a = options.argv) !== null && _a !== void 0 ? _a : {}),
        },
        getData: (key) => {
            if (!data.has(key)) {
                throw new release_script_core_1.ReleaseError(`A plugin tried to access non-existent data with key "${key}"`, true);
            }
            else {
                return data.get(key);
            }
        },
        hasData: (key) => data.has(key),
        setData: (key, value) => {
            data.set(key, value);
        },
    };
    return ret;
}
exports.createMockContext = createMockContext;
//# sourceMappingURL=context.js.map