<template>
    <section>
        <h2>$ ls -l ~/keys</h2>

        <blockquote>
            <span>total 42</span>
            <br>
            <span>-rw-r--r--   1 arnaud users 3775 Aug 19 10:57 <a :href="gist('pgp.key')">pgp.key</a></span>
            <br>
            <span>-rw-r--r--   1 arnaud users  400 Aug 19 10:58 <a :href="gist('ssh.key')">ssh.key</a></span>
        </blockquote>
    </section>
</template>

<script>
const login = 'LightDiscord'
const gist = 'd5228398e271bfae6a6caa6ce2cf0b4a'

export default {
    name: 'key-section',
    methods: {
        gist (file) {
            return `https://gist.githubusercontent.com/${login}/${gist}/raw/${file}`
        }
    }
}
</script>

<style lang="stylus" scoped>
blockquote
    font-family monospace
</style>
