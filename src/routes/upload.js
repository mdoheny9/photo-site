import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import FileUpload from '../checkout/components/FileUpload';

export default function Upload() {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);
        navigate("/upload/confirm", { state: data });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Username input */}
            <div style={{marginBottom: "1rem"}}>{'Username: '}
                <input {...register("author", { required: true })} />
            </div>

            {/* File input */}
            <FileUpload register={register} setValue={setValue} />

            {/* Description input */}
            <div style={{marginBottom: "1rem"}}>{'Description: '}
                <input {...register("description")} />
            </div>
            {errors.author && <span>This field is required</span>}

            <input type="submit" />
        </form>
    )
}