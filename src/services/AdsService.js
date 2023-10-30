import { AppState } from "../AppState"
import { Advertisement } from "../models/Advertisement"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class AdsService {

  async getAds() {
    const response = await api.get('api/ads')
    logger.log('[ADS SERVICE, Got ads: ]', response.data)
    const ads = response.data.map(obj => new Advertisement(obj))
    AppState.ads = ads
  }

}

export const adsService = new AdsService()