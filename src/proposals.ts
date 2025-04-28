import { type } from "arktype";
import ky from "ky";
import program, { logExit } from "./cli.js";
import { ProposalId } from "./validators.js";

const endpoint = "https://www.mynth.ai/api/votes/proposals";

const Proposal = type({
  id: ProposalId,
  title: "string",
});

const ProposalResponse = type({
  contents: Proposal.array(),
}).pipe((v) => v.contents);

const listProposals = async () => {
  const response = await ky.get(endpoint).json();
  const proposals = ProposalResponse(response);
  if (proposals instanceof type.errors) return logExit("proposals", proposals);

  const maxTitleLength = proposals
    .map((p) => p.title.length)
    .reduce((max, length) => Math.max(max, length), 0);
  const outputs = proposals
    .map(
      (proposal) => `${proposal.title.padEnd(maxTitleLength)} ${proposal.id}`,
    )
    .toSorted();
  outputs.forEach((output) => console.log(output));
};

program
  .command("proposals")
  .description("Gets the list of active Mynth governance proposals")
  .action(listProposals);
