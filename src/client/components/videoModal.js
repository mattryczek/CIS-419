import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import { useDropzone } from 'react-dropzone';
import { useUploadVideoMutation } from '../apollo/mutations/uploadVideo';

Modal.setAppElement('#root');

const modalStyle = {
    content: {
        width: '400px',
        height: '450px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ia = new Uint8Array(byteString.length);

    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    const file = new Blob([ia], { type: mimeString });
    return file;
}

const VideoModal = ({ isOpen, showModal }) => {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [uploadVideo] = useUploadVideoMutation();
    const cropperRef = useRef(null);

    const saveVideo = () => {
        const resultFile = dataURItoBlob(result);
        resultFile.name = file.filename;
        uploadVideo({ variables: { file: resultFile } }).then(() => {
            showModal();
        });
    };

    const changeVideo = () => {
        setFile(null);
    };

    const onDrop = (acceptedFiles) => {
        const reader = new FileReader();

        reader.onload = () => {
          setFile({
            src: reader.result,
            filename: acceptedFiles[0].name,
            filetype: acceptedFiles[0].type,
            result: reader.result,
            error: null,
          });

          setResult(reader.result);
        };
        reader.readAsDataURL(acceptedFiles[0]);
      };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={showModal}
            contentLabel="Upload File"
            style={modalStyle}
        >
            {!file &&
                (<div className="drop" {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
                </div>)
            }
            {file && (
                <button className="cancelUpload" onClick={changeVideo}>Change file</button>
            )}
            <button className="uploadVideo" onClick={saveVideo}>Save</button>
        </Modal>
    )
}

export default VideoModal