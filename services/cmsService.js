import { PurpleFactsAPI } from './_common';

const API_BASE = '/api/admin/cms' 

const CmsService = {

    getArticles : (callback, errHandle) => {
        const token = localStorage.getItem('admin:token')
        PurpleFactsAPI.get(`${API_BASE}/articles`, callback, {errHandle, token})
    },
    
    getArticlesById : (articleId, callback, errHandle) => {
        const token = localStorage.getItem('admin:token')
        PurpleFactsAPI.get(`${API_BASE}/article/${articleId}`,callback, {errHandle, token})
    },

    getArticleBySlug : (articleSlug, callback, errHandle) => {
        const token = localStorage.getItem('admin:token')
        PurpleFactsAPI.get(`${API_BASE}/article/slug/${articleSlug}`, callback, {errHandle, token})
    },

    updateArticle : (article, callback, errHandle) => {
        const token = localStorage.getItem('admin:token')
        PurpleFactsAPI.post(`${API_BASE}/article/update`,article, callback, {errHandle, token})
    },

    createArticle : (article, callback, errHandle) => {
        const token = localStorage.getItem('admin:token')
        PurpleFactsAPI.post(`${API_BASE}/article/new`,article, callback, {errHandle, token})
    },

    publishArticle : (articleID, callback, errHandle) => {
        const token = localStorage.getItem('admin:token')
        PurpleFactsAPI.get(`${API_BASE}/article/${articleID}/toggle/published/1`, callback, {errHandle, token})
    },

    unpublishArticle : (articleID, callback, errHandle) => {
        const token = localStorage.getItem('admin:token')
        PurpleFactsAPI.get(`${API_BASE}/article/${articleID}/toggle/published/0`, callback, {errHandle, token})
    },

    featureArticle : (articleID, callback, errHandle) => {
        const token = localStorage.getItem('admin:token')
        PurpleFactsAPI.get(`${API_BASE}/article/${articleID}/toggle/featured/1`, callback, {errHandle, token})
    },

    unfeatureArticle : (articleID, callback, errHandle) => {
        const token = localStorage.getItem('admin:token')
        PurpleFactsAPI.get(`${API_BASE}/article/${articleID}/toggle/featured/0`, callback, {errHandle, token})
    },

    archiveArticle : (articleID, callback, errHandle) => {
        const token = localStorage.getItem('admin:token')
        PurpleFactsAPI.get(`${API_BASE}/article/${articleID}/toggle/archived/1`, callback, {errHandle, token})
    },

    unarchiveArticle : (articleID, callback, errHandle) => {
        const token = localStorage.getItem('admin:token')
        PurpleFactsAPI.get(`${API_BASE}/article/${articleID}/toggle/archived/0`, callback, {errHandle, token})
    },
    
    deleteArticle : (articleID, callback, errHandle) => {
        const token = localStorage.getItem('admin:token')
        PurpleFactsAPI.get(`${API_BASE}/article/${articleID}/delete`, callback, {errHandle, token})
    }

}

export default CmsService





