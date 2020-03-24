const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");
let accounts;
let lottery;

beforeEach(async () => {
    // get list of all accounts 
    accounts = await web3.eth.getAccounts();

    // Deploying the smart contract
    // lottery = await new web3.eth.Contract(JSON.parse(interface))
    //     .deploy({ data: bytecode, arguments: ["Hi deploying"] })
    //     .send({ from: accounts[0], gas: "1000000" });
});

describe("Lottery", () => {
    // it("it deploys the contract", () => {
    //     // console.log(accounts);
    //     // console.log(lottery); 
    //     assert.ok(lottery.options.address)
    // });

    // it("it has default message", async () => {
    //     const message = await lottery.methods.message().call();
    //     assert.equal(message, "Hi deploying");
    //     // console.log(accounts);
    //     // console.log(lottery); 
    // });

    // it("can change the message", async () => {
    //     await lottery.methods.setMessage("Bye").send({ from: accounts[0] });
    //     const message = await lottery.methods.message().call();
    //     assert.equal(message, "Bye");
    // });

});