import { getAddressDetails } from "@lucid-evolution/lucid";
import { type } from "arktype";
import ky from "ky";
import { mayFail } from "ts-handling";
import program, { logExit } from "./cli.js";
import { Cbor } from "./validators.js";

const endpoint = "https://www.mynth.ai/api/votes/authenticate";

const TxResponse = type({
  contents: { tx: Cbor },
}).pipe((v) => v.contents.tx);

const Address = type("string").narrow((address, ctx) => {
  const details = mayFail(() => getAddressDetails(address));
  if (!details.ok) return ctx.mustBe("valid Cardano address");
  if (!details.data.stakeCredential)
    return ctx.mustBe("valid Cardano stake address");
  if (details.data.networkId !== 1) return ctx.mustBe("mainnet address");
  return true;
});

const authenticate = async (address: string) => {
  const response = await ky.post(endpoint, { json: { address } }).json();
  const tx = TxResponse(response);
  if (tx instanceof type.errors) return logExit("tx", tx);

  console.log(tx);
};

program
  .command("auth")
  .description(
    "Creates an authentication transaction to verify ownership of a Cardano wallet",
  )
  .argument("address", "The wallet address to authenticate ownership of")
  .action(async ($address: string) => {
    const address = Address($address);
    if (address instanceof type.errors) return logExit("address", address);

    await authenticate(address);
  });
