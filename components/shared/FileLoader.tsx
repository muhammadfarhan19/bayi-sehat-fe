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
  style?: string;
}

export default function FileLoader(props: ImgFileProps) {
  const { children, uuid, asLink = false, style } = props;
  const fileUrl = React.useRef('');
  const [isImg, setIsImg] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!!fileUrl.current || !uuid) return;
    (async () => {
      const fileRes = await callAPI<null, GetDocumentRes>(DocumentAPI.GET_DOCUMENT.replace(':uuid', uuid), null, {
        method: 'get',
        isBlob: true,
      });

      if (fileRes.status === 200 && fileRes.data instanceof Blob) {
        fileUrl.current = window.URL.createObjectURL(fileRes.data);
      }

      if ([MimeType.JPG, MimeType.PNG].includes(fileRes?.headers?.['content-type'] || '')) {
        setIsImg(true);
      }

      setLoaded(true);
    })();
  }, [uuid]);

  if (!loaded) {
    return <CircleLoader />;
  }

  if (!fileUrl.current) {
    return null;
  }

  if (isImg && !asLink) {
    return <img src={fileUrl.current} />;
  }

  return (
    <a className={style} target={'_blank'} href={fileUrl.current}>
      {children || 'Download file'}
    </a>
  );
}
