import './App.css'
import Webcam from 'react-webcam';
import {useCallback, useRef, useState} from "react";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

function App() {
    const webcamRef = useRef<Webcam>(null);
    const [imgSrc, setImgSrc] = useState<string | null>(null);

    const capture = useCallback(() => {
        const current = webcamRef.current;
        if (current) {
            const base64Image = current.getScreenshot();
            setImgSrc(base64Image);
            console.log(base64Image);
        }

    }, [webcamRef]);

    return (
        <section id="center">
            <Webcam
                ref={webcamRef}
                audio={false}
                height={720}
                width={1280}
                screenshotFormat={"image/png"}
                screenshotQuality={1}
                videoConstraints={videoConstraints}
            />
            <button onClick={capture}>Capture Photo</button>
            <div style={{width: "100%", height: "150px"}}>
                {imgSrc &&
                    <img src={imgSrc} alt="img" height={"150px"} style={{border: "solid 1px gray", height: "150px"}}/>}
            </div>
        </section>
    )
}

export default App;
