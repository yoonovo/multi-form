<template>
    <div v-if="inputData" class="multi-step-form">
        <h3>{{ inputData.title }}</h3>
        <dl v-if="currentData">
            <dt>({{ currentData.itemId }}) {{ currentData.title }}</dt>
            <dd v-if="currentData.formType == 1">
                <span v-for="item in currentData.options" :key="item.id">
                    <input :id="'type_checkbox'+item.id" type="checkbox" name="type_checkbox">  
                    <label :for="'type_checkbox'+item.id">{{ item.text }}</label>
                </span>
            </dd>
            <dd v-if="currentData.formType == 2">
                <span v-for="item in currentData.options" :key="item.id">
                    <input :id="'type_radio'+item.id" type="radio" name="type_radio">  
                    <label :for="'type_radio'+item.id">{{ item.text }}</label>
                </span>
            </dd>
            <dd v-if="currentData.formType == 3">
                <input type="text">  
            </dd>
            <dd v-if="currentData.formType == 4">
                <select name="" id="">
                    <option v-for="item in currentData.options" :key="item.id" :value="item.id">{{ item.text }}</option>    
                </select> 
            </dd>
        </dl>
        <button :disabled="currentDataIdx == 0" @click="prevPage()">&lt;</button>
        <button :disabled="currentDataIdx == 3" @click="nextPage()">&gt;</button>
    </div>
</template>

<script>
import { InputData } from '../assets/input.ts';

export default {
    name: 'MultiStep',
    components: {
    },
    data() {
        return {
            inputData: {},
            currentData: {},
            currentDataIdx: 0,
        }
    },
    beforeCreate() {},
    created() {
        this.inputData = InputData;
        this.currentData = InputData.items[0];
    },
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    beforeUnmount() {},
    unmounted() {},
    computed: {
    },
    methods: {
        prevPage(){
            this.currentDataIdx = this.currentDataIdx-1;
            this.currentData = InputData.items[this.currentDataIdx];
        },
        nextPage(){
            this.currentDataIdx = this.currentDataIdx+1;
            this.currentData = InputData.items[this.currentDataIdx];
        }
    }
}
</script>

<style lang="scss">
.multi-step-form {
    border: 1px solid #000;
    text-align: center;
    padding: 20px 10px;
}
</style>
