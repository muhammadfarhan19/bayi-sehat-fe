import * as React from 'react';

import { DocumentAPI } from '../../constants/APIUrls';
import { GetDocumentReq, GetDocumentRes } from '../../types/api/DocumentAPI';
import { callAPI } from '../../utils/Fetchers';
import CircleLoader from './Loader/CircleLoader';

interface ImgFileProps {
  uuid?: string;
}

export default function ImgFile(props: ImgFileProps) {
  const { uuid } = props;
  const [fileUrl, setFileUrl] = React.useState('');
  React.useEffect(() => {
    (async () => {
      if (uuid) {
        const fileRes = await callAPI<GetDocumentReq, GetDocumentRes>(
          DocumentAPI.GET_DOCUMENT,
          { uuid },
          { method: 'get', isBlob: true }
        );

        if (fileRes.status === 200 && fileRes.data instanceof Blob) {
          setFileUrl(window.URL.createObjectURL(fileRes.data));
        }
      }
    })();
  }, [uuid]);

  if (!fileUrl) {
    return <CircleLoader />;
  }

  return <img src={fileUrl} />;
}
