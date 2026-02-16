import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import FileUpload from "../components/FileUpload";
import AppTheme from '../shared-theme/AppTheme';
import { Grid, Card, CardContent } from '@mui/material';

export default function Upload(props) {
    const { 
        register, // links inputs to form state
        handleSubmit, // prevents default form submission, validates input, and manages error state before submission
        setError,
        formState: { errors, isSubmitting }, // errors: contains each form field and corresponding errors, isSubmitting: maintains submitting state
     } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const file = await convertToBase64(data.img[0]);

            const response = await fetch('http://localhost:8080/api/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                 },
                body: JSON.stringify({
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
            navigate("/");
            
        } catch (err) {
            setError("root", {
                message: "Something went wrong. I'm sorry!",
            })
        }
    }

    return (
        <AppTheme {...props}>
        <Grid container spacing={3} justifyContent={"center"}>
        <Card sx={{ mt: 3, minWidth: 375 }}>
        <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* File input */}
                <div style={{marginBottom: "1rem"}}>{'File: '}
                    <FileUpload register={register} errors={errors} />
                </div>

                {/* Description input */}
                <div style={{marginBottom: "1rem"}}>{'Description: '}
                    <input {...register("description")} />
                </div>

                <button disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Loading..." : "Submit"}
                </button>
                {errors.root && 
                    (<div style = {{color:"red"}}>{errors.root.message}</div>)}
            </form>
        </CardContent>
        </Card>
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