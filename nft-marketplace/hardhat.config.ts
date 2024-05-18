import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
    {
      version: "0.8.24"
    },
    {
      version: "0.6.0",
      settings: {}  // Možete dodati i postavke za ovu verziju ako je potrebno
    }
  ]},
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY ] : []
    }
  }
};

export default config;
