import * as React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { DocumentAPI } from '../../../constants/APIUrls';
import { SnackbarType } from '../../../reducer/CommonReducer';
import { PostDocumentUploadReq, PostDocumentUploadRes } from '../../../types/api/DocumentAPI';
import { AcceptedType, DocumentUploadType, Status } from '../../../types/Common';
import { callAPI } from '../../../utils/Fetchers';
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
  allowedTypes: AcceptedType[];
  children: (props: { loading: boolean }) => JSX.Element;
  defaultFiles?: FileObject[];
  handleUploadChange: (files: FileObject[]) => void;
  uploadHandler?: (
    fileObject: File,
    validationRes: ReturnType<typeof validateFile>
  ) => Promise<{ id: string } | undefined>;
  multipleFile?: boolean;
}

async function defaultUploadHandler(fileObject: File, validationRes: ReturnType<typeof validateFile>) {
  const bodyRequest: PostDocumentUploadReq = {
    document_type: DocumentUploadType.INTERNAL_SOURCE,
    file_name: validationRes.fileName,
    file_path: '/',
    file: fileObject,
    title: validationRes.fileName,
  };

  const formdata = new FormData();
  Object.keys(bodyRequest).forEach(each => {
    const key = each as keyof typeof bodyRequest;
    if (bodyRequest[key] instanceof File) {
      formdata.append(key, bodyRequest[key] as File, validationRes.fileName);
    } else {
      formdata.append(key, String(bodyRequest[key]));
    }
  });

  const uploadRes = await callAPI<FormData, PostDocumentUploadRes>(DocumentAPI.POST_DOCUMENT_UPLOAD, formdata, {
    isMultipart: true,
    method: 'post',
  });
  if (uploadRes.status === 200 && uploadRes.data?.status === Status.OK) {
    return { id: String(uploadRes.data.data.document_uuid) };
  }
  throw 'failed to upload';
}

export default function UploadWrapper(props: UploadInputProps) {
  const {
    allowedSize = DEFAULT_MAX_FILE_SIZE,
    allowedTypes,
    children,
    defaultFiles = [],
    handleUploadChange,
    uploadHandler = defaultUploadHandler,
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
    const fileObject = event.target.files[0];
    const validationRes = validateFile({
      allowedSize,
      allowedTypes,
      fileObject,
    });
    const { fileName, fileType, fileValid } = validationRes;

    if (fileValid) {
      setLoading(true);
      uploadHandler(fileObject, validationRes)
        .then(async res => {
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
        })
        .catch(() => {
          dispatch(
            setSnackbar({
              type: SnackbarType.ERROR,
              message: 'Upload file gagal, mohon coba beberapa saat lagi.',
              show: true,
            })
          );
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
