import { CML, getAddressDetails } from "@lucid-evolution/lucid";
import { type } from "arktype";
import { mayFail } from "ts-handling";

const Transaction = CML.Transaction;

const Address = type("string").narrow((address, ctx) => {
  const details = mayFail(() => getAddressDetails(address));
  if (!details.ok) return ctx.mustBe("valid Cardano address");
  if (!details.data.stakeCredential)
    return ctx.mustBe("valid Cardano stake address");
  if (details.data.networkId !== 1) return ctx.mustBe("mainnet address");
  return true;
});
type Address = typeof Address.infer;

const Cbor = type(/^[0-9a-f]{2,}$/).narrow(
  (v, ctx) =>
    mayFail(() => Transaction.from_cbor_hex(v)).ok ||
    ctx.mustBe("valid Cardano transaction as CBOR"),
);
type Cbor = typeof Cbor.infer;

const ProposalId = type(/^[a-f0-9]{64}$/);
type ProposalId = typeof ProposalId.infer;

export { Address, Cbor, ProposalId };
