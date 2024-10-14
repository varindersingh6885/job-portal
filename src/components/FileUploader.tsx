import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
  UseFormSetValue,
} from "react-hook-form";
import { FILE_SELECTOR_ERROR, FileSelector } from "./FileSelector";
import { useSupabase } from "../apis/useSupabase";
import { useState } from "react";
import { supabaseUrl } from "../utils/supabase";

interface FileUploaderProps {
  label: string;
  allowedFormats?: string[];
  maxFileSizeInBytes?: number;
  bucketName: string;
  control: Control<FieldValues>;
  urlFieldName: string;
  fileNameFieldName: string;
  rules?: RegisterOptions;
  setValue: UseFormSetValue<FieldValues>;
}

export const FileUploader = ({
  label,
  allowedFormats,
  maxFileSizeInBytes,
  bucketName,
  control,
  urlFieldName,
  fileNameFieldName,
  rules,
  setValue,
}: FileUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [fileUploadError, setFileUploadError] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");

  const { supabase } = useSupabase();

  const uploadFile = async (
    file: File | null,
    onChange: (fileUrl: string) => void
  ) => {
    if (supabase && file) {
      setUploading(true);
      const fileName = `${(Math.random() * 1000).toFixed(5)}-${
        file.name
      }-${bucketName}`;

      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file);

      setUploading(false);

      if (error) {
        setFileUploadError(error.message);
        return;
      }

      setFileName(file.name);

      const uploadedFileUrl = `${supabaseUrl}/storage/v1/object/public/${data.fullPath}`;
      setValue(fileNameFieldName, file.name);
      onChange(uploadedFileUrl);
    }
  };

  const fileSelectorLabel = uploading
    ? "Uploading..."
    : fileName
    ? `📄${fileName}`
    : label;

  return (
    <div>
      <Controller
        control={control}
        name={urlFieldName}
        rules={{
          ...rules,
        }}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <>
            <FileSelector
              label={fileSelectorLabel}
              handleError={(e) => {
                if (e === FILE_SELECTOR_ERROR.FILE_SIZE_EXCEEDED) {
                  control.setError(urlFieldName, {
                    type: "fileSizeExceeded",
                    message: "File size exceeded. Max size allowed is 16KB",
                  });
                } else if (e === FILE_SELECTOR_ERROR.WRONG_FILE_FORMAT) {
                  control.setError(urlFieldName, {
                    type: "wrongFileFormat",
                    message: "Only PDF files are allowed",
                  });
                }
              }}
              handleFileChange={(file) => {
                uploadFile(file, onChange);
              }}
              type="button"
              allowedFileFormats={allowedFormats}
              maxFileSizeInBytes={maxFileSizeInBytes}
            />
            {!!fileUploadError && (
              <p className="text-ui-text-danger text-xs">{`${fileUploadError}`}</p>
            )}
            {!!error?.message && (
              <p className="text-ui-text-danger text-xs">{`${error.message}`}</p>
            )}
          </>
        )}
      />
    </div>
  );
};
