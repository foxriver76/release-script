/// <reference types="jest" />
import { Context, System } from "@alcalzone/release-script-core";
import type { ExecaReturnValue } from "execa";
declare class MockSystem implements System {
    exec: jest.MockedFunction<System["exec"]>;
    execRaw: jest.MockedFunction<System["execRaw"]>;
    mockExec(commands: Record<string, string | ExecaReturnValue> | ((cmd: string) => string | ExecaReturnValue)): void;
    unmockExec(): void;
}
export declare const defaultContextOptions: Omit<Context, "cli" | "warnings" | "errors" | "getData" | "hasData" | "setData"> & {
    sys: MockSystem;
};
export declare function createMockContext(options: Partial<Omit<Context, "cli" | "warnings" | "errors" | "sys" | "argv"> & {
    argv: Partial<Context["argv"]>;
}>): Context & {
    sys: MockSystem;
};
export {};
//# sourceMappingURL=context.d.ts.map