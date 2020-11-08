import React from 'react';
import filesize from 'filesize';
import { DbFile } from './Form';

interface Props {
  file?: File | null;
  dbFile?: DbFile;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const FileUpload: React.FC<Props> = ({ file, dbFile, setFile }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="file-input-container">
      <input className="input" type="file" accept=".pdf, .jpg, .png" onChange={handleFileUpload} />
      {file || dbFile ? (
        <>
          <p className="title-file"> {file ? file.name : dbFile?.name} </p>
          <p className="subtitle">{filesize(file ? file.size : dbFile?.size || 0)}</p>
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
