import type { Context, Plugin, Stage } from "@alcalzone/release-script-core/types";
declare class TemplatePlugin implements Plugin {
    readonly id = "template";
    readonly stages: Stage[];
    executeStage(context: Context, stage: Stage): Promise<void>;
}
export default TemplatePlugin;
//# sourceMappingURL=index.d.ts.map