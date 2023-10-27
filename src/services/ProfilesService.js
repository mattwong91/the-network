import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProfilesService {

  async getProfileById(profileId) {
    AppState.profile = null
    const response = await api.get(`api/profiles/${profileId}`)
    logger.log('Profile Service, Got profile:', response.data)
    // TODO SET APPSTATE PROFILE TO A NEW PROFILE , CREATE PROFILE MODEL
  }

}

export const profilesService = new ProfilesService()