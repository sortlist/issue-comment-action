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
exports.setIssueLabel = void 0;
const github = __importStar(require("@actions/github"));
const github_1 = require("./github");
exports.setIssueLabel = (token, labels, relabel) => __awaiter(void 0, void 0, void 0, function* () {
    const octokit = github.getOctokit(token);
    const issue_number = github_1.getIssueNumber();
    if (issue_number == null) {
        throw new Error("No Issue Provided");
    }
    if (relabel) {
        yield Promise.all(labels.map((label) => __awaiter(void 0, void 0, void 0, function* () {
            yield octokit.rest.issues.deleteLabel(Object.assign(Object.assign({}, github_1.getRepo()), { issue_number, name: label }));
        })));
    }
    yield octokit.rest.issues.addLabels(Object.assign(Object.assign({}, github_1.getRepo()), { issue_number, labels: labels }));
});
