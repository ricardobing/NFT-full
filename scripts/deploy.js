import pkg from 'hardhat';
const { ethers } = pkg;

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // 1. Deploy Reward Token
    const RewardToken = await ethers.getContractFactory("RewardToken");
    const rewardToken = await RewardToken.deploy();
    await rewardToken.waitForDeployment();
    const rewardTokenAddress = await rewardToken.getAddress();
    console.log("Reward Token deployed to:", rewardTokenAddress);

    // 2. Deploy Demo NFT
    const DemoNFT = await ethers.getContractFactory("DemoNFT");
    const demoNFT = await DemoNFT.deploy();
    await demoNFT.waitForDeployment();
    const demoNFTAddress = await demoNFT.getAddress();
    console.log("Demo NFT deployed to:", demoNFTAddress);

    // 3. Deploy Staking Contract
    const NFTStaking = await ethers.getContractFactory("NFTStaking");
    const nftStaking = await NFTStaking.deploy(demoNFTAddress, rewardTokenAddress);
    await nftStaking.waitForDeployment();
    const nftStakingAddress = await nftStaking.getAddress();
    console.log("NFT Staking deployed to:", nftStakingAddress);

    // 4. Transfer Ownership of Reward Token to Staking Contract
    // So the staking contract can mint rewards
    const transferTx = await rewardToken.transferOwnership(nftStakingAddress);
    await transferTx.wait();
    console.log("Ownership of Reward Token transferred to Staking Contract");

    console.log("\nDeployment complete! Copy these addresses to your frontend config:");
    console.log("DEMO_NFT_ADDRESS:", demoNFTAddress);
    console.log("NFT_STAKING_ADDRESS:", nftStakingAddress);
    console.log("REWARD_TOKEN_ADDRESS:", rewardTokenAddress);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
