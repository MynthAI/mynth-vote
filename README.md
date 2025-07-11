# mynth-vote

> **mynth-vote**: A lightweight, non-custodial governance CLI for Mynth
> proposals, powered by MNT

------------------------------------------------------------------------

## Introduction

**Snapshot Voting** is Mynth’s lightweight, non-custodial governance
system that empowers you to directly influence which blockchains are
integrated next using your MNT.

Historically, voting required locking tokens, restricting their use and
adding unnecessary friction. Snapshot Voting removes these barriers,
allowing you to delegate your MNT without locking it. You maintain full
control of your assets while actively shaping the protocol’s roadmap.

Every epoch, a snapshot of on-chain balances is taken to determine which
proposals meet the support threshold. Proposals that reach the required
backing pass without users needing to sacrifice liquidity.

Participation is effortless. Influence is real. This is governance
designed for builders, holders, and believers.

------------------------------------------------------------------------

## 🚀 Installation

Clone the repository:

``` bash
git clone http://github.com/MynthAI/mynth-vote
cd mynth-vote
```

Ensure you have nodejs and pnpm installed:

``` bash
bash setup.sh
```

Set up the CLI globally:

``` bash
pnpm build
pnpm link --global
```

Now you can use `mynth-vote` anywhere in your terminal.

------------------------------------------------------------------------

## 📜 Usage

To view all available commands:

``` bash
mynth-vote --help
```

### Global Options

| Option          | Description                |
|-----------------|----------------------------|
| `-V, --version` | Output the version number  |
| `-h, --help`    | Display help for a command |

------------------------------------------------------------------------

## 🛠️ Commands

### 1. Authenticate Wallet

Before voting, you need to verify your wallet ownership:

``` bash
mynth-vote auth <your_cardano_wallet_address>
```

- This generates a **CBOR transaction** you will need to **sign** using
  your wallet.
- After signing, **save the signed transaction** — you will need it to
  cast your vote.

### 2. View Active Proposals

See all ongoing proposals:

``` bash
mynth-vote proposals
```

Example output:

    Integrate Algorand into Mynth    52d5f5...
    Integrate Aptos into Mynth       29c4c7...
    ...

Each proposal has a unique ID you will use when reading or voting.

### 3. Read a Proposal

Get the full details of a specific proposal:

``` bash
mynth-vote read <proposal_id>
```

Example:

``` bash
mynth-vote read 1078ad407ec1010e98a17c8fb0d9e6d0f04b245ed33d29ca2995270e656d4afe
```

Sample output:

    Title: Integrate Midnight into Mynth
    Proposal Type: Info
    Delegation Required: 1,000,000 MNT

    Summary:
    This proposal seeks to formally record community sentiment in favor of integrating Midnight into Mynth.

    Motivation:
    Midnight is a privacy-focused fourth-generation blockchain, designed to enable confidential smart
    contract execution and data protection...

### 4. Vote on a Proposal

After signing your auth CBOR transaction, you can vote:

``` bash
mynth-vote vote <your_cardano_wallet_address> <proposal_id>
```

You will be prompted to **paste your signed transaction CBOR**.

If successful, your MNT delegation is recorded!

------------------------------------------------------------------------

## 📋 Example Voting Workflow

1.  **Authenticate**:

    ``` bash
    mynth-vote auth addr1q9...
    ```

2.  **Sign the generated CBOR** with your Cardano wallet.

3.  **Save the signed CBOR** output.

4.  **View proposals**:

    ``` bash
    mynth-vote proposals
    ```

5.  **Read a proposal** (optional):

    ``` bash
    mynth-vote read <proposal_id>
    ```

6.  **Vote**:

    ``` bash
    mynth-vote vote addr1q9... <proposal_id>
    ```

    - Paste the **signed CBOR** when prompted.

------------------------------------------------------------------------

## 🖥️ Example Terminal Session

``` bash
$ mynth-vote proposals
Integrate Algorand into Mynth    52d5f5...
Integrate Avalanche into Mynth   4b9fc7...
...

$ mynth-vote read 4b9fc76316e42993661f3b3b953e849bd426ddc54df54670987b5a9746a2ecd1
Title: Integrate Avalanche into Mynth
Proposal Type: Info
Delegation Required: 1,000,000 MNT
Summary: Integrate Avalanche to support fast, low-cost DeFi operations...

$ mynth-vote auth addr1q9...
# [Outputs unsigned CBOR transaction]

(Sign CBOR with wallet.)

$ mynth-vote vote addr1q9... 4b9fc76316e42993661f3b3b953e849bd426ddc54df54670987b5a9746a2ecd1
Paste signed transaction CBOR: (paste here)
Vote submitted successfully!
```

------------------------------------------------------------------------

## 🚹 Notes

- Your MNT remains **completely in your control** — no tokens are locked
  during voting.
- You can **update your vote** anytime by repeating the process.
- Voting influence is based on the **on-chain snapshot** at the start of
  each epoch.

------------------------------------------------------------------------

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

------------------------------------------------------------------------

## 🤝 Contributing

Contributions are welcome!  
Feel free to open issues or submit pull requests.

------------------------------------------------------------------------

## 📣 Stay Connected

- Twitter: [mynth.ai/twitter](https://mynth.ai/twitter)
- Discord: [mynth.ai/discord](https://mynth.ai/discord)
- Website: [mynth.ai](https://mynth.ai)

------------------------------------------------------------------------

**Shape the future of global liquidity. Vote with MNT. Help connect any
token to any token, on any network. 🌐🚀**
