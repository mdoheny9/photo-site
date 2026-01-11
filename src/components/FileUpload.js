import { useState, useEffect } from 'react';

export default function FileUpload({ register, errors }) {
    const [preview, setPreview] = useState(null);

    function handlePreview(event) {
        if (event.target.files) {
            const objectUrl = URL.createObjectURL(event.target.files[0]);
            setPreview(objectUrl);

        }
    }

    useEffect(() => {
        return () => { if (preview) URL.revokeObjectURL(preview); };
    }, [preview]);

    return (
        <div style={{marginBottom: "1rem"}}>
            <input type = "file" {...register("img", { 
                required: "File is required", 
            })}
            onChange={handlePreview}
            />
            {errors.img && (
                <div style={{color: "red"}}>{errors.img.message}</div>
            )}
            {preview && (
                <div>
                    <img
                    src={preview}
                    alt="Preview"
                    style={{ maxWidth: "600px", marginTop: "10px" }}
                    />
                </div>
            )}
        </div>  
    )
}