# YieldHarbor Finance

YieldHarbor is a permissionless yield tokenization protocol for liquid staking assets on Sui blockchain that enables new strategies for staking and provides additional tools for users to capitalize on market volatility. Stakers can hedge their risk by lock in today's APR rate and selling their yield in advance. Non-stakers can perform arbitrage on the APYs by trading these future yield tokens through our exchange platform.

The system has two types of derivative tokens created by the timelock vault. The first type is for stakers who want to lock in their yield. They must deposit liquid staking assets and will receive principal tokens, which include future yield. They can then either wait until the vault matures to redeem their deposit or sell it on the marketplace, possibly at a discount to attract other buyers.

The second type is the yield token, which allows anyone to speculate on APR volatility. Holders of yield tokens will be able to claim yield from the surplus when the APR is on the rise.

## Background

The first version aims to support Staked SUI objects, a new asset class introduced after the SIP-6 updates. When stakers stake SUI tokens with a validator, they receive Staked SUI objects as receipts. These objects can be traded and transferred to someone else but with certain restrictions. Staked SUI objects are considered semi-NFT, which means an object obtained from Pool A cannot be merged with one from Pool B.

As staking rewards differ among different staking pools, we cannot directly convert Staked SUI objects into fungible tokens. Therefore, we need a solution that can efficiently consolidate staking rewards from various pools into a reliable average APR across all staking pools and must have a mechanism to ensure the accuracy of APR over time.

## Principal Token

The Principal Token is the primary token serving token holders who seek to lock up their APR at today's rates. For example, if you are holding a Staked SUI object with a 4% APR, you will need to wait 1 year to receive a profit of 4%.

YieldHarbor provides timelock vaults, each with a fixed maturity date. It can tokenize liquid staking assets along with future yield into fungible derivative tokens called HYT that can be traded on any decentralized exchange and/or partially transferred to anyone.

Before the vault matures, it accumulates yield from the staking protocol or validator node to provide coverage for all distributed HYT tokens. This ensures that when the vault matures, HYT holders can redeem the locked assets back at a 1:1 ratio.

In the details of the timelock vault for Staked SUI objects, there will be a shared function that anyone can call. When this function is executed, the vault will unstake all locked Staked SUI objects for SUI tokens and rewards. The rewards will be added to the reward pool and the remaining Staked SUI objects will be restaked on the validator node.


If the APR remains fixed until the vault matures, all SUI tokens in the reward pool will cover all the future yield that has been minted as HYT earlier. However, this scenario is unlikely. To sustain the reward supply with dynamic yield, we'll depend on the yield token, which will be explained in the next section.

### Marketplace

HYT is a fungible token that can be traded on any exchange, including YieldHarbor's marketplace, which we have prepared with an orderbook-based system for users. Since HYT represents the future value of Staked SUI, sellers may have the option to set a discount to attract potential buyers and the AMM may not be suitable for this purpose.

### Burning Process

The burning of HYT tokens can be broken down into two scenarios, before and after the vault matures.

When the vault matures, HYT token holders can redeem the original assets at a 1:1 ratio. However, if the vault has not matured, to exit the position, you must acquire YT tokens equivalent to the remaining future yield not yet acquired by the vault.

## Yield Token

The yield token is a support token that helps stabilize the reward pool and ensures it has sufficient assets to return to the staker. Each vault has its own set of YT tokens, and the entire supply will be minted at the time of vault generation and instantly topping up the AMM's liquidity pool.

YT primarily targets individuals interested in speculating on APR. During an uptrend in APR, YT holders can claim excess yields at their convenience until the vault matures. During APR declines, LP tokens are converted into rewards to cover HYT holder yields. In fact, liquidity providers profit during rising APR conditions but may face losses during downturns.

### Marketplace

YT utilizes an AMM for instant trading of YT tokens without the need to wait for someone to create orders. The token price is determined by supply and demand.

### Burning Process

There is no burning process for YT.

## Repository structure

The project using a monorepo structure consists of 2 packages using [Lerna](https://lerna.js.org).

- `client`: the frontend application made with [React](https://react.dev/), TailwindCSS, Sui.js and Suiet's wallet-kit
- `move`: contains Move-based smart contracts

## Contract Overview

- `staked_sui.move` - A mock Staked SUI object for testing on the Testnet system.
- `vault.move` - The timelock vault, 1 mil. yield tokens (YT) will be minted and sent to the AMM object for YT circulation at the time of generation. Principal tokens (HYT) will be minted when a staker deposits the Staked SUI object into the vault plus additional HYT estimated to be generated until the vault matures, as per the APR stated in the Oracle contract.
- `oracle.move` - The Oracle contract, only authorized wallets can update the APR value observed from an external source and update on every epoch.
- `marketplace.move` - An Orderbook-based marketplace for trading HYT.
- `amm.move` - An AMM-based marketplace for trading YT.

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
