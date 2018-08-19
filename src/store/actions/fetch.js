import * as request from '@/utils/request'

const map = callback => list => list.map(callback)

const login = 'LightDiscord'

export const fetchGraphQL = login => commit => {
    const query = `
        query ($login: String!) {
            user (login: $login) {
                repositories: pinnedRepositories(first: 6) {
                    nodes {
                        owner {
                            login
                        }
                        name
                        description
                        language: primaryLanguage {
                            color
                            id
                            name
                        }
                        url
                    }
                }
            }
        }
    `

    return request.graphql(query, { login })
        .then(data => (commit('storeRepositories', data.data.user.repositories.nodes), data))
}

export const fetchOrganizations = login => commit => request.rest(`users/${login}/orgs`)
    .then(map(({ url }) => request.rest(url)))
    .then(Promise.all.bind(Promise))
    .then(map(({ id, html_url, name, login }) => ({ id, html_url, name: name || login })))
    .then(organizations => (commit('storeOrganizations', organizations), organizations))

export const fetchAll = ({ commit }) => {
    const requests = [
        fetchGraphQL(login),
        fetchOrganizations(login),
    ].map(f => f(commit))

    return Promise.all(requests)
}
