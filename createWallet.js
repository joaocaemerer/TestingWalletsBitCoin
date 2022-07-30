//import dependecies
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

//Define network
    //bitcoin - main network
    //testnet - testing network
const network = bitcoin.networks.testnet;


//derivation wallet hierarcic and deterministic
const path = `m/49'/1'/0'/0`;

//building mnemonic for seed
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

//building root for wallet
let root = bip32.fromSeed(seed, network);

//creating an account
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

let tstAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address;

console.log("Generated Wallet");
console.log("Address: ", tstAddress);
console.log("Private Key: ", node.toWIF());
console.log("Seed: ", mnemonic);