import { type } from "arktype";
import ky from "ky";
import program, { logExit } from "./cli.js";
import { runPrompt } from "./input.js";
import { Address, Cbor, ProposalId } from "./validators.js";

const endpoint = "https://www.mynth.ai/api/votes/delegate";

const SuccessResponse = type({ contents: { message: "string" } }).pipe(
  (v) => v.contents.message,
);

const vote = async (address: Address, proposal: ProposalId, tx: Cbor) => {
  const response = await ky
    .post(endpoint, { json: { address, proposal, tx } })
    .json();
  const message = SuccessResponse(response);
  if (message instanceof type.errors) return logExit(message.summary);

  console.log(message);
};

program
  .command("vote")
  .description("Delegates a wallet's MNT towards a voting proposal")
  .argument("address", "The wallet address to delegate")
  .argument("proposal", "The ID of the proposal to vote for")
  .action(async ($address: Address, $proposal: ProposalId) => {
    const address = Address($address);
    if (address instanceof type.errors) return logExit("address", address);

    const proposal = ProposalId($proposal);
    if (proposal instanceof type.errors) return logExit("proposal", proposal);

    const $tx = await runPrompt("Enter your signed tx from `mynth-vote auth`");
    if (!$tx.ok) return logExit($tx.error);
    const tx = Cbor($tx.data);
    if (tx instanceof type.errors) return logExit("tx", tx);

    await vote(address, proposal, tx);
  });
