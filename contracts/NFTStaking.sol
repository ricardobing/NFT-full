// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./DemoNFT.sol";
import "./RewardToken.sol";

contract NFTStaking is Ownable, ReentrancyGuard {
    DemoNFT public immutable nftCollection;
    RewardToken public immutable rewardToken;

    struct Stake {
        address owner;
        uint256 tokenId;
        uint256 timestamp;
    }

    mapping(uint256 => Stake) public vault;
    uint256 public rewardPerHour = 10 * 10**18; // 10 tokens per hour base

    event Staked(address owner, uint256 tokenId, uint256 timestamp);
    event Unstaked(address owner, uint256 tokenId, uint256 timestamp);
    event RewardPaid(address user, uint256 reward);

    constructor(address _nftCollection, address _rewardToken) Ownable(msg.sender) {
        nftCollection = DemoNFT(_nftCollection);
        rewardToken = RewardToken(_rewardToken);
    }

    function stake(uint256[] calldata tokenIds) external nonReentrant {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];
            require(nftCollection.ownerOf(tokenId) == msg.sender, "Not owner");
            
            nftCollection.transferFrom(msg.sender, address(this), tokenId);
            
            vault[tokenId] = Stake({
                owner: msg.sender,
                tokenId: tokenId,
                timestamp: block.timestamp
            });
            
            emit Staked(msg.sender, tokenId, block.timestamp);
        }
    }

    function unstake(uint256[] calldata tokenIds) external nonReentrant {
        uint256 totalReward = 0;
        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];
            Stake memory stakedItem = vault[tokenId];
            require(stakedItem.owner == msg.sender, "Not staker");

            totalReward += calculateReward(tokenId);
            
            delete vault[tokenId];
            nftCollection.transferFrom(address(this), msg.sender, tokenId);
            
            emit Unstaked(msg.sender, tokenId, block.timestamp);
        }

        if (totalReward > 0) {
            rewardToken.mint(msg.sender, totalReward);
            emit RewardPaid(msg.sender, totalReward);
        }
    }

    function claim(uint256[] calldata tokenIds) external nonReentrant {
        uint256 totalReward = 0;
        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];
            Stake storage stakedItem = vault[tokenId];
            require(stakedItem.owner == msg.sender, "Not staker");

            totalReward += calculateReward(tokenId);
            stakedItem.timestamp = block.timestamp;
        }

        if (totalReward > 0) {
            rewardToken.mint(msg.sender, totalReward);
            emit RewardPaid(msg.sender, totalReward);
        }
    }

    function calculateReward(uint256 tokenId) public view returns (uint256) {
        Stake memory stakedItem = vault[tokenId];
        if (stakedItem.owner == address(0)) return 0;

        uint256 timeStaked = block.timestamp - stakedItem.timestamp;
        DemoNFT.Rarity rarity = nftCollection.tokenRarity(tokenId);
        
        uint256 multiplier = 1;
        if (rarity == DemoNFT.Rarity.Rare) multiplier = 2;
        else if (rarity == DemoNFT.Rarity.Epic) multiplier = 5;
        else if (rarity == DemoNFT.Rarity.Legendary) multiplier = 10;

        return (timeStaked * rewardPerHour * multiplier) / 3600;
    }

    function getStakedTokens(address user) external view returns (uint256[] memory) {
        uint256 supply = nftCollection.totalSupply();
        uint256 count = 0;
        for (uint256 i = 0; i < supply; i++) {
            if (vault[i].owner == user) {
                count++;
            }
        }

        uint256[] memory tokens = new uint256[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < supply; i++) {
            if (vault[i].owner == user) {
                tokens[index] = i;
                index++;
            }
        }
        return tokens;
    }
}
