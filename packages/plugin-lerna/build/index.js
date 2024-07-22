"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const release_script_core_1 = require("@alcalzone/release-script-core");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const semver_1 = __importDefault(require("semver"));
class LernaPlugin {
    constructor() {
        this.id = "lerna";
        this.stages = [release_script_core_1.DefaultStages.check, release_script_core_1.DefaultStages.commit];
        this.stageBefore = {
            // The package.json plugin needs to know if we're in lerna mode
            check: ["package"],
            // The git plugin amends the commit made by lerna
            commit: ["git"],
        };
    }
    async executeCheckStage(context) {
        var _a, _b, _c, _d;
        // ensure that lerna.json exists and has a version (unless in lerna mode)
        const jsonPath = path_1.default.join(context.cwd, "lerna.json");
        if (!(await fs_extra_1.default.pathExists(jsonPath))) {
            context.cli.fatal("No lerna.json found in the current directory!");
        }
        const json = await fs_extra_1.default.readJson(jsonPath);
        if (!(json === null || json === void 0 ? void 0 : json.version)) {
            context.cli.fatal("Missing property version from lerna.json!");
        }
        else if (json.version === "independent") {
            context.cli.fatal(`Lerna's independent versioning is not supported!`);
        }
        else if (!semver_1.default.valid(json.version)) {
            context.cli.fatal(`Invalid version "${json.version}" in lerna.json!`);
        }
        // Validate lerna options
        if (((_b = (_a = json === null || json === void 0 ? void 0 : json.command) === null || _a === void 0 ? void 0 : _a.version) === null || _b === void 0 ? void 0 : _b.amend) != undefined) {
            context.cli.error(`The option "amend" in lerna.json must be removed.`);
        }
        if (((_d = (_c = json === null || json === void 0 ? void 0 : json.command) === null || _c === void 0 ? void 0 : _c.version) === null || _d === void 0 ? void 0 : _d.push) != undefined) {
            context.cli.warn(`The option "push" in lerna.json is unnecessary and should be removed.`);
        }
        context.setData("version", json.version);
        context.setData("lerna", true);
        context.cli.log(`lerna.json ok ${context.cli.colors.green("✔")}`);
    }
    async executeCommitStage(context) {
        // We need to stash the changelog changes or lerna won't let us version
        const commands = [
            ["git", "stash"],
            [
                "lerna",
                "version",
                context.getData("version_new"),
                "--no-push",
                "--no-git-tag-version",
                ...(context.argv.publishAll ? ["--force-publish"] : []),
                "--yes",
            ],
            ["git", "stash", "pop"],
        ];
        context.cli.log("Bumping monorepo versions");
        for (const [cmd, ...args] of commands) {
            if (!context.argv.dryRun) {
                await context.sys.exec(cmd, args, { cwd: context.cwd });
            }
        }
    }
    async executeStage(context, stage) {
        if (stage.id === "check") {
            await this.executeCheckStage(context);
        }
        else if (stage.id === "commit") {
            await this.executeCommitStage(context);
        }
    }
}
exports.default = LernaPlugin;
//# sourceMappingURL=index.js.map