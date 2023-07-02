import Web3 from 'web3'
import contract from '@truffle/contract'

const web3 = new Web3(Web3.givenProvider)

async function getCurrentAccount() {
    const accounts = await web3.givenProvider.request({ method: 'eth_requestAccounts' })
    return accounts[0]
}

const MyContract = contract({
    abi: [],
    address: getCurrentAccount(),
})
MyContract.setProvider(web3.currentProvider)

export async function permitHanler() {
    try {
        await MyContract.methods.Permit().send({ from: '0x123456789' })

        console.log('Permit function executed successfully!')
    } catch (error) {
        console.log(error)
    }
}

export async function approveHandler() {
    try {
    } catch (error) {
        console.log(error)
    }
}

export async function signHandler() {
    try {
    } catch (error) {
        console.log(error)
    }
}

export async function transferHandler() {
    try {
    } catch (error) {
        console.log(error)
    }
}
