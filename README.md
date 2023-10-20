YieldHarbor Finance is a decentralized financial protocol designed for the Sui blockchain. It allows users to tokenize their liquid staking assets, providing them with more flexible options for managing their staked assets and capitalizing on market volatility. Here's an overview of YieldHarbor Finance, its components, and how it works:

## Protocol Overview

- Permissionless Yield Tokenization: YieldHarbor is a permissionless protocol that enables users to tokenize their liquid staking assets on the Sui blockchain.

- Staking Strategies: YieldHarbor introduces new strategies for staking, allowing users to hedge their risk by locking in today's APR rate and selling their yield in advance.

- Arbitrage Opportunities: Non-stakers can perform arbitrage by trading future yield tokens on YieldHarbor's exchange platform.

## Derivative Tokens

YieldHarbor introduces two types of derivative tokens created by the timelock vault:

1. Principal Tokens (HYT): These tokens are for stakers who want to lock in their yield. Stakers deposit liquid staking assets and receive principal tokens, which include future yield. They can either wait until the vault matures to redeem their deposit or sell it in the marketplace.

2. Yield Tokens (YT): These tokens allow anyone to speculate on APR volatility. Holders of yield tokens can claim yield from the surplus when the APR is on the rise.

## Background

YieldHarbor initially supports Staked SUI objects, a new asset class introduced after SIP-6 updates. Staked SUI objects are semi-NFTs obtained when stakers stake SUI tokens with a validator. These objects can't be merged across different pools, and their rewards vary among pools.

To consolidate rewards from different staking pools efficiently and determine an accurate average APR, YieldHarbor employs a unique mechanism.

## Principal Token (HYT)

- Principal Tokens (HYT) represent liquid staking assets and future yield.
- HYT tokens are created in timelock vaults with fixed maturity dates.
- Before maturity, the vault accumulates yield from the staking protocol or validator node, ensuring that HYT holders can redeem assets at a 1:1 ratio when the vault matures.
- A shared function can be executed to unstake locked Staked SUI objects, add rewards to the pool, and restake remaining Staked SUI objects if the APR remains fixed.

## Marketplace for HYT

- HYT is a fungible token that can be traded on any exchange, including YieldHarbor's marketplace.
- Sellers can set discounts to attract buyers, making an orderbook-based system more suitable.

## Burning Process for HYT

- When the vault matures, HYT token holders can redeem their assets at a 1:1 ratio.
- If the vault hasn't matured, exiting the position requires acquiring YT tokens equivalent to the remaining future yield not yet acquired by the vault.

## Yield Token (YT)

- YT tokens help stabilize the reward pool and ensure sufficient assets for stakers.
- YT tokens are minted at the time of vault generation and supply liquidity to the AMM's pool.
- YT primarily targets speculators interested in APR changes.
- YT holders can claim excess yields during APR uptrends, converting LP tokens into rewards during downtrends.

## Marketplace for YT

- YT utilizes an AMM for instant trading without order creation, with token price determined by supply and demand.

## Contract Overview

The project employs a monorepo structure with two packages:

- `client`: The frontend application built with React, TailwindCSS, Sui.js, and Suiet's wallet-kit.
- `move`: Contains Move-based smart contracts for the protocol's core functionality.

Key smart contracts include:

- `staked_sui.move`: A mock Staked SUI object for testing on the Testnet system.
- `vault.move`: The timelock vault that mints HYT and manages principal tokens.
- `oracle.move`: The Oracle contract for APR value updates.
- `marketplace.move`: An orderbook-based marketplace for trading HYT.
- `amm.move`: An AMM-based marketplace for trading YT tokens.

YieldHarbor Finance offers a comprehensive ecosystem for managing liquid staking assets and capitalizing on APR fluctuations on the Sui blockchain.

## Getting started

We can then run the unit tests for all YieldHarbor's smart contracts by:

```
npm run test
```

And to start the frontend application, we need to installing dependencies with:

```
npm run bootstrap
```

Then run

```
npm run package:client
```

## Deployment

### Sui Devnet

Deployment transaction link - https://suiexplorer.com/txblock/9SJwNA4y7iBXmi7GVV57DCNHb4UJx5nuREykzAhE5w3m?network=devnet


| Name    | Address                                                            |
| ------- | ------------------------------------------------------------------ |
| Package | 0x6ceb18571138274cb926f9a5004b73a66b8581403b655696a38d71d6e5e0ec1d |

| Vault   | 0x50c6f8cf9745a96a7f066afa00633fc06b6f6c33ba7aba4c49de521f07eacf4c |

Sui Devnet Deployment
[![Sui Devnet Deployment](./images/deploy.png)]()
