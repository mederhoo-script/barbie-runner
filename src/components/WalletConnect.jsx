import React from 'react'
import { useWallet } from '../hooks/useWallet.jsx'

function WalletConnect() {
  const { account, isConnecting, connectWallet, disconnectWallet, isConnected } = useWallet()

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (isConnected) {
    return (
      <button className="wallet-connect" onClick={disconnectWallet}>
        {formatAddress(account)}
      </button>
    )
  }

  return (
    <button 
      className="wallet-connect" 
      onClick={connectWallet}
      disabled={isConnecting}
    >
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  )
}

export default WalletConnect