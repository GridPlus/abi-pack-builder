const constants = require('./constants').constants;
const fs = require('fs')
const SDK = require('gridplus-sdk').Client
const superagent = require('superagent')
const parseAbi = new SDK({ crypto: require('crypto') }).parseAbi;
const MAX_PARAM_NAME_LEN = 20;

function getContractData(addr, cb) {
  const BASE = `https://api.etherscan.io`;
    const url = `${BASE}/api?module=contract&action=getabi&address=${addr}&apikey=${constants.ETHERSCAN_KEY}`;
    superagent.get(url)
    .end((err, data) => {
      if (err)
        return cb(err.toString())
      const result = JSON.parse(data.text)
      if (result.message !== "OK")
        return cb(result.result)
      return cb(null, JSON.parse(result.result))
    })
}

function buildData(contracts, cb, defs=[], metadata=[]) {
  if (contracts.length === 0)
    return cb(defs, metadata)
  const d = contracts.shift();
  getContractData(d.address, (err, _defs) => {
    if (err) {
      console.error(`Error for ${d.address}: ${err}`)
    } else if (!_defs) {
      console.error('Did not receive response for ', addr)
    } else {
      let newDefs = [];
      function defExists(def, defs) {
        defs.forEach((_def) => {
          if (def.sig === _def.sig)
            return true
        })
        return false;
      }
      // Parse the defs and include ones with unique signatures
      parseAbi('etherscan', _defs, true).forEach((def) => {
        if (!defExists(def, defs))
          newDefs.push(def)
      })
      if (newDefs.length > 0)
        defs = defs.concat(newDefs)
      return buildData(contracts, cb, defs, metadata);
    }
  })
}

function fetchDefs(packs, cb, out=[]) {
  if (packs.length === 0)
    return cb(out);
  const pack = packs.shift()
  const contracts = JSON.parse(JSON.stringify(pack.contracts))
  buildData(contracts, (defs) => {
    if (defs.length > 0) {
      let metadata = [];
      pack.contracts.forEach((contract) => {
        if (pack.app) {
          // Only push metadata if it is defined
          metadata.push({
            app: pack.app,
            fname: pack.fname,
            website: pack.website,
            address: contract.address,
          })
        }
      })
      if (metadata.length > 0) {
        // If there is metadata, build a full object containing it
        out.push(JSON.stringify({ metadata, defs }))
      } else {
        // If there is no metadata, stringify just the defs.
        // This is used with the `ADDRESS` env variable.
        out.push(JSON.stringify(defs))
      }
    }
    return fetchDefs(packs, cb, out)
  })
}

//============= SCRIPT ===============
let contracts = [];
if (process.env.ADDRESS) {
  // If an address is passed in, we will fetch functions and build
  // an output file without metadata.
  contracts.push({
    "fname": process.env.ADDRESS,
    "contracts": [  
      {
        "address": process.env.ADDRESS,
      }
    ]
  });
} else if (process.env.ONLY_FETCH) {
  // If the user provided a subset of pack names, only pull those files
  process.env.ONLY_FETCH.split(" ").forEach((name) => {
    try {
      contracts.push(require(`./sources/${name}.json`))
    } catch (err) {
      throw new Error(`Failed to find ABIs for ${name}`)
    }
  })
} else {
  // Otherwise, pull all contracts from `sources`
  const names = fs.readdirSync('./sources')
  names.forEach((name) => {
    contracts.push(require(`./sources/${name}`))
  })
}
// Write dir if needed
let dirName = constants.OUT_DIR;
if (process.env.OUT_DIR)
  dirName = process.env.OUT_DIR;
if (!fs.existsSync(dirName))
  fs.mkdirSync(dirName)

// Fetch the definitions and save the parsed data to respective pack files
fetchDefs(contracts, (parsedData) => {
  parsedData.forEach((pack) => {
    const _pack = JSON.parse(pack)
    if (_pack.metadata) {
      fs.writeFileSync(`${dirName}/v2_${_pack.metadata[0].fname}.json`, pack)
      console.log(`${_pack.metadata[0].app}: ${_pack.defs.length} executable defs found.`)
    } else {
      fs.writeFileSync(`${dirName}/${process.env.ADDRESS}.json`, pack)
      console.log(`${_pack.length} executable defs found.`)
    }
  })
  console.log('Done.')
});


