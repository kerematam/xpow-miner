require('dotenv').config()
const { keccak256 } = require('web3-utils')
const BigNumber = require('big-number')
const { getInterval, encode, getDeadline } = require('./utils')

const ADDRESS = process.env.ADDRESS
const TARGET_MINT_POWER = process.env.TARGET_MINT_POWER
const target_mint_power = Number(TARGET_MINT_POWER)
const n_zeros_str = new Array(target_mint_power + 1).join('0')

// magic start, coz... why not?
let nonce =
    '23834979948776039973182804706599340769739279216212424610326601983427281798929'
let interval = getInterval()
let deadline = getDeadline()

while (true) {
    const d = +new Date()
    if(d > deadline) {
        deadline = getDeadline()
        interval = getInterval()
    }

    nonce = BigNumber(nonce).plus(1).toString()
    const encode_res = encode(nonce, ADDRESS, interval)
    const hash = keccak256(encode_res)
    const trailing_zeros = hash.slice(2, target_mint_power + 2)

    if (trailing_zeros === n_zeros_str) {
        console.log('--------')
        console.log('nonce ', nonce)
        console.log('XPOW to mint : ', 2 ** target_mint_power - 1)
    }
}
