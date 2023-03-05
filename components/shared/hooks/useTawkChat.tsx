import TawkTo from 'tawkto-react';

import usePersonalData from './usePersonalData';

function useTawkChat() {
  const personalData = usePersonalData();
  const tawk = new TawkTo('63ec8bf8474251287913675b', '1gpa05hnh');

  const handleShownChat = () => {
    setTimeout(() => {
      if (personalData) {
        return tawk?.onLoad(
          tawk?.setAttributes(
            {
              name: `${personalData?.nama}`,
              email: `${personalData?.email}`,
            },
            function (error: any) {
              throw error;
            }
          )
        );
      }
      tawk?.onLoad(
        tawk?.setAttributes(
          {
            name: 'Guest',
            email: '',
          },
          function (error: any) {
            throw error;
          }
        )
      );
    }, 5000);
    tawk.showWidget();
    tawk.minimize();
  };
  return {
    handleShownChat,
  };
}

export default useTawkChat;
