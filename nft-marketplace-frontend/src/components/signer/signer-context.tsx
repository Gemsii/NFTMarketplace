import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Web3Modal from "web3modal";

type SignerContextType = {
    signer?: JsonRpcSigner;
    address?: string;
    loading: boolean;
    connectWallet: () => Promise<void>
}

const SingerContext = createContext<SignerContextType>({} as any);

const useSigner = () => useContext(SingerContext);

export const SignerProvider = ({children}: {children: ReactNode}) => {
    const [signer, setSigner] = useState<JsonRpcSigner>();
    const [address, setAddress] = useState<string>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const web3modal = new Web3Modal();
        if(web3modal.cachedProvider) connectWallet();
    }, [])
    

    const connectWallet = async () => {
        setLoading(true);
        try {
            const web3modal = new Web3Modal({cacheProvider: true});
            const instance = await web3modal.connect();
            const provider = new Web3Provider(instance);
            const signer = provider.getSigner();
            setSigner(signer);
            const address = await signer.getAddress();
            setAddress(address);
        } catch(e) {
            console.log(e);
        }   
        setLoading(false);    
    };

    const contextValue = { signer, address, loading, connectWallet}

    return (
        <SingerContext.Provider value={contextValue}>
            {children}
        </SingerContext.Provider>
    )
}

export default useSigner;