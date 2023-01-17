import axios from 'axios';
import { MimeType } from '../constants/Utils';
import { AcceptedType } from '../types/Common';

export const encrypt = (text: string) => {
  return axios
    .get<string>('/api/encrypt?text=' + text)
    .then(res => res.data)
    .catch(() => '');
};

export const formatAmount = (text: string) => text.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export const getAcceptedType = (argType: AcceptedType) => {
  const type = argType.toLowerCase();
  if (['jpeg', 'jpg'].includes(type)) {
    return MimeType.JPG;
  } else if ('png' === type) {
    return MimeType.PNG;
  } else if ('pdf' === type) {
    return MimeType.PDF;
  } else if ('xls' === type) {
    return MimeType.XLS;
  } else if ('xlsx' === type) {
    return MimeType.XLSX;
  } else if ('csv' === type) {
    return MimeType.CSV;
  }
  return type.toLowerCase();
};

export function validateFile(option: {
  allowedSize: number;
  allowedTypes: string[];
  fileNameMaxLength?: number;
  fileObject: File;
}) {
  const { allowedSize, allowedTypes, fileNameMaxLength = 50, fileObject } = option;
  const { name, type, size } = fileObject;
  const allowedType = allowedTypes.some(allowedType => {
    let allowed = allowedType.toLowerCase();
    if (['xlsx'].includes(allowed)) {
      allowed = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    }

    if (['xls'].includes(allowed)) {
      allowed = 'application/vnd.ms-excel';
    }

    if (['csv'].includes(allowed)) {
      allowed = 'text/csv';
    }

    return type.toLowerCase().includes(allowed);
  });

  const splitFile = name.split('.');
  const stringType = splitFile[splitFile.length - 1];
  const stringFileName = splitFile
    .slice(0, splitFile.length - 1)
    .join('.')
    .substring(0, fileNameMaxLength - (stringType.length + 1));

  return {
    fileValid: size < allowedSize && allowedType,
    fileType: stringType,
    fileName: [stringFileName, stringType].join('.'),
  };
}
