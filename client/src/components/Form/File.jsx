import React, { useRef, useState } from "react";

const File = ({ title, name = "", id = "", isMultiple = false }) => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = () => {
    const files = fileInputRef.current.files;
    setSelectedFiles(Array.from(files));
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="fileGroup">
      <label htmlFor={id}>{title}</label>
      <input
        type="file"
        name={name}
        id={id}
        ref={fileInputRef}
        multiple={isMultiple}
        onChange={handleFileChange}
      />
      <div className="uploadBtn" onClick={handleUploadButtonClick}>
        <img src="/upload.svg" alt="upload" />
        <span>Upload File</span>
        <p className="resultFile">
          {selectedFiles.length > 0 && (
            <span>{`(${selectedFiles
              .map((file) => file.name)
              .join(", ")})`}</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default File;
