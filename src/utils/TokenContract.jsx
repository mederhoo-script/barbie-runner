import { ethers } from 'ethers'

// Simple ERC-20 contract ABI for minting tokens
const TOKEN_ABI = [
  "function mint(address to, uint256 amount) external",
  "function balanceOf(address account) external view returns (uint256)",
  "function name() external view returns (string)",
  "function symbol() external view returns (string)",
  "function decimals() external view returns (uint8)"
]

// Contract address (placeholder - would be deployed to Polygon Mumbai)
const TOKEN_CONTRACT_ADDRESS = "0x1234567890123456789012345678901234567890"

class TokenContract {
  constructor(signer) {
    this.signer = signer
    this.contract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, TOKEN_ABI, signer)
  }

  async mintTokens(amount) {
    try {
      const userAddress = await this.signer.getAddress()
      
      // Convert amount to token units (assuming 18 decimals)
      const tokenAmount = ethers.parseEther(amount.toString())
      
      const tx = await this.contract.mint(userAddress, tokenAmount)
      await tx.wait()
      
      console.log(`Minted ${amount} BARBIE tokens to ${userAddress}`)
      return tx
    } catch (error) {
      console.error('Error minting tokens:', error)
      throw error
    }
  }

  async getBalance(address) {
    try {
      const balance = await this.contract.balanceOf(address)
      return ethers.formatEther(balance)
    } catch (error) {
      console.error('Error getting balance:', error)
      throw error
    }
  }

  async getTokenInfo() {
    try {
      const [name, symbol, decimals] = await Promise.all([
        this.contract.name(),
        this.contract.symbol(),
        this.contract.decimals()
      ])
      
      return { name, symbol, decimals }
    } catch (error) {
      console.error('Error getting token info:', error)
      throw error
    }
  }
}

export default TokenContract