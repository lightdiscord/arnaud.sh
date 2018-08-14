export const graphql = (query, variables) => {
    return fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            authorization: `Bearer ${process.env.VUE_APP_GITHUB_TOKEN}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables
        })
    }).then(response => response.json())
}

export const rest = (url) => {
    return fetch(url.startsWith('https://') ? url : `https://api.github.com/${url}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
}
