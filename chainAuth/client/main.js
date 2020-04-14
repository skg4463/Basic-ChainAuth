var contractAddress = "0x21c4b4Fbd58223330fEd6d055341Ca8a08eC2854";
var contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_id",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "regTime",
        "type": "uint64"
      }
    ],
    "name": "registration",
    "type": "event",
    "signature": "0xd6a0191a44e09d5598a6a7025f496c10ffe2f9d3021f16864bcf417c830505d6"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_id",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "loginTime",
        "type": "uint64"
      }
    ],
    "name": "loginComfirm",
    "type": "event",
    "signature": "0x78c53e20fc708feb81617a1d7f5b7f23bd58ade27619aca73b123686f8a5b3b3"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_authHash",
        "type": "uint256"
      }
    ],
    "name": "requestLogin",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xc9037446"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_authHash",
        "type": "uint256"
      },
      {
        "name": "_id",
        "type": "string"
      }
    ],
    "name": "requestRegistration",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x0a11ed30"
  }
];
var dapp = web3.eth.contract(contractABI).at(contractAddress);


window.addEventListener('load', function() {
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

    constructor();
});

function login() {    
  var inputId = $('#inputId').val();
  var inputPass = $('#inputPass').val();

  var ax = web3.sha3(inputId + inputPass, {encoding:"dex"});
  
  if(inputId != "" && inputPass != ""){
    dapp.requestLogin.call(ax, function(e,r){
        if(r == inputId){
          document.getElementById('notice').innerText = "login success";
        }
        else {
          document.getElementById('notice').innerText = "It does not exist or the password is incorrect";
        }
    });
  }
  else{
    alert("review your info");
  }
}

function regi(){
  var inputId = $('#inputId').val();
  var inputPass = $('#inputPass').val();

  var ax = web3.sha3(inputId + inputPass, {encoding:"dex"});
  if(inputId != "" && inputPass != ""){
    dapp.requestRegistration(ax,inputId, function(e,r){
      if(e != null){
        document.getElementById('notice').innerText = e;
      }
      else{
        document.getElementById('notice').innerText = "registration success";
      }
    });
  }
  else{
    alert("review your info");
  }

}

function constructor(){
  console.log("ready to something");
}
