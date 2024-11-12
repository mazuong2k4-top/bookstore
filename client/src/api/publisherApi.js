import axiosClient from "./axiosClient"

const publisherApi = {

    getAll: ({page, limit}) => {
        const url = 'publishers/'
        return axiosClient.get(url, { params: {page, limit}})
    },
    getBySlug: (slug) => {
        const url = `publishers/slug/${slug}`
        return axiosClient.get(url)
    },
    create: (data) => {
        const url = 'publishers/'
        return axiosClient.post(url, data)
    },
    update: (id, data) => {
        const url = `publishers/${id}`
        return axiosClient.put(url, data)
    },
    delete: (id) => {
        const url = `publishers/${id}`
        return axiosClient.delete(url)
    }

}

export default publisherApi