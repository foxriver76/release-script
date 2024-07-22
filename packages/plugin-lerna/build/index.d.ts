import type { Context, Plugin, Stage } from "@alcalzone/release-script-core/types";
declare class LernaPlugin implements Plugin {
    readonly id = "lerna";
    readonly stages: Stage[];
    readonly stageBefore: {
        check: string[];
        commit: string[];
    };
    private executeCheckStage;
    private executeCommitStage;
    executeStage(context: Context, stage: Stage): Promise<void>;
}
export default LernaPlugin;
//# sourceMappingURL=index.d.ts.map