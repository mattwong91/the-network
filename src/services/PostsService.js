import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class PostsService {

  async getPosts() {
    const response = await api.get('api/posts')
    logger.log(response.data)
    AppState.posts = response.data.posts.map(obj => new Post(obj))
    AppState.newerPage = response.data.newer
    AppState.olderPage = response.data.older
  }

  async changePage(url) {
    const response = await api.get(`${url}`)
    logger.log('[POSTS SERVICE], GET NEW POSTS:', response.data.posts)
    AppState.posts = response.data.posts.map(obj => new Post(obj))
    AppState.newerPage = response.data.newer
    AppState.olderPage = response.data.older
  }

}

export const postsService = new PostsService()