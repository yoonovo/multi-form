<template>
    <div>
        <dl>
            <dt>설문을 완료하였습니다.</dt>
            <dl></dl>
        </dl>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Complete',
    data() {

    }, 
    created() {
        console.log('$route.query', this.$route.query)
    },
    methods: {

    }
}
</script>  