import useRemoteConfig from '../components/shared/hooks/useRemoteConfig';

type RemoteConfigKey = string;

export function useParsedRemoteConfig<T>(configKey: RemoteConfigKey): T | null {
  const [config] = useRemoteConfig<Record<RemoteConfigKey, { _value: string }>>();

  try {
    const parsedConfig = JSON.parse(config?.[configKey]?._value ?? '{}') as T;
    return parsedConfig;
  } catch (error) {
    return null;
  }
}
