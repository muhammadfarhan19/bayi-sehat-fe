import * as React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { SnackbarType } from '../../../reducer/CommonReducer';
import { getAcceptedType, validateFile } from '../../../utils/Value';

const DEFAULT_MAX_FILE_SIZE = 10000000; // 10 MB

export interface FileObject {
  id: string;
  name: string;
  type: string;
  result?: string | ArrayBuffer | null;
}

export interface UploadInputProps {
  allowedSize?: number;
  allowedTypes: string[];
  children: (props: { loading: boolean }) => JSX.Element;
  defaultFiles?: FileObject[];
  handleUploadChange: (files: FileObject[]) => void;
  uploadHandler: (
    fileObject: File,
    validationRes: ReturnType<typeof validateFile>
  ) => Promise<{ id: string } | undefined>;
  multipleFile?: boolean;
}

export default function UploadWrapper(props: UploadInputProps) {
  const {
    allowedSize = DEFAULT_MAX_FILE_SIZE,
    allowedTypes,
    children,
    defaultFiles = [],
    handleUploadChange,
    uploadHandler,
    multipleFile = false,
  } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const [files, setFiles] = React.useState<FileObject[]>(defaultFiles);
  const [loading, setLoading] = React.useState(false);

  const addFile = (file: FileObject) => {
    let newFiles;
    if (multipleFile) {
      newFiles = [file];
    } else {
      newFiles = [...files, file];
    }
    setFiles(newFiles);
    handleUploadChange(newFiles);
  };

  const handleFileChange = (event: React.BaseSyntheticEvent) => {
    try {
      const fileObject = event.target.files[0];
      const validationRes = validateFile({
        allowedSize,
        allowedTypes,
        fileObject,
      });
      const { fileName, fileType, fileValid } = validationRes;

      if (fileValid) {
        setLoading(true);
        uploadHandler(fileObject, validationRes).then(async res => {
          const reader = new FileReader();
          reader.readAsDataURL(fileObject);
          reader.onload = (eventReader: ProgressEvent<FileReader>) => {
            addFile({
              id: res?.id || '1',
              name: fileName,
              type: fileType,
              result: eventReader.target?.result,
            });
          };
          setLoading(false);
        });
      } else {
        dispatch(
          setSnackbar({
            type: SnackbarType.ERROR,
            message: 'File yang dipilih tidak valid, mohon upload sesuai ketentuan.',
            show: true,
          })
        );
      }
    } catch (error) {
      console.error(error);
    }

    event.target.value = null;
  };

  return (
    <>
      <span onClick={() => inputRef.current?.click()} className="relative">
        <input
          accept={allowedTypes.map(type => getAcceptedType(type)).join(',')}
          disabled={loading}
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          className={'absolute inset-0 opacity-0'}
        />
        <span className={'relative z-10'}>{children({ loading })}</span>
      </span>
    </>
  );
}
