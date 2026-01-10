import { useForm } from "react-hook-form";
import FileUpload from "../components/FileUpload";
import AppTheme from '../shared-theme/AppTheme';
import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown';
import { styled, Box, CssBaseline, FormLabel, OutlinedInput, Grid } from '@mui/material';

export default function Upload(props) {
    const { 
        register, // links inputs to form state
        handleSubmit, // prevents default form submission, validates input, and manages error state before submission
        setError,
        formState: { errors, isSubmitting }, // errors: contains each form field and corresponding errors, isSubmitting: maintains submitting state
     } = useForm();

    const onSubmit = async (data) => {
        try {
            const file = await convertToBase64(data.img[0]);

            const response = await fetch('http://localhost:8080/api/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    author: data.author,
                    description: data.description,
                    img: file,
                    date: new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })
                })
            });

            if (!response.ok) throw new Error('Upload failed');
            console.log('Upload successful!');
            
        } catch (err) {
            setError("root", {
                message: "Something went wrong. I'm sorry!",
            })
        }
    }

    const FormGrid = styled(Grid)(() => ({
        display: 'flex',
        flexDirection: 'column',
    }));

    return (
        <AppTheme {...props}>
          <CssBaseline enableColorScheme />
          <Box sx={{ position: 'fixed', top: '1rem', right: '1rem' }}>
            <ColorModeIconDropdown />
          </Box>
            <Grid container spacing={3}>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Username input */}
                <FormGrid size={{ xs: 12, md: 6 }}>
                    <FormLabel htmlFor="first-name" required>
                    Username
                    </FormLabel>
                    <OutlinedInput
                        {...register("author", { required: "Username is required" })}
                    />
                </FormGrid>

                {/* File input */}
                <FormGrid size={{ xs: 12, md: 6 }}>
                    <FormLabel required>
                    File
                    </FormLabel>
                    <FileUpload register={register} />
                </FormGrid>

                {/* Description input */}
                <FormGrid size={{ xs: 12, md: 6 }}>
                    <FormLabel>
                    Description
                    </FormLabel>
                    <OutlinedInput
                        {...register("description")}
                    />
                </FormGrid>

                <button disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Loading..." : "Submit"}
                </button>
                {errors.root && 
                    (<div style = {{color:"red"}}>{errors.root.message}</div>)}
            </form>
        </Grid>
        </AppTheme>
    )
}

function convertToBase64(file) { // temp url-based image upload
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}