const etherscan = require('./etherscan.json')

exports.constants = {
  ETHERSCAN_KEY: etherscan.key,
  BASE_URL: 'https://pay.gridplus.io:3000/contractData',
  OUT_DIR: './out',
  TYPE_MAP: {
    '1': 'ABI_ADDRESS',
    '2': 'ABI_BOOL',
    '3': 'ABI_UINT8',
    '4': 'ABI_UINT16',
    '5': 'ABI_UINT24',
    '6': 'ABI_UINT32',
    '7': 'ABI_UINT40',
    '8': 'ABI_UINT48',
    '9': 'ABI_UINT56',
    '10': 'ABI_UINT64',
    '11': 'ABI_UINT72',
    '12': 'ABI_UINT80',
    '13': 'ABI_UINT88',
    '14': 'ABI_UINT96',
    '15': 'ABI_UINT104',
    '16': 'ABI_UINT112',
    '17': 'ABI_UINT120',
    '18': 'ABI_UINT128',
    '19': 'ABI_UINT136',
    '20': 'ABI_UINT144',
    '21': 'ABI_UINT152',
    '22': 'ABI_UINT160',
    '23': 'ABI_UINT168',
    '24': 'ABI_UINT176',
    '25': 'ABI_UINT184',
    '26': 'ABI_UINT192',
    '27': 'ABI_UINT200',
    '28': 'ABI_UINT208',
    '29': 'ABI_UINT216',
    '30': 'ABI_UINT224',
    '31': 'ABI_UINT232',
    '32': 'ABI_UINT240',
    '33': 'ABI_UINT248',
    '34': 'ABI_UINT256',
    // Skip signed int types
    '67': 'ABI_UINT',
    '69': 'ABI_BYTES1',
    '70': 'ABI_BYTES2',
    '71': 'ABI_BYTES3',
    '72': 'ABI_BYTES4',
    '73': 'ABI_BYTES5',
    '74': 'ABI_BYTES6',
    '75': 'ABI_BYTES7',
    '76': 'ABI_BYTES8',
    '77': 'ABI_BYTES9',
    '78': 'ABI_BYTES10',
    '79': 'ABI_BYTES11',
    '80': 'ABI_BYTES12',
    '81': 'ABI_BYTES13',
    '82': 'ABI_BYTES14',
    '83': 'ABI_BYTES15',
    '84': 'ABI_BYTES16',
    '85': 'ABI_BYTES17',
    '86': 'ABI_BYTES18',
    '87': 'ABI_BYTES19',
    '88': 'ABI_BYTES20',
    '89': 'ABI_BYTES21',
    '90': 'ABI_BYTES22',
    '91': 'ABI_BYTES23',
    '92': 'ABI_BYTES24',
    '93': 'ABI_BYTES25',
    '94': 'ABI_BYTES26',
    '95': 'ABI_BYTES27',
    '96': 'ABI_BYTES28',
    '97': 'ABI_BYTES29',
    '98': 'ABI_BYTES30',
    '99': 'ABI_BYTES31',
    '100': 'ABI_BYTES32',
    '101': 'ABI_BYTES',
    '102': 'ABI_STRING',
    '103': 'ABI_TUPLE1',
    '104': 'ABI_TUPLE2',
    '105': 'ABI_TUPLE3',
    '106': 'ABI_TUPLE4',
    '107': 'ABI_TUPLE5',
    '108': 'ABI_TUPLE6',
    '109': 'ABI_TUPLE7',
    '110': 'ABI_TUPLE8',
    '111': 'ABI_TUPLE9',
    '112': 'ABI_TUPLE10',
    '113': 'ABI_TUPLE11',
    '114': 'ABI_TUPLE12',
    '115': 'ABI_TUPLE13',
    '116': 'ABI_TUPLE14',
    '117': 'ABI_TUPLE15',
    '118': 'ABI_TUPLE16',
    '119': 'ABI_TUPLE17',  // Firmware currently cannot support tuples larger than this
  }
};