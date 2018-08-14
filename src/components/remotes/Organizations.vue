<template>
    <p v-if="organizations.length > 0">
        I'm also a member of the organizations
        <span v-for="(organization, index) in organizations" :key="organization.id">
            <a :href="organization.html_url">{{ organization.name }}</a>{{ separator(index, organizations) }}
        </span>
        on GitHub
    </p>
</template>


<script>
import { mapState } from 'vuex'

export default {
    name: 'remotes-organizations',
    computed: mapState(['organizations']),
    methods: {
        separator(index, array) {
            const length = array.length

            if (length - 1 == index) return

            return index < length - 2
                ? ', '
                : ' and '
        }
    }
}
</script>
