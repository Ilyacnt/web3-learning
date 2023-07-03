import Web3 from 'web3'

const web3 = new Web3(window.ethereum)

async function getCurrentAccount() {
    const accounts = await web3.givenProvider.request({ method: 'eth_requestAccounts' })
    return accounts[0]
}

const contractAddress = getCurrentAccount()
const contractABI = [
    // ... contract ABI ...
]

const contract = new web3.eth.Contract(contractABI, contractAddress)

if (typeof window.ethereum === 'undefined' || !window.ethereum.isMetaMask) {
    console.log('Please install MetaMask and enable it in your browser.')
}

export async function permitHanler() {
    try {
        await MyContract.methods.Permit().send({ from: '0x123456789' })
        console.log('permitHanler')
    } catch (error) {
        console.log(error)
    }
}

export async function approveHandler() {
    try {
        console.log('approveHandler')
    } catch (error) {
        console.log(error)
    }
}

export async function signHandler() {
    try {
        console.log('signHandler')
    } catch (error) {
        console.log(error)
    }
}

export async function transferHandler() {
    try {
        console.log('transferHandler')
    } catch (error) {
        console.log(error)
    }
}
