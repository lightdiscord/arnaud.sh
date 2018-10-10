<template lang="pug">
    div
        h3
            code Repositories
        ul
            li(v-for='repository in repositories' :key='repository.id')
                a(:href='repository.url') {{ namespace(repository) }}
                    Dot(v-if='repository.language' :language='repository.language')
                |  - {{ repository.description }}
        p= "View all my GitHub repositories on my "
            a(href="https://github.com/LightDiscord?tab=repositories") profile
            | .
</template>

<script>
import Dot from '@/components/Dot'
import { mapState } from 'vuex'

const login = 'LightDiscord'

const namespace = login => ({ owner, name }) =>
    `${owner.login !== login ? `${owner.login}/` : ''}${name} `

export default {
    name: 'remotes-repositories',
    components: {
        Dot
    },
    computed: mapState(['repositories']),
    methods: {
        namespace: namespace(login)
    },
}
</script>

