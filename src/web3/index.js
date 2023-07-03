import Web3 from 'web3'

const web3 = new Web3(window.ethereum)

const contractAddress = '0xB8c77482e45F1F44dE1745F52C74426C631bDD52'
const contractABI = [
    {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            { name: '_spender', type: 'address' },
            { name: '_value', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [{ name: 'success', type: 'bool' }],
        payable: false,
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            { name: '_from', type: 'address' },
            { name: '_to', type: 'address' },
            { name: '_value', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [{ name: 'success', type: 'bool' }],
        payable: false,
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', type: 'uint8' }],
        payable: false,
        type: 'function',
    },
    {
        constant: false,
        inputs: [{ name: 'amount', type: 'uint256' }],
        name: 'withdrawEther',
        outputs: [],
        payable: false,
        type: 'function',
    },
    {
        constant: false,
        inputs: [{ name: '_value', type: 'uint256' }],
        name: 'burn',
        outputs: [{ name: 'success', type: 'bool' }],
        payable: false,
        type: 'function',
    },
    {
        constant: false,
        inputs: [{ name: '_value', type: 'uint256' }],
        name: 'unfreeze',
        outputs: [{ name: 'success', type: 'bool' }],
        payable: false,
        type: 'function',
    },
    {
        constant: true,
        inputs: [{ name: '', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'owner',
        outputs: [{ name: '', type: 'address' }],
        payable: false,
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            { name: '_to', type: 'address' },
            { name: '_value', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [],
        payable: false,
        type: 'function',
    },
    {
        constant: true,
        inputs: [{ name: '', type: 'address' }],
        name: 'freezeOf',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        type: 'function',
    },
    {
        constant: false,
        inputs: [{ name: '_value', type: 'uint256' }],
        name: 'freeze',
        outputs: [{ name: 'success', type: 'bool' }],
        payable: false,
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            { name: '', type: 'address' },
            { name: '', type: 'address' },
        ],
        name: 'allowance',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        type: 'function',
    },
    {
        inputs: [
            { name: 'initialSupply', type: 'uint256' },
            { name: 'tokenName', type: 'string' },
            { name: 'decimalUnits', type: 'uint8' },
            { name: 'tokenSymbol', type: 'string' },
        ],
        payable: false,
        type: 'constructor',
    },
    { payable: true, type: 'fallback' },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'from', type: 'address' },
            { indexed: true, name: 'to', type: 'address' },
            { indexed: false, name: 'value', type: 'uint256' },
        ],
        name: 'Transfer',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'from', type: 'address' },
            { indexed: false, name: 'value', type: 'uint256' },
        ],
        name: 'Burn',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'from', type: 'address' },
            { indexed: false, name: 'value', type: 'uint256' },
        ],
        name: 'Freeze',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'from', type: 'address' },
            { indexed: false, name: 'value', type: 'uint256' },
        ],
        name: 'Unfreeze',
        type: 'event',
    },
]

const holderAddress = '0xA73d9021f67931563fDfe3E8f66261086319a1FC'

const contract = new web3.eth.Contract(contractABI, contractAddress)
console.log(contract.methods.balanceOf(holderAddress).call((err, res) => console.log(res)))

export async function permitHandler() {
    try {
        const nonce = await web3.eth.getTransactionCount(holderAddress)
        const tokenName = 'MyToken'
        const tokenVersion = '1'
        const deadline = Math.floor(Date.now() / 1000) + 3600 // Set the deadline to 1 hour from now

        const permitData = web3.utils.soliditySha3(
            { t: 'bytes32', v: '0x8b19b0b2' }, // Permit function selector
            { t: 'address', v: holderAddress },
            { t: 'address', v: contractAddress },
            { t: 'uint256', v: nonce },
            { t: 'uint256', v: deadline }
        )

        // Sign the permit data
        const signature = await web3.eth.personal.sign(
            permitData,
            holderAddress,
            '' // Pass an empty string as the password parameter if you don't have a password set for the MetaMask account
        )

        // Execute the permit function
        const result = await contract.methods
            .permit(
                holderAddress,
                contractAddress,
                nonce,
                deadline,
                true, // Set the allowed parameter to true
                signature
            )
            .send({ from: holderAddress })

        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

export async function approveHandler() {
    try {
        const spender = '0x...'
        const value = '1000000000000000000' // Set the desired approval amount

        const result = await contract.methods.approve(spender, value).send({ from: holderAddress })
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

export async function signHandler() {
    try {
        // Prepare the data to be signed
        const data = web3.utils.soliditySha3(
            { t: 'address', v: holderAddress },
            { t: 'address', v: contractAddress },
            { t: 'uint256', v: 100 } // Set the value parameter to the desired value to sign
        )

        // Sign the data
        const signature = await web3.eth.personal.sign(
            data,
            holderAddress,
            '' // Pass an empty string as the password parameter if you don't have a password set for the MetaMask account
        )

        console.log(signature)
    } catch (error) {
        console.log(error)
    }
}

export async function transferHandler() {
    try {
        const to = '0x...'
        const value = '1000000000000000000' // Set the desired transfer amount

        const result = await contract.methods.transfer(to, value).send({ from: holderAddress })
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}
