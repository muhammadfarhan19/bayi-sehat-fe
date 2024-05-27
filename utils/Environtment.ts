interface Environment {
  apiHost: string
}

const EnvironmentConfig: Environment = {
  apiHost: 'http://localhost:4000' || 'https://bayi-sehat-api.vercel.app/api',
}

export default EnvironmentConfig
