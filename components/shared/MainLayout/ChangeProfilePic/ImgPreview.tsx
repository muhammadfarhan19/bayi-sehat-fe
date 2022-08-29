import React from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';

export default function ImgPreview(props: { imageSrc: string; onCropComplete: (croppedAreaPixels: Area) => void }) {
  const [state, setState] = React.useState({
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 1,
  });

  const onCropChange = (crop: Point) => {
    setState({ ...state, crop });
  };

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    props.onCropComplete(croppedAreaPixels);
  };

  const onZoomChange = (zoom: number) => {
    setState({ ...state, zoom });
  };

  return (
    <div className="relative h-[13rem]">
      <div className="absolute inset-0">
        <Cropper
          image={props.imageSrc}
          crop={state.crop}
          zoom={state.zoom}
          aspect={state.aspect}
          cropShape="round"
          showGrid={false}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
          onZoomChange={onZoomChange}
        />
      </div>
    </div>
  );
}

export function useExtractImg() {
  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', error => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });

  return {
    getCroppedImg: async (imageSrc: string, pixelCrop: Area): Promise<Blob | null> => {
      const image = await createImage(imageSrc);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return null;
      }

      const { width: bBoxWidth, height: bBoxHeight } = image;
      canvas.width = bBoxWidth;
      canvas.height = bBoxHeight;

      ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
      ctx.scale(1, 1);
      ctx.translate(-image.width / 2, -image.height / 2);
      ctx.drawImage(image, 0, 0);

      const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      ctx.putImageData(data, 0, 0);

      // As a blob
      return new Promise(resolve => {
        canvas.toBlob(file => {
          resolve(file);
        }, 'image/jpeg');
      });
    },
  };
}
