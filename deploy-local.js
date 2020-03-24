const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("./compile");
let accounts;
let lottery;
let result;


const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy", accounts[0]);

    result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: "1000000" });
    console.log("Contract deployed at: ", result.options.address); 
    
}
deploy();