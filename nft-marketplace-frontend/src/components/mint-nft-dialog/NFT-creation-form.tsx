import ImagePicker from "./image-picker";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export type CreationValues = {
  name: string;
  description: string;
  image?: File;
};

type NFTCreationFormProps = {
  onSubmit: (values: CreationValues) => Promise<void>;
};

const NFTCreationForm = ({ onSubmit }: NFTCreationFormProps) => {
    const [values, setValues] = useState<CreationValues>({ name: '', description: '', image: undefined });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setValues((prevValues: any) => ({
        ...prevValues,
        [name]: value,
      }));
    };
  
    const handleImageChange = (image: File) => {
      setValues((prevValues: any) => ({
        ...prevValues,
        image,
      }));
    };
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      const newErrors: { [key: string]: string } = {};
      if (!values.name) {
        newErrors.name = 'Must enter a name';
      }

      if (!values.image) {
        newErrors.image = 'Must upload new NFT';
      }
  
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
  
      try {
        await onSubmit(values);
        setValues({ name: '', description: '', image: undefined });
        setErrors({});
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

  return (
    <form onSubmit={handleSubmit} className="flex">
        <Grid container spacing={5}>
            <Grid item xs={12} md={7}>
                <Stack sx={{height: '7rem'}}>
                    <Typography sx={{color: '#ffffff', textTransform: 'none', fontWeight: '600', fontSize: '40px'}}>                   
                        Create an NFT
                    </Typography>
                    <Typography sx={{color: '#ffffff', textTransform: 'none', fontWeight: '500', fontSize: '16px'}}>                   
                        Once your item is minted you will not be able to change any of its information
                    </Typography>
                </Stack>
                <ImagePicker onImageChange={handleImageChange} />
            </Grid>
            <Grid item xs={12} md={5} display={'flex'} flexDirection={'column'}>
                <Stack sx={{height: '7rem'}}></Stack>
                <Stack rowGap={4}>
                    <TextField
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#ffffff',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#ffffff',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#E350FF',
                                },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#ffffff',
                            },
                            '& .MuiInputBase-input': {
                                color: '#ffffff',
                            },
                            '& .MuiInputBase-root': {
                                height: '50px',
                            },
                            '& .MuiInputLabel-root': {
                                color: '#ffffff',
                            },
                        }}
                        label="Name *"
                        value={values.name}
                        onChange={handleChange}
                        name="name" 
                        placeholder="Name"
                    />
                    <TextField
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#ffffff',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#ffffff',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#E350FF',
                                },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#ffffff',
                            },
                            '& .MuiInputBase-input': {
                                color: '#ffffff',
                            },
                            '& .MuiInputLabel-root': {
                                color: '#ffffff',
                            },
                        }}
                        multiline
                        minRows={3}
                        label="Description"
                        value={values.description}
                        onChange={handleChange}
                        name='description'
                        placeholder="Description..."
                    />
                    {errors.name && <Typography sx={{color: '#E350FF'}}>{errors.name}</Typography>}
                    {errors.image && <Typography sx={{color: '#E350FF'}}>{errors.image}</Typography>}
                    <Button type="submit" sx={{ '&:hover': { backgroundColor: '#883099' }, textTransform: 'none', backgroundColor: '#E350FF', borderRadius: '5px', paddingInline: '16px', height: '40px', color: '#ffffff',width: '8rem', alignSelf: 'flex-end' }}>
                        Create NFT
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    </form>
  );
};

export default NFTCreationForm;