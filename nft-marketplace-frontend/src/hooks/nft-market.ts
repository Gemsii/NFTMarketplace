import { CreationValues } from "../components/mint-nft-dialog/NFT-creation-form";

const useNFTMarket = () => {
    const createNFT = async (values: CreationValues) => {
        try {
            const data = new FormData();

            const imageFile = new File([values.image!], values.image!.name, { type: values.image!.type });
    
            data.append("name", values.name);
            data.append("description", values.description);
            data.append("image", imageFile);

            const response = await fetch('http://localhost:3001/api/upload', {method: 'POST', body: data});
            if(response.status === 201){
                const json = await response.json();
            }
        } catch(e)
        {
            console.log(e)
        }        
    }

    return {createNFT};
}

export default useNFTMarket;