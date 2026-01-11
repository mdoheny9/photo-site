import { useLocation, useNavigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Checkout from '../checkout/Checkout'

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

        console.log(postData);
    }

    return (
        <div>
        <CssBaseline enableColorScheme />   
            <p>Confirm upload? </p>
            <div style={{padding: "1rem", color: "white", backgroundColor:"#282c34"}}>
                <p>{data.description}</p>
                <p>By: {data.author}</p>
                <img
                    src={preview}
                    alt="Preview"
                    style={{ maxWidth: "600px", marginBottom: "10px" }}
                />
            </div>
            <div>
                <button onClick={handleUpload}>Yes</button>
                <button onClick={handleReturn}>No, resubmit upload</button>
            </div>
        </div>
    );
}