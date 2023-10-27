import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class PostsService {

  async getPosts() {
    const response = await api.get('api/posts')
    Pop.success('Got Posts successfully!')
    logger.log(response.data)
    AppState.posts = response.data.posts.map(obj => new Post(obj))
  }


}

export const postsService = new PostsService()