"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const addCommentReaction_1 = require("./addCommentReaction");
const core = __importStar(require("@actions/core"));
const checkKeyword_1 = require("./checkKeyword");
const setIssueLabel_1 = require("./setIssueLabel");
const setIssueAssignee_1 = require("./setIssueAssignee");
const github = __importStar(require("@actions/github"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = github.context.payload.comment;
        if (!comment) {
            core.setFailed("Action can only be run on comments");
            return;
        }
        console.log(`comment': ${comment.body}`);
        try {
            core.setOutput("labeled", false.toString());
            core.setOutput("assigned", false.toString());
            const keywords = JSON.parse(core.getInput("keywords", { required: true }));
            console.log(`keywords: ${keywords}`);
            const token = core.getInput("github-token");
            const hasKeyword = checkKeyword_1.checkKeyword(keywords, comment.body);
            if (!hasKeyword) {
                console.log("Keyword not included in this issue comment");
                return;
            }
            addCommentReaction_1.addCommentReaction(token, comment.id);
            const labelsInput = core.getInput("labels");
            const relabelInput = core.getInput("relabel");
            const assigneesInput = core.getInput("assignees");
            if (!labelsInput && !assigneesInput) {
                core.setFailed("labels or assignees input not found. Make sure your `.yml` file contains `labels` or `assignees`");
            }
            if (labelsInput) {
                const labels = JSON.parse(labelsInput);
                const relabel = JSON.parse(relabelInput);
                console.log(labels);
                setIssueLabel_1.setIssueLabel(token, labels, relabel);
                core.setOutput("labeled", true.toString());
            }
            if (assigneesInput) {
                const assignees = JSON.parse(assigneesInput);
                console.log(assignees);
                setIssueAssignee_1.setIssueAssignee(token, assignees);
                core.setOutput("assigned", true.toString());
            }
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
