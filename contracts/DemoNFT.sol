// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract DemoNFT is ERC721Enumerable, Ownable {
    using Strings for uint256;

    enum Rarity { Common, Rare, Epic, Legendary }
    
    mapping(uint256 => Rarity) public tokenRarity;
    uint256 public nextTokenId;

    constructor() ERC721("Demo NFT", "DNFT") Ownable(msg.sender) {}

    function mint() external {
        uint256 tokenId = nextTokenId++;
        _safeMint(msg.sender, tokenId);
        
        // Pseudo-random rarity (just for demo purposes)
        uint256 rand = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, tokenId))) % 100;
        
        if (rand < 60) {
            tokenRarity[tokenId] = Rarity.Common;
        } else if (rand < 85) {
            tokenRarity[tokenId] = Rarity.Rare;
        } else if (rand < 95) {
            tokenRarity[tokenId] = Rarity.Epic;
        } else {
            tokenRarity[tokenId] = Rarity.Legendary;
        }
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        return string(abi.encodePacked("https://api.dicebear.com/7.x/avataaars/svg?seed=", tokenId.toString()));
    }

    function getRarity(uint256 tokenId) external view returns (Rarity) {
        _requireOwned(tokenId);
        return tokenRarity[tokenId];
    }
}
