import { IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { CreationValues } from "./NFT-creation-form";

type CreationFormProps = {
    onSubmit: (values: CreationValues) => Promise<void>;
  };
  
type ImagePickerProps = {
    onImageChange: (image: File) => void;
};

const ImagePicker = ({ onImageChange }: ImagePickerProps) => {
    const [selectedImage, setSelectedImage] = useState<File | undefined>();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedImage(file);
        onImageChange(file);
      }
    };
  
    return (
      <Stack>
        <input
          accept="image/*"
          id="image-picker"
          type="file"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />      
        {selectedImage ? 
            (
                <Stack>
                    <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ maxWidth: '500px', maxHeight: '500px', borderRadius: '10px' }} />
                </Stack>
            ) :
            (
                <Stack alignItems={'center'} justifyContent={'center'} sx={{backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '10px', height: '450px', width: '600px', border: '1px solid #ffffff'}}>
                    <label htmlFor="image-picker">
                        <Stack>
                            <IconButton sx={{color: '#ffffff', fontSize: '42px'}} component="span"><FileUploadIcon sx={{fontSize: '45px'}}/></IconButton>
                            <Typography sx={{color: '#E350FF', textTransform: 'none', fontWeight: '500', fontSize: '14px'}}>                   
                                Browse files
                            </Typography>
                        </Stack>
                    </label>
                    <Typography sx={{color: '#ffffff', textTransform: 'none', fontWeight: '500', fontSize: '16px'}}>                   
                        Upload your NFT
                    </Typography>                    
                </Stack>
            )
        }
      </Stack>
    );
};

export default ImagePicker;