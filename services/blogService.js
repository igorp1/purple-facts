import { PurpleFactsAPI } from './_common'

const API_BASE = '/api/blog'

const BlogService = {

    loadFeaturedArticles : (req) => {
        return PurpleFactsAPI.getSync(`${API_BASE}/articles/featured`,{req})
    },

    loadArticles : (req) => {
        return PurpleFactsAPI.getSync(`${API_BASE}/articles/common`, {req})
    },

    loadArticle : (articleSlug, req) => {
        return PurpleFactsAPI.getSync(`${API_BASE}/article/${articleSlug}`, {req})
    }

}

export default BlogService
