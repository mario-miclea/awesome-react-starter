import { useRef, useState } from 'react';
import { Button } from '.';
import { formatFileName } from '../functions';

const FileUpload = ({ accept, file, setFile, disabled, enableDrop = false, ...props }) => {
  const [fileName, setFileName] = useState('');
  const ref = useRef();

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files || null;
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(formatFileName(selectedFile));
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    ref.current.click();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (!enableDrop || disabled) {
      return;
    }

    const droppedFiles = event.dataTransfer.files;

    if (droppedFiles) {
      setFile(droppedFiles);
      setFileName(formatFileName(droppedFiles));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex border rounded-md" onDrop={handleDrop} onDragOver={handleDragOver}>
      <Button
        className="button full secondary rounded-r-none h-fit"
        onClick={handleClick}
        disabled={disabled}
      >
        <span>Select</span>
      </Button>

      <input
        ref={ref}
        className="hidden"
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        {...props}
      />
      <p className="m-0 truncate px-2 py-1">{fileName}</p>
    </div>
  );
};

export default FileUpload;
