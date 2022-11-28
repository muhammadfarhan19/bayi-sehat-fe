import { DocumentAPI } from '../../../constants/APIUrls';
import { GetDocumentRes } from '../../../types/api/DocumentAPI';
import { callAPI } from '../../../utils/Fetchers';

/**
 * Return a Function to Download File.
 *
 * @example const {
 *  fileDownloader
 * } = useHomeNotification();
 *
 * @params (uuid,fileName,fileFormat) check Resource.ts
 */
function useFileDownloader() {
  const fileDownloader = (uuid: string, fileName: string, fileFormat: string) => {
    callAPI<null, GetDocumentRes>(DocumentAPI.GET_DOCUMENT.replace(':uuid', uuid), null, {
      isBlob: true,
      method: 'GET',
    })
      .then(response => {
        let url = '';
        if (response.status === 200 && response.data instanceof Blob) {
          url = window.URL.createObjectURL(response.data);
        }
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName + '.' + fileFormat);
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => alert(err.message));
  };

  return {
    fileDownloader,
  };
}

export default useFileDownloader;
