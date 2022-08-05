import * as github from "@actions/github";
import { getRepo, getIssueNumber } from "./github";

export const setIssueLabel = async (token: string,
				              labels: string[],
                      relabel: boolean) => {
  const octokit = github.getOctokit(token);

  const issue_number = getIssueNumber();

  if (issue_number == null) {
    throw new Error("No Issue Provided");
  }

  if (relabel) {
    await Promise.all(labels.map(async (label) => {
      await octokit.rest.issues.deleteLabel({
        ...getRepo(),
        issue_number,
        name: label
      });
    }));
  }

  await octokit.rest.issues.addLabels({
    ...getRepo(),
    issue_number,
    labels: labels
  });
};
