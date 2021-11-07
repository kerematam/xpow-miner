const Web3 = require('web3')
const web3 = new Web3()

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

const getDeadline = () => {
    const hour = 60*60*1000
    const d = +new Date()
    const deadline = (Math.floor(d / hour) + 1) * hour
    
    return deadline
}

module.exports = {
    getDeadline,
    getInterval,
    encode
}