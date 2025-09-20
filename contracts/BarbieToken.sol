// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BarbieToken
 * @dev ERC-20 token for the Barbie Runner game
 * Players earn these tokens by collecting coins in the game
 */
contract BarbieToken is ERC20, Ownable {
    mapping(address => bool) public authorizedMinters;
    
    event MinterAuthorized(address indexed minter);
    event MinterRevoked(address indexed minter);
    
    constructor(
        string memory name,
        string memory symbol,
        address initialOwner
    ) ERC20(name, symbol) Ownable(initialOwner) {
        // Mint initial supply to owner (optional)
        _mint(initialOwner, 1000000 * 10**decimals());
    }
    
    /**
     * @dev Authorize an address to mint tokens (game backend)
     */
    function authorizeMinter(address minter) external onlyOwner {
        authorizedMinters[minter] = true;
        emit MinterAuthorized(minter);
    }
    
    /**
     * @dev Revoke minting authorization
     */
    function revokeMinter(address minter) external onlyOwner {
        authorizedMinters[minter] = false;
        emit MinterRevoked(minter);
    }
    
    /**
     * @dev Mint tokens to a player (called by authorized game backend)
     */
    function mint(address to, uint256 amount) external {
        require(authorizedMinters[msg.sender] || msg.sender == owner(), "Not authorized to mint");
        _mint(to, amount);
    }
    
    /**
     * @dev Burn tokens from caller's balance
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
    
    /**
     * @dev Get the number of decimals for the token
     */
    function decimals() public view virtual override returns (uint8) {
        return 18;
    }
}