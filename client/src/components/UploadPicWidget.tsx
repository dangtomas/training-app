import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function UploadPicWidget() {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const navigate = useNavigate();

    async function updateProfilePic(url: string) {
        try {
            await fetch(
                `https://training-app-0ni3.onrender.com/api/users/${localStorage.getItem("id")}`, {
                    method: "PATCH",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ profilePicSrc: url })
            })
        } catch(err) {
            navigate("/login");
        }
    }

    useEffect(() => {
        cloudinaryRef.current = (window as any).cloudinary;
        widgetRef.current = (cloudinaryRef.current! as any).createUploadWidget(
            {
                cloudName: "dynjmtw8a",
                uploadPreset: "vv63enoi"
            }, 
            (_: any, result: any) => {
                if (result.info.url) {
                    updateProfilePic(result.info.url);
                } 
            }
        );
    }, []);

    return (
        <button type="button" onClick={() => (widgetRef.current! as any).open()}
                id="upload-image-btn">
            Nahrát obrázek
        </button>
        )
}

export default UploadPicWidget;