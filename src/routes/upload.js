import { useForm } from "react-hook-form";

import FileUpload from "../components/FileUpload";

export default function Upload() {
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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Username input */}
            <div style={{marginBottom: "1rem"}}>{'Username: '}
                <input {...register("author", { required: "Username is required" })} />
                {errors.author && 
                (<div style = {{color:"red"}}>{errors.author.message}</div>)}
            </div>

            {/* File input */}
            <FileUpload register={register} />

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