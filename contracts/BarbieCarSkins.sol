// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title BarbieCarSkins
 * @dev ERC-721 NFT contract for car skins in the Barbie Runner game
 * Players can own and use different car skins
 */
contract BarbieCarSkins is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    
    // Mapping from token ID to skin type
    mapping(uint256 => string) public skinTypes;
    
    // Mapping from address to owned skin types
    mapping(address => mapping(string => bool)) public ownedSkins;
    
    // Available skin types
    string[] public availableSkins = ["pink", "purple", "glitter", "rainbow", "gold"];
    
    event SkinMinted(address indexed to, uint256 indexed tokenId, string skinType);
    
    constructor(address initialOwner) 
        ERC721("Barbie Car Skins", "BCS") 
        Ownable(initialOwner) 
    {}
    
    /**
     * @dev Mint a car skin NFT to a player
     */
    function mintSkin(address to, string memory skinType) external onlyOwner {
        require(isValidSkinType(skinType), "Invalid skin type");
        require(!ownedSkins[to][skinType], "Player already owns this skin");
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(to, tokenId);
        
        skinTypes[tokenId] = skinType;
        ownedSkins[to][skinType] = true;
        
        // Set metadata URI (would point to actual metadata in production)
        string memory tokenURI = string(abi.encodePacked(
            "https://api.barbierunner.com/skins/",
            skinType,
            ".json"
        ));
        _setTokenURI(tokenId, tokenURI);
        
        emit SkinMinted(to, tokenId, skinType);
    }
    
    /**
     * @dev Batch mint multiple skins to a player
     */
    function mintMultipleSkins(address to, string[] memory skinTypeList) external onlyOwner {
        for (uint i = 0; i < skinTypeList.length; i++) {
            if (isValidSkinType(skinTypeList[i]) && !ownedSkins[to][skinTypeList[i]]) {
                mintSkin(to, skinTypeList[i]);
            }
        }
    }
    
    /**
     * @dev Check if a player owns a specific skin type
     */
    function hasSkin(address player, string memory skinType) external view returns (bool) {
        return ownedSkins[player][skinType];
    }
    
    /**
     * @dev Get all skins owned by a player
     */
    function getPlayerSkins(address player) external view returns (string[] memory) {
        string[] memory playerSkins = new string[](availableSkins.length);
        uint count = 0;
        
        for (uint i = 0; i < availableSkins.length; i++) {
            if (ownedSkins[player][availableSkins[i]]) {
                playerSkins[count] = availableSkins[i];
                count++;
            }
        }
        
        // Resize array to actual count
        assembly {
            mstore(playerSkins, count)
        }
        
        return playerSkins;
    }
    
    /**
     * @dev Check if a skin type is valid
     */
    function isValidSkinType(string memory skinType) public view returns (bool) {
        for (uint i = 0; i < availableSkins.length; i++) {
            if (keccak256(abi.encodePacked(availableSkins[i])) == keccak256(abi.encodePacked(skinType))) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * @dev Get the total number of available skin types
     */
    function getAvailableSkinsCount() external view returns (uint) {
        return availableSkins.length;
    }
    
    /**
     * @dev Override transfer to update ownership mappings
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
        
        if (from != address(0) && to != address(0)) {
            string memory skinType = skinTypes[tokenId];
            ownedSkins[from][skinType] = false;
            ownedSkins[to][skinType] = true;
        }
    }
    
    // Override required by Solidity
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}