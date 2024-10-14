import { useRef } from "react";
import { FILE_SELECTOR_ERROR } from "./constants";

type fileSelectorType = "button"; // create other styles like drag/drop

interface FileSelectorProps {
  type: fileSelectorType;
  allowedFileFormats?: string[];
  maxFileSizeInBytes?: number;
  handleFileChange: (file: File | null) => void;
  handleError: (error: FILE_SELECTOR_ERROR) => void;
  onClick?: () => void;
  label: string;
}

export const FileSelector = ({
  type,
  allowedFileFormats,
  handleError,
  handleFileChange,
  maxFileSizeInBytes,
  onClick,
  label,
}: FileSelectorProps) => {
  const hiddenFileInputRef = useRef<HTMLInputElement>(null);

  const handleBrowseClick = () => {
    onClick?.();
    hiddenFileInputRef.current?.click();
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    const fileName = fileObj.name;
    const fileNameSplit = fileName.split(".");
    const fileExtension = fileNameSplit[fileNameSplit.length - 1].toLowerCase();

    if (allowedFileFormats) {
      if (!fileExtension || !allowedFileFormats.includes(fileExtension)) {
        handleError(FILE_SELECTOR_ERROR.WRONG_FILE_FORMAT);
        return;
      }
    }

    if (
      maxFileSizeInBytes !== undefined &&
      !(maxFileSizeInBytes < 0) &&
      fileObj.size > maxFileSizeInBytes
    ) {
      handleError(FILE_SELECTOR_ERROR.FILE_SIZE_EXCEEDED);
      return;
    }

    handleFileChange(fileObj);
  };

  return type === "button" ? (
    <>
      <button
        type="button"
        onClick={handleBrowseClick}
        className="border border-1 border-solid border-ui-input-primary rounded-[4px] p-2 h-[38px] w-full outline-none"
      >
        {label}
      </button>

      <input
        hidden
        multiple
        type="file"
        ref={hiddenFileInputRef}
        onChange={onFileChange}
        accept={
          allowedFileFormats
            ? allowedFileFormats.map((format) => "." + format).join(", ")
            : ".csv"
        }
      />
    </>
  ) : null;
};
