import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

function setPosts(response) {
  AppState.posts = response.data.posts.map(obj => new Post(obj))
  AppState.newerPage = response.data.newer
  AppState.olderPage = response.data.older
}
class PostsService {

  async getPosts() {
    const response = await api.get('api/posts')
    logger.log(response.data)
    setPosts(response)
  }

  async changePage(url) {
    const response = await api.get(`${url}`)
    logger.log('[POSTS SERVICE], GET NEW POSTS:', response.data.posts)
    setPosts(response)
  }

  async getPostsBySearchQuery(searchQuery) {
    const response = await api.get(`api/posts?query=${searchQuery}`)
    logger.log('[POSTS SERVICE], GOT POSTS BY SEARCH QUERY:', response.data.posts)
    setPosts(response)
  }

  clearData() {
    AppState.posts = []
  }

}

export const postsService = new PostsService()