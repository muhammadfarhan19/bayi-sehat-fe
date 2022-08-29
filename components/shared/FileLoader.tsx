import * as React from 'react';

import { DocumentAPI } from '../../constants/APIUrls';
import { MimeType } from '../../constants/Utils';
import { GetDocumentRes } from '../../types/api/DocumentAPI';
import { callAPI } from '../../utils/Fetchers';
import CircleLoader from './Loader/CircleLoader';

interface ImgFileProps {
  uuid?: string;
  children?: React.ReactNode;
  asLink?: boolean;
}

export default function FileLoader(props: ImgFileProps) {
  const { children, uuid, asLink = false } = props;
  const [fileUrl, setFileUrl] = React.useState('');
  const [isImg, setIsImg] = React.useState(false);

  React.useEffect(() => {
    if (!!fileUrl || !uuid) return;
    (async () => {
      const fileRes = await callAPI<null, GetDocumentRes>(DocumentAPI.GET_DOCUMENT.replace(':uuid', uuid), null, {
        method: 'get',
        isBlob: true,
      });

      if (fileRes.status === 200 && fileRes.data instanceof Blob) {
        setFileUrl(window.URL.createObjectURL(fileRes.data));
      }

      if ([MimeType.JPG, MimeType.PNG].includes(fileRes?.headers?.['content-type'] || '')) {
        setIsImg(true);
      }
    })();
  }, [uuid]);

  if (!fileUrl) {
    return <CircleLoader />;
  }

  if (isImg && !asLink) {
    return <img src={fileUrl} />;
  }

  return (
    <a target={'_blank'} href={fileUrl}>
      {children || 'Download file'}
    </a>
  );
}
