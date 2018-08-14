import { graphql, rest } from '@/utils/request'

const map = callback => list => list.map(callback)

const login = 'LightDiscord'

const fetchGraphQL = login => {
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

    return graphql(query, { login })
}

const fetchRest = login => rest(`users/${login}/orgs`)
    .then(map(({ url }) => rest(url)))
    .then(Promise.all.bind(Promise))
    .then(map(({ id, html_url, name, login }) => ({ id, html_url, name: name || login })))

export default ({ commit }) => {
    return Promise.all([fetchGraphQL(login), fetchRest(login)])
        .then(data => (commit('storeFromGitHub', data), data))
}
