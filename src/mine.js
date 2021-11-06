require('dotenv').config()
const { keccak256 } = require('web3-utils')
const Web3 = require('web3')
const BigNumber = require('big-number')

const web3 = new Web3()

const ADDRESS = process.env.ADDRESS
const TARGET_MINT_POWER = process.env.TARGET_MINT_POWER
const target_mint_power = Number(TARGET_MINT_POWER)
const n_zeros_str = new Array(target_mint_power + 1).join('0')

const getInterval = () => {
    // make it avaiable once in min

    const d = +new Date()
    const interval = (d / 3600).toString().slice(0, 6)
    return interval
}

const encode = (nonce, addr, interval) => {
    const res = web3.eth.abi.encodeParameters(
        ['uint256', 'address', 'uint256'],
        [nonce, addr, interval]
    )
    return res
}

const interval = getInterval()

// magic start, coz... why not?
let nonce =
    '23834979948776039973182804706599340769739279216212424610326601983427281798929'

while (true) {
    nonce = BigNumber(nonce).plus(1).toString()
    const encode_res = encode(nonce, ADDRESS, interval)
    const hash = keccak256(encode_res)
    const trailing_zeros = hash.slice(2, target_mint_power + 2)

    if (trailing_zeros === n_zeros_str) {
        console.log('--------')
        console.log('nonce ', nonce)
        console.log('hash', hash)
    }
}
