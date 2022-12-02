import './App.css';
require('@metamask/legacy-web3')
const Web3 = require('web3-eth');

function App() {
  const { web3 , ethereum } = window
    
  const InitPayButton = () => {
    // paymentAddress is where funds will be send to
    //const paymentAddress = 'YOUR ACCOUNT ADDRESS HERE'
    const paymentAddress = '0x511cB3cB7b04319448e1a27079eE6021d0A4c7dc'
    const amountEth = 0.0000001
    //const amountEth = 1
    web3.eth.sendTransaction({
      to: paymentAddress,
      value: web3.toWei(amountEth, 'ether')
    }, (err, transactionId) => {
        if (err) {
          console.log('Payment failed', err)
          document.getElementById('status').innerHTML = 'Payment failed'
        } else {
          console.log('Payment successful', transactionId)
          document.getElementById('status').innerHTML = 'Payment successful'
        }
  })}
 
  return (
    <div className="App">     
      <div>
        <button className="pay-button" onClick={InitPayButton}>Pay</button>
        <div id="status"></div>    
          {
            window.addEventListener('load', async () => {
              if (window.ethereum ) {
                window.web3 = new Web3(ethereum);
                try {
                  await ethereum.enable();
                  //InitPayButton()
                } catch (err) {
                  document.getElementById('status').innerHTML = 'User denied account access'
                }
              } else if (window.web3) {
                window.web3 = new Web3(web3.currentProvider)
                //InitPayButton()
              } else {
                document.getElementById('status').innerHTML = 'No Metamask (or other Web3 Provider) installed'
              }
            })
          }
      </div>
    </div>
  );
}

export default App;
