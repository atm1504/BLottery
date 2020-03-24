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
    lottery = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: "1000000" });
});

describe("Lottery Contract", () => {
    it("it deploys the contract", () => {
        assert.ok(lottery.options.address)
    });

    it("it allows one accout to ether", async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei("0.021", "ether")
        });
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });
        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });

    it("it allows multiple accout to ether", async () => {
        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei("0.021", "ether")
        });
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei("0.021", "ether")
        });
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei("0.021", "ether")
        });
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });
        assert.equal(accounts[0], players[2]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[0]);
        assert.equal(3, players.length);
    });

});