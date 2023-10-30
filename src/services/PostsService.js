import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
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

  async createPost(postData) {
    const response = await api.post('api/posts', postData)
    logger.log('[POSTS SERVICE], CREATED POST:', response.data)
    const newPost = new Post(response.data)
    AppState.posts.unshift(newPost)
  }

  async deletePost(postId) {
    const response = await api.delete(`api/posts/${postId}`)
    logger.log('[POSTS SERVICE], DELETED POST:', response.data)
    AppState.posts = AppState.posts.filter(post => post.id != postId)
  }

  async toggleLike(postId) {
    const response = await api.post(`api/posts/${postId}/like`)
    logger.log('[POST SERVICE] LIKED POST: ', response.data)
    const postIndex = AppState.posts.findIndex(post => post.id == postId)
    const updatedPost = new Post(response.data)
    AppState.posts.splice(postIndex, 1, updatedPost)
  }

  clearData() {
    AppState.posts = []
  }

}

export const postsService = new PostsService()