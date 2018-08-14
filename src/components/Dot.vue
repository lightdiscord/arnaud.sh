<template>
    <span v-tooltip.top-center="language.name" :style="{ color: language.color }">⬤</span>
</template>

<script>
export default {
    name: 'dot',
    props: ['language']
}
</script>

<style lang="stylus">
.tooltip
    display block !important
    z-index 10000

    .tooltip-inner
        background black
        color white
        border-radius 16px
        padding 5px 10px 4px

    .tooltip-arrow
        width 0
        height 0
        border-style solid
        position absolute
        margin 5px
        border-color black
        z-index 1

    &[x-placement^="top"]
        margin-bottom 5px

    &[x-placement^="top"] .tooltip-arrow
        border-width 5px 5px 0 5px
        border-left-color transparent !important
        border-right-color transparent !important
        border-bottom-color transparent !important
        bottom -5px
        left calc(50% - 5px)
        margin-top 0
        margin-bottom 0

    &[aria-hidden='true']
        visibility hidden
        opacity 0
        transition opacity .15s, visibility .15s

    &[aria-hidden='false']
        visibility visible
        opacity 1
        transition opacity .15s
</style>
