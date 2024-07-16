import { Contract, Signer } from "ethers";
import { CreationValues } from "../components/mint-nft-dialog/NFT-creation-form";
import useSigner from "../components/signer/signer-context";
import NFT_MARKET from '../contracts/NFTMarket.sol/NFT.json'

const PIN_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS'
const NFT_ADDRESS= '0xE8523B32F2d23dBF5De4D0B0245884e2a1b4f0C0'


const useNFTMarket = () => {
    const {signer } = useSigner();

    const nftMarket = new Contract(NFT_ADDRESS, NFT_MARKET.abi, signer as unknown as Signer);

    const createNFT = async (values: CreationValues) => {
        try {
            const formData = new FormData();
            formData.append("file", values.image!);
            const metadata = JSON.stringify({
              name: values.name,
            });
            formData.append("pinataMetadata", metadata);
      
            const options = JSON.stringify({
              cidVersion: 0,
            });
            formData.append("pinataOptions", options);
      
            const res = await fetch(
              `${PIN_URL}`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjNjFkODk3Zi02NDZmLTQxOWMtYjI1Ny03Njc5YmQwYmJhYTgiLCJlbWFpbCI6ImdlbW92aWN0YXRqYW5hQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjMjVhYmVkNDI1MTJkMDI5ZWIzNiIsInNjb3BlZEtleVNlY3JldCI6IjRhMmNmMGE3OWNjNzMwNDdiZDc0MzEwYzM5NjA2ODViNjZlOTE2Y2FkYWZiYzEzMGIzYjM4ODU0ODVjZDk1MTYiLCJpYXQiOjE3MTgzOTYxNjR9.xzMQzjkoX-Fsisc2hdOMFMWQa6uDZ0ZPJ8n71rPb0p4`,
                },
                body: formData,
              }
            );
            const resData = await res.json();

            const transaction = await nftMarket.createNFT(`https://ipfs.io/ipfs/${resData.IpfsHash}`);
            await transaction.wait();  
            console.log("NFT create successfully");
            return;
          } catch (error) {
            console.log(error);
          }  
    }

    return {createNFT};
}

export default useNFTMarket;