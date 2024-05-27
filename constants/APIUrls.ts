import EnvironmentConfig from '../utils/Environtment'

export const AuthAPI = {
  POST_AUTH: EnvironmentConfig.apiHost + '/auth/login',
}

export const BabyAPI = {
  GET_BABIES: EnvironmentConfig.apiHost + '/baby',
  GET_BABY: EnvironmentConfig.apiHost + '/baby/detail/',
  GET_MALE_BABIES: EnvironmentConfig.apiHost + '/baby/male',
  GET_FEMALE_BABIES: EnvironmentConfig.apiHost + '/baby/female',
  DELETE_BABY: EnvironmentConfig.apiHost + '/baby/delete/',
  PUT_BABY: EnvironmentConfig.apiHost + '/baby/put/',
  POST_BABY: EnvironmentConfig.apiHost + '/baby/create',
}

export const ConditionAPI = {
  GET_CONDITIONS: EnvironmentConfig.apiHost + '/condition',
  GET_DETAIL_CONDITION: EnvironmentConfig.apiHost + '/condition/detail/',
  POST_CONDITIONS: EnvironmentConfig.apiHost + '/condition/create/',
  DELETE_CONDITIONS: EnvironmentConfig.apiHost + '/condition/delete/',
  UPDATE_CONDITIONS: EnvironmentConfig.apiHost + '/condition/update/',
}
