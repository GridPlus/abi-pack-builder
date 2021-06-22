# GridPlus ABI Pack Builder

The GridPlus Web Wallet provides a simple user interface for Lattice1 owners to load "packs" of ABI data into their Lattice,
which results in future transaction requests being parsed according to the contract function ABI. Typically, an ABI "pack"
is a set of contract definitions that are **callable by an end user**. This means that lookup functions or in most cases admin
functions are not generally included. Every additional function definition causes additional loading time and takes up additional
room in the Lattice's secure data registry, so we prefer to take a minimalist approach.

## Contributing an ABI Pack

If you wish to include a pack of smart contracts for inclusion on the GridPlus Web Wallet, you may fork this repo and open
a pull request containing the pack. Please follow these guidelines:

* Only include contracts that **end users will use in transactions**. This means no lookup contracts, no admin contracts (unless
your project is unusually decentralized and sufficient numbers of users enact governance through signed transactions), and no
deprecated contracts.
* Please include only one file change: create a file under the `sources` directory following the guidelines of the other examples.
Please include your project's human readable name for `app`, a lowercase, non-spaced filename for `fname` (excluding suffix), and
a link to your documentation or list of deployed contracts under `website`. For `contracts` please include a list of objects containing
the contract `address` and a note about what the contract is under `desc`.

We cannot guarantee that we will list all requests, as there is limited space in the ABI page currently, though we hope to
eventually update it to include a search feature. We will prioritize applications/projects with more users.

## Installing and Running the Builder

> This must be done by GridPlus prior to release of the ABI pack on the Web Wallet, *although if you want to create your own UI to load ABI definitions using the [`gridplus-sdk`](https://github.com/GridPlus/gridplus-sdk) you are more than welcome to - the web wallet code is available [here](https://github.com/GridPlus/wallet-web))!*

**Install**

It's simple: clone the repo and run

```
npm i
```

You must also include an *etherscan API key* to fetch the ABI data. Create a file in the root directory of this repo titled `etherscan.json`
and fill it with:

```
{
  "key": <your API key>
}
```

**Building Packs**

You can run the script to build all available ABI packs with the simple command

```
node index.js
```

There are a couple of environmental variables you can use to change behavior of the script:

*Change output directory for packs*

```
env OUT_DIR="/path/to/my/dir" node index.js
```

*Build only a subset of packs (must be included in `sources` and separated by a space)*

```
env ONLY_FETCH="appA appB" node index.js
```