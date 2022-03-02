const addressContract = '';

const abi = [];

// toast tool


let web3;
let account;
let MyCoin;

function init() {
    if( typeof window.ethereum !== 'undefined') {
        const metamaskbtn = document.getElementById('enableEthereumButton');
        metamaskbtn.classList.remove('d-none');

        metamaskbtn.addEventListener('click', async() => {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts '})
            account = accounts[0];

            metamaskbtn.classList.add('d-none');
            document.getElementById('accountSelected').innerHTML = account;
            document.getElementById('accountSelected').classList.add('border');

            detectChangeAccount();
            contract();

            document.getElementById('login').style.display = 'none';
            document.getElementById('main').classList.remove('d-none')

        })
    }

    function contract () {
        web3 = new Web3(window.ethereum);
        MyCoin = new web3.eth.contract(abi, addressContract);

        interact()
    }

   function interact() {
       const btnGetBalance = document.getElementById('btnGetBalance');
       btnGetBalance.addEventListener('click', ()=> {
           const address = document.getElementById('addressGetBalance');
           const value = address.value;

           MyCoin.methods.balanceOf(value).call().then(res => {
               const amount = web3.utils.fromWei(res, 'ether');
               const valueSpan = document.getElementById('balance');
               valueSpan.innerHTML = amount;
           })
       })

       const transfer = document.getElementById('transferir');
       transfer.addEventListener('click', ()=> {
           const address = document.getElementById('addressBeneficiaria');
           const addressValue = address.value;

           const amount = document.getElementById('cantidad');
           const amountString = amount.value.toString();
           const amountTransfer = web3.utils.toWei(amountString, 'ether');

           MyCoin.methods.transfer(addressValue, amountTransfer).send({ from: account }).then(res => {
               address.value = '';
               amount.value = 0;
                     })
      })
   } 
}

window.onload = init();