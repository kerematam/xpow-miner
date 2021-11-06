const { keccak256 } = require("web3-utils")
const Web3 = require('web3');
const BigNumber = require('big-number');

const getInterval = () => {
    const d = + new Date();
    const interval = (d/3600).toString().slice(0,6);
    return interval;
}

const web3 = new Web3;
const addr = '0x5F59ee380b05F149407bAEd4b4C2f918cB5Bb399'

const encode = (nonce, addr, interval) => {
    const res = web3.eth.abi.encodeParameters(
        ['uint256','address', 'uint256'],
        [nonce, addr, interval]
      );
    return res;
}

const interval = getInterval();


// magic start, coz... why not?
let nonce =  '23834979948776039973182804706599340769739279216212424610326601983427275771595'
while(true){
    nonce = BigNumber(nonce).plus(1).toString();
    const encode_res = encode(nonce, addr, interval)
    const hash = keccak256(encode_res)
    const trailing_zeros = hash.slice(2,7)

    // 5 zero -> 31
    // 6 zero  -> 63
    // 7 zero -> 127
    // 8 zero -> 255
    if(trailing_zeros === '00000'){
        console.log('--------')
        console.log('nonce ', nonce)
        console.log('hash', hash)
    }
}
