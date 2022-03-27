import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = nameObject => {
    return axios.post(baseUrl, nameObject)
}

const del = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, nameObject) =>
    axios.put(`${baseUrl}/${id}`, nameObject)

export default { getAll, create, del, update }