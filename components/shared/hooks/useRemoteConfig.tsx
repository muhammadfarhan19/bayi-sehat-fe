import {
  ensureInitialized,
  fetchAndActivate,
  getAll,
  getRemoteConfig,
  RemoteConfigSettings,
} from 'firebase/remote-config';
import { useEffect, useState } from 'react';

import { superApps } from '../../../config/firebase';

const remoteConfigSettings: RemoteConfigSettings = {
  minimumFetchIntervalMillis: 0, // 5 minutes (optional: adjust this based on Intra needs)
  fetchTimeoutMillis: 60000, // 1 minute (optional: adjust this based on Intra needs)
};

function useRemoteConfig<T>(): [T, boolean, Error | null] {
  const [config, setConfig] = useState<T>({} as T);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    const remoteConfig = getRemoteConfig(superApps);
    remoteConfig.settings = remoteConfigSettings;

    async function initRemoteConfig() {
      try {
        await ensureInitialized(remoteConfig);
        await fetchAndActivate(remoteConfig);
        const fetchedConfig = getAll(remoteConfig);
        if (mounted) {
          setConfig(fetchedConfig as unknown as T);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching Remote Config:', err);
        if (mounted) {
          setError(new Error('Error fetching Remote Config'));
          setLoading(false);
        }
      }
    }

    initRemoteConfig();

    return () => {
      mounted = false;
    };
  }, []);

  return [config, loading, error];
}

export default useRemoteConfig;
