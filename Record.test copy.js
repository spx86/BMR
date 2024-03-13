
const assert = require('assert');
const HDWalletProvider = require('truffle-hdwallet-provider');
//const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require('web3');
const compiledRecord = require('../ethereum/build/Record.json');
//Link to rinkeby network by using Infura and providing seed phrase of metamask wallet
const privateKeys = [
    "5edf5d90f8c694b9db678e06510b1c89d8a0d4c8feec5c62c9d1cd516fb655eb",
    "379976f485bb9588a6a817a69a229ef1b590db68ed4ffa8496fc887484d0bddc",
    "b3ebc02541ba8ba7dfd594d4c2f75b6408b94fa726053e31bed2e8b1760a6b3a",
    "68578c7ad503210a703c746db70a57c0355a7a8a160b4037aff95f799d9333fe",
  ];
// const provider = new HDWalletProvider(
//     privateKeys,
//     "https://sepolia.infura.io/v3/d2e7f046a2d344f682939ccd539c80f4",
// );
// const provider = new HDWalletProvider(
//     'father empower leave eager eyebrow autumn jeans object face push idea ticket',
//     'https://sepolia.infura.io/v3/d2e7f046a2d344f682939ccd539c80f4',
// );


// const web3 = new Web3.providers.HttpProvider('https://sepolia.infura.io/v3/d2e7f046a2d344f682939ccd539c80f4');
// // const signer = web3.eth.accounts.privateKeyToAccount(
// //     '0x5edf5d90f8c694b9db678e06510b1c89d8a0d4c8feec5c62c9d1cd516fb655e'
// // );

let accounts;
let record;



const provider = new HDWalletProvider(
    'father empower leave eager eyebrow autumn jeans object face push idea ticket',
    'https://sepolia.infura.io/v3/d2e7f046a2d344f682939ccd539c80f4',
);

const web3 = new Web3(provider);

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    //console.log(accounts);
    record = await new web3.eth.Contract(JSON.parse(compiledRecord.interface))
        .deploy({ data: compiledRecord.bytecode })
        .send({ gas: '10000000', from: accounts[0] });
        
});

describe('Records', () => {
    it('can deploy record contract', () => {
        assert.ok(record.options.address);
    });

    it('can add record', async () => {
        await record.methods.setDetails(
            '001107020345', 'John', '0123456789', 'Male', '07/22/2222','183', '75', '1234, Jalan Sekysen 1/3, 31900 Kampar, Perak.', 'O', 'Food', 'Antidepressants', 'Taylor Smith', '0128993344'
        ).send({ from: accounts[0], gas: '5000000' });
    });

    it('can retrieve all record address', async () => {
        await record.methods.setDetails(
            '001107020345', 'John', '0123456789', 'Male', '07/22/2222','183', '75', '1234, Jalan Sekysen 1/3, 31900 Kampar, Perak.', 'O', 'Food', 'Antidepressants', 'Taylor Smith', '0128993344'
        ).send({ from: accounts[0], gas: '5000000' });

        const allRecords = await record.methods.getPatients().call();

        const owner = await record.methods.owner().call();

        assert.equal(allRecords, owner);
    });

    it('can search for a patient', async () => {
        await record.methods.setDetails(
            '001107020345', 'John', '0123456789', 'Male', '07/22/2222','183', '75', '1234, Jalan Sekysen 1/3, 31900 Kampar, Perak.', 'O', 'Food', 'Antidepressants', 'Taylor Smith', '0128993344'
        ).send({ from: accounts[0], gas: '5000000' });
        
        const owner = await record.methods.owner().call();

        names = await record.methods.searchPatientDemographic(owner).call();

        assert.equal(names[0], '001107020345');
    });

    it('can create patient using multiple accounts', async () => {
        await record.methods.setDetails(
            '001107020345', 'John', '0123456789', 'Male', '07/22/2222','183', '75', '1234, Jalan Sekysen 1/3, 31900 Kampar, Perak.', 'O', 'Food', 'Antidepressants', 'Taylor Smith', '0128993344'
        ).send({ from: accounts[0], gas: '5000000' });

        await record.methods.setDetails(
            '001107020345', 'John', '0123456789', 'Male', '07/22/2222','183', '75', '1234, Jalan Sekysen 1/3, 31900 Kampar, Perak.', 'O', 'Food', 'Antidepressants', 'Taylor Smith', '0128993344'
        ).send({ from: accounts[1], gas: '5000000' });
        
        const allRecords = await record.methods.getPatients().call();

        assert.equal(allRecords[0], accounts[0]);
        assert.equal(allRecords[1], accounts[1]);
    });

    it('can create appointment using doctor account', async () => {
        await record.methods.setDetails(
            '001107020345', 'Bane Gateson', '0123456789', 'Male', '07/22/2222','183', '75', '1234, Jalan Sekysen 1/3, 31900 Kampar, Perak.', 'O', 'Food', 'Antidepressants', 'Taylor Smooth', '0128993344'
        ).send({ from: accounts[0], gas: '5000000' });

        await record.methods.setDoctor(
            '001107020345', 'Josn', '0123456789', 'Male', '07/22/2222','Doctorate', 'Virology'
        ).send({ from: accounts[1], gas: '5000000' });

        await record.methods.setAppointment(
            accounts[0], '07/07/2022', '11:50pm', 'Amoxicillin', 'Requires observation','Skin Infection', 'Pending'
        ).send({ from: accounts[1], gas: '5000000' });
        
        var appointment = await record.methods.searchAppointment(accounts[0]).call({from: accounts[1]}); 

        assert.notEqual(appointment[0], null);
    });
    
    it('can count number of records created by patient', async () => {
        await record.methods.setDetails(
            '001107020345', 'John', '0123456789', 'Male', '07/22/2222','183', '75', '1234, Jalan Sekysen 1/3, 31900 Kampar, Perak.', 'O', 'Food', 'Antidepressants', 'Taylor Smith', '0128993344'
        ).send({ from: accounts[0], gas: '5000000' });
        
        const patientCount = await record.methods.getPatientCount().call();
        assert.equal(patientCount, 1);
    });
});