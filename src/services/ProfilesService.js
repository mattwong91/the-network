import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { Profile } from "../models/Profile"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProfilesService {

  async getProfileById(profileId) {
    const response = await api.get(`api/profiles/${profileId}`)
    logger.log('Profile Service, Got profile:', response.data)
    AppState.activeProfile = new Profile(response.data)
  }

  async getPostsByProfileId(profileId) {
    const response = await api.get(`api/profiles/${profileId}/posts`)
    logger.log('Got posts from user id:', profileId, response.data)
    AppState.posts = response.data.posts.map(obj => new Post(obj))
    AppState.newerPage = response.data.newer
    AppState.olderPage = response.data.older
  }

  async getProfilesBySearchQuery(searchQuery) {
    const response = await api.get(`api/profiles?query=${searchQuery}`)
    logger.log('[PROFILE SERVICE], Got profiles by search query:', response.data)
    AppState.profiles = response.data.map(obj => new Profile(obj))
  }

  clearData() {
    AppState.activeProfile = null
    AppState.profiles = []
  }
}

export const profilesService = new ProfilesService()