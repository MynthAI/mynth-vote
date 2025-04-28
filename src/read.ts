import { type } from "arktype";
import md from "cli-markdown";
import ky from "ky";
import program, { logExit } from "./cli.js";
import { ProposalId } from "./validators.js";

const endpoint = "https://www.mynth.ai/api/votes/proposals";

const Proposal = type({
  contents: "string",
  id: ProposalId,
});

const ProposalResponse = type({
  contents: Proposal.array(),
}).pipe((v) => v.contents);

const displayProposal = async (proposalId: string) => {
  const response = await ky.get(endpoint).json();
  const proposals = ProposalResponse(response);
  if (proposals instanceof type.errors) return logExit("proposals", proposals);

  const proposal = proposals.find((proposal) => proposal.id === proposalId);
  if (!proposal) return logExit(`Proposal ${proposalId} not found`);

  console.log(md(proposal.contents));
};

program
  .command("read")
  .description("Displays the contents of a specific proposal")
  .argument("proposal", "The ID of the proposal to display")
  .action(async ($proposal: string) => {
    const proposal = ProposalId($proposal);
    if (proposal instanceof type.errors) return logExit("proposal", proposal);

    await displayProposal(proposal);
  });
