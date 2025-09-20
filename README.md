# Barbie Runner - 3D Web3 Endless Runner Game

A colorful 3D endless runner game inspired by Temple Run, featuring a Barbie-style main character driving a pink convertible with a baby standing through the open roof. Built with React, Three.js, and Web3 integration on Polygon testnet.

## 🎮 Game Features

### Gameplay
- **3D Endless Runner**: Third-person Temple Run style gameplay using React Three Fiber
- **Auto-driving Car**: Pink convertible drives forward automatically
- **Dual Character Control**: 
  - Move car left/right with arrow keys to avoid obstacles
  - Control baby to jump (collect coins) or duck (avoid barriers)
- **Dynamic Environment**: Bright, Barbie-inspired city with buildings, palm trees, and decorations
- **Progressive Difficulty**: Speed increases with distance, monster gets closer over time

### Obstacles & Collectibles
- **Roadblocks**: Tall barriers that stop the car
- **Low Barriers**: Duck to avoid with the baby
- **Golden Coins**: Jump to collect floating coins above the road
- **Chasing Monster**: Purple creature that ends the game if it catches up

### Web3 Integration
- **MetaMask Wallet**: Connect to Polygon Mumbai testnet
- **ERC-20 Tokens**: Earn 1 BARBIE token per coin collected
- **Automatic Minting**: Tokens minted to wallet at game end
- **NFT Car Skins**: Optional collectible car appearances (pink, purple, glitter, rainbow, gold)

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- MetaMask browser extension
- Polygon Mumbai testnet MATIC tokens (for gas fees)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mederhoo-script/barbie-runner.git
   cd barbie-runner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open the game**
   - Navigate to `http://localhost:3000`
   - Connect your MetaMask wallet
   - Ensure you're on Polygon Mumbai testnet

### Game Controls
- **Arrow Keys**: Move car left/right between lanes
- **Spacebar**: Make baby jump (collect coins)
- **Shift**: Make baby duck (avoid low barriers)

## 🏗️ Smart Contracts

### BarbieToken (ERC-20)
Token contract for game rewards on Polygon Mumbai testnet.

**Features:**
- Mintable by authorized game backend
- 18 decimal places
- Burnable tokens
- Owner-controlled minting authorization

### BarbieCarSkins (ERC-721)
NFT contract for collectible car appearances.

**Features:**
- Unique car skin NFTs
- Metadata with skin properties
- Transfer restrictions for gameplay
- Batch minting capabilities

### Deployment

1. **Install Hardhat**
   ```bash
   npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers
   ```

2. **Deploy to Polygon Mumbai**
   ```bash
   npx hardhat run scripts/deploy.js --network mumbai
   ```

3. **Update contract addresses**
   - Update `TOKEN_CONTRACT_ADDRESS` in `src/utils/TokenContract.js`
   - Update skin contract address for NFT features

## 🎨 Assets & Attribution

### 3D Models
All 3D assets are created using basic Three.js geometries to avoid copyright issues:
- **Car**: Custom pink convertible using Box and Cylinder geometries
- **Baby**: Stylized character using Sphere and Cylinder primitives
- **Monster**: Purple creature with basic geometric shapes
- **Environment**: Procedurally generated buildings, trees, and decorations

### Colors & Theme
- Primary: Hot Pink (#FF69B4) and Deep Pink (#FF1493)
- Accent: Gold (#FFD700) for coins and highlights
- Environment: Bright, saturated colors inspired by Barbie aesthetics

### Audio (Placeholder)
- Background music: Upbeat, royalty-free tracks (to be added)
- Sound effects: Coin collection, obstacle hits, monster roars
- Audio files should be placed in `public/audio/` directory

## 🛠️ Development

### Project Structure
```
src/
├── components/
│   ├── 3D/                 # Three.js 3D components
│   │   ├── Car.jsx
│   │   ├── Baby.jsx
│   │   ├── Monster.jsx
│   │   ├── Road.jsx
│   │   ├── Obstacle.jsx
│   │   ├── Coin.jsx
│   │   └── Environment3D.jsx
│   ├── Game.jsx            # Main game logic
│   ├── GameHUD.jsx         # UI overlay
│   ├── GameOverScreen.jsx  # End game screen
│   ├── LoadingScreen.jsx   # Initial loading
│   └── WalletConnect.jsx   # Web3 wallet connection
├── hooks/
│   ├── useGame.js          # Game state management
│   └── useWallet.js        # Web3 wallet hooks
├── utils/
│   └── TokenContract.js    # Smart contract interface
└── contracts/
    ├── BarbieToken.sol     # ERC-20 token contract
    └── BarbieCarSkins.sol  # ERC-721 NFT contract
```

### Building for Production
```bash
npm run build
```

### Testing
```bash
npm test
```

## 🌐 Web3 Setup

### Polygon Mumbai Testnet
- **Network Name**: Polygon Mumbai
- **RPC URL**: https://rpc-mumbai.maticvigil.com/
- **Chain ID**: 80001
- **Currency Symbol**: MATIC
- **Block Explorer**: https://mumbai.polygonscan.com/

### Getting Test MATIC
1. Visit [Polygon Faucet](https://faucet.polygon.technology/)
2. Enter your wallet address
3. Select Mumbai testnet
4. Request test MATIC tokens

## 🎯 Future Enhancements

### Gameplay
- [ ] Power-ups (speed boost, invincibility, magnet)
- [ ] Multiple car types with different stats
- [ ] Leaderboards and achievements
- [ ] Multiplayer races
- [ ] Daily challenges and rewards

### Web3 Features
- [ ] Staking mechanism for passive rewards
- [ ] DAO governance for game updates
- [ ] Cross-chain bridge for multi-network play
- [ ] Marketplace for trading car skins
- [ ] Play-to-earn tournament system

### Technical
- [ ] Mobile responsive design
- [ ] Touch controls for mobile devices
- [ ] Progressive Web App (PWA) support
- [ ] Advanced 3D graphics and animations
- [ ] Sound system with dynamic audio

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 🐛 Known Issues

- [ ] Monster collision detection needs refinement
- [ ] Mobile touch controls not yet implemented
- [ ] Contract addresses are placeholders
- [ ] Audio system not yet integrated

## 📞 Support

For questions, issues, or contributions:
- Create an issue on GitHub
- Join our Discord community (link to be added)
- Follow development updates on Twitter (link to be added)

---

**Disclaimer**: This is a demo game for educational purposes. Use test networks only. The Barbie trademark is owned by Mattel, Inc. This project is not affiliated with or endorsed by Mattel.