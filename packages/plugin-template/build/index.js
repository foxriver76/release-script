"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const release_script_core_1 = require("@alcalzone/release-script-core");
class TemplatePlugin {
    constructor() {
        this.id = "template";
        this.stages = [
            release_script_core_1.DefaultStages.check,
            // Add others as necessary
        ];
    }
    // dependencies?: string[] | undefined;
    // stageAfter?: Record<string, ConstOrDynamic<string[]>> | undefined;
    // stageBefore?: Record<string, ConstOrDynamic<string[]>> | undefined;
    async executeStage(context, stage) {
        if (stage.id === "check") {
            context.cli.log("Hello World!");
        }
    }
}
exports.default = TemplatePlugin;
//# sourceMappingURL=index.js.map