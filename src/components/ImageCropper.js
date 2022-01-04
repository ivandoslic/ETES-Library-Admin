import React, { useState } from 'react'
import Cropper from 'react-easy-crop';
import getCroppedImg from '../functions/cropImage';
import './ImageCropper.css'

export default function ImageCropper(props) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }

    const onCrop = async () => {
        const croppedImageURL = await getCroppedImg(props.image, croppedAreaPixels);
        props.handleCroppingDone(croppedImageURL);
    }

    if (props.show) {
        return (
            <div>
                <div className='backdrop'></div>
                <div className='crop-container'>
                    <Cropper
                        image={props.image}
                        zoom={zoom}
                        crop={crop}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        aspect={props.aspect}
                        onCropComplete={onCropComplete}
                    />
                </div>
                <div className='controls-cropper'>
                    <div className='controls-cropper-upper-area'>
                        <input className='slider' type='range' min={1} max={3} step={0.1} value={zoom} onInput={(e) => { setZoom(e.target.value) }} />
                    </div>
                    <div className="cropper-button-area">
                        <button onClick={props.onCancle}>Cancel</button>
                        <button onClick={onCrop}>Crop</button>
                    </div>
                </div>
            </div>
        )
    }

    return null;
}
