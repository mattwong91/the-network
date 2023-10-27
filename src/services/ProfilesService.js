import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { Profile } from "../models/Profile"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProfilesService {

  async getProfileById(profileId) {
    const response = await api.get(`api/profiles/${profileId}`)
    logger.log('Profile Service, Got profile:', response.data)
    AppState.profile = new Profile(response.data)
  }

  async getPostsByProfileId(profileId) {
    const response = await api.get(`api/profiles/${profileId}/posts`)
    logger.log('Got posts from user id:', profileId, response.data)
    AppState.posts = response.data.posts.map(obj => new Post(obj))
    AppState.newerPage = response.data.newer
    AppState.olderPage = response.data.older
  }

  clearData() {
    AppState.profile = null
    AppState.posts = []
  }
}

export const profilesService = new ProfilesService()