const hre = require("hardhat");

async function main() {
  console.log("Deploying BarbieToken and BarbieCarSkins to Polygon Mumbai...");

  // Deploy BarbieToken
  const BarbieToken = await hre.ethers.getContractFactory("BarbieToken");
  const barbieToken = await BarbieToken.deploy(
    "Barbie Runner Token",
    "BARBIE",
    "0x1234567890123456789012345678901234567890" // Replace with actual deployer address
  );
  await barbieToken.deployed();
  console.log("BarbieToken deployed to:", barbieToken.address);

  // Deploy BarbieCarSkins
  const BarbieCarSkins = await hre.ethers.getContractFactory("BarbieCarSkins");
  const barbieCarSkins = await BarbieCarSkins.deploy(
    "0x1234567890123456789012345678901234567890" // Replace with actual deployer address
  );
  await barbieCarSkins.deployed();
  console.log("BarbieCarSkins deployed to:", barbieCarSkins.address);

  console.log("\nDeployment completed!");
  console.log("Update the following in your frontend:");
  console.log(`TOKEN_CONTRACT_ADDRESS = "${barbieToken.address}"`);
  console.log(`SKINS_CONTRACT_ADDRESS = "${barbieCarSkins.address}"`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});