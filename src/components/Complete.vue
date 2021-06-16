<template>
    <div class="complete-box">
        <dl>
            <dt class="complete-head">
                <i class="xi-file-check-o"></i>
                <h3 class="title">설문에 참여해주셔서<br />감사합니다.</h3>
            </dt>
            <dl class="complete-btn">
                <button @click="reset()">다시하기</button>
            </dl>
        </dl>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Complete',
    data() {

    }, 
    created() {
    },
    methods: {
        reset() {
            this.$router.push({ path: '/' });
        }
    }
}
</script>  

<style lang="scss">
.complete-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;

    .complete-head {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;

        .xi-file-check-o {
            font-size: 80px;
            margin-bottom: 15px;
            color: green;
        }

        .title {
            font-size: 30px;
            text-align: center;
        }
    }

    .complete-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        
        button {
            height: 40px;
            font-size: 16px;
            font-weight: 600;
            margin-top: 15px;
            padding: 10px 30px;
            border: 1px solid #000;

            &:hover {
            background: #000;
            color: white;
            }
        }
    }
}
</style>