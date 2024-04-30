import getConfig from 'next/config'

interface Config extends FirebaseConfig {
  apiHost: string
  environment: 'development' | 'production' | 'staging'
  cookieSecure: boolean
  apiTimeoutMs: number
  tokenExpiredMs: number
}
interface FirebaseConfig {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId: string
}

const { publicRuntimeConfig: config } = getConfig()
export default config as Config
