import { useLocation, useNavigate } from "react-router-dom";

export default function ConfirmUpload() {
    const { state } = useLocation();
    const data = state;
    const preview = URL.createObjectURL(data.img[0]);
    console.log(data);

    const navigate = useNavigate();

    function handleReturn() {
        navigate("/upload");
    }

    function handleUpload() {
        const postData = new FormData();

        postData.append("img", preview);
        postData.append("description", data.description);
        postData.append("author", data.author);
        postData.append("date", "December 31, 2025");
    }

    return (
        <div>
            <p>Confirm upload? </p>
            <p>{data.description}</p>
            <img
                src={preview}
                alt="Preview"
                style={{ maxWidth: "600px", marginBottom: "10px" }}
            />
            <div>
                <button onClick={handleUpload}>Yes</button>
                <button onClick={handleReturn}>No, resubmit upload</button>
            </div>
        </div>
    );
}