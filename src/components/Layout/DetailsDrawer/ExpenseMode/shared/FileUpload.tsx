import React from 'react';
import filesize from 'filesize';

interface Props {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const FileUpload: React.FC<Props> = ({ file, setFile }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="file-input-container">
      <input className="input" type="file" accept=".pdf, .jpg, .png" onChange={handleFileUpload} />
      {file ? (
        <>
          <p className="title-file"> {file.name} </p>
          <p className="subtitle">{filesize(file.size)}</p>
        </>
      ) : (
        <>
          <p className="title-file">Upload File here</p>
          <p className="subtitle">Supports: PDF, JPG, PNG</p>
        </>
      )}
    </div>
  );
};

export default FileUpload;
