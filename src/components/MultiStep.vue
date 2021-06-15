<template>
    <div id="multi-step" v-if="inputData">
        <h3>{{ inputData.title }}</h3>
        <div class="multi-step-index">
            <div class="multi-step-index-layar" v-for="(item, index) in inputData.items" :key="index">
                <span class="contents" :class="{ 'active': currentDataIdx >= index }">{{ index+1 }}</span>
                <span class="contents-bar"></span>
            </div>
        </div>
        <div class="multi-step-form">
            <dl v-if="currentData">
                <dt>({{ currentData.itemId }}) {{ currentData.title }}</dt>
                <dd v-if="currentData.formType == 1" class="checkbox-area">
                    <span v-for="item in currentData.options" :key="item.id">
                        <input :id="'type_checkbox'+item.id" type="checkbox" name="type_checkbox" @click="selectCheckbox(item, currentData.itemId)" :checked="checkedBox(item.id)">  
                        <label :for="'type_checkbox'+item.id">{{ item.text }}</label>
                    </span>
                </dd>
                <dd v-if="currentData.formType == 2" class="radio-area">
                    <span v-for="item in currentData.options" :key="item.id">
                        <input :id="'type_radio'+item.id" type="radio" name="type_radio" @click="selectRadio(item.text, currentData.itemId)" :checked="outputData[currentData.itemId] === item.text">  
                        <label :for="'type_radio'+item.id">{{ item.text }}</label>
                    </span>
                </dd>
                <dd v-if="currentData.formType == 3" class="input-area">
                    <input type="text" v-model="outputData[currentData.itemId]">  
                </dd>
                <dd v-if="currentData.formType == 4" class="selectbox-area">
                    <select v-model="outputData[currentData.itemId]">
                        <option v-for="item in currentData.options" :key="item.id" :value="item.text">{{ item.text }}</option>    
                    </select> 
                </dd>
            </dl>
            <button class="btn prev" v-if="currentDataIdx > 0" @click="prevPage()">&lt; prev</button>
            <button class="btn next" :class="{ 'active': checkValidation() }" v-if="currentDataIdx < (this.inputData['items'].length-1)" :disabled="!checkValidation()" @click="nextPage()">next &gt;</button>
            <button class="btn submit" v-if="currentDataIdx == (this.inputData['items'].length-1)" @click="submit()">Submit</button>  
        </div>
    </div>
</template>

<script>
import { InputData } from '../assets/input.ts';

export default {
    name: 'MultiStep',
    // setup() {
    //     const state = reactive({
    //       username: '',
    //       password: ''
    //     })
    // },
    data() {
        return {
            inputData: {},
            currentData: {},
            currentDataIdx: 0,
            outputData: {},
        }
    },
    beforeCreate() {},
    created() {
        this.inputData = InputData;
        this.currentData = InputData.items[0];
        this.inputData['items'].forEach(v => {
            switch(v.formType){
                case 1:
                    this.outputData[v.itemId] = [];
                    break;
                case 2:
                case 3:
                    this.outputData[v.itemId] = '';
                    break;
                case 4: 
                    this.outputData[v.itemId] = v.options[0].text;
            }
        });
    },
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    beforeUnmount() {},
    unmounted() {},
    computed: {},
    methods: {
        checkValidation(){
            this.currentData.formType;
            let result = false;
            switch(this.currentData.formType){
                case 1:
                    result = this.outputData[this.currentData.itemId].length > 0;
                    break;
                case 2:
                case 3:
                case 4: 
                    result = !!this.outputData[this.currentData.itemId];
                    break;
            }
            return result;
        },
        prevPage(){
            this.currentDataIdx = this.currentDataIdx-1;
            this.currentData = InputData.items[this.currentDataIdx];
        },
        nextPage(){
            this.checkValidation();
            this.currentDataIdx = this.currentDataIdx+1;
            this.currentData = InputData.items[this.currentDataIdx];
        },
        submit(){
            const key = Object.keys(this.outputData); // eslint-disable-line no-unused-vars
            const items = key.reduce((tot, val) => {  // eslint-disable-line no-unused-vars
                let answer = '';
                if(typeof this.outputData[val] === 'object'){
                    answer = (this.outputData[val].reduce((total, value) => {
                        total.push(value.text);
                        return total;
                    }, [])).join(',');
                }else {
                    answer = this.outputData[val];
                }
                tot.push({
                    id: val,
                    answer: answer
                })
                return tot;
            }, []);
            
            alert('제출이 완료되었습니다.');
            // this.$router.push({path: '/complete', query: {
            //     id: this.inputData['formId'],
            //     items: JSON.stringify(items)
            // }});
        },
        selectCheckbox(item, itemId){
            const idx = this.outputData[itemId] ? this.outputData[itemId].findIndex(v => v.id === item.id) : false;
            if(idx === -1){
                this.outputData[itemId].push(item);
            }else{
                this.outputData[itemId].splice(idx, 1);
            }
        },
        checkedBox(id){
            return this.outputData && this.outputData[this.currentData.itemId].some(v => v.id === id); 
        },
        selectRadio(text, itemId){
            this.outputData[itemId] = text;
        }
    }
}
</script>

<style lang="scss">
#multi-step {
    display: block;
    width: 90%;
    padding: 0 5%;
}

h3 {
    text-align: center;
    font-size: 30px;
    margin-bottom: 20px;
}

.multi-step-index {
    margin-bottom: 40px;
    display: flex;
    justify-content: center;

    .multi-step-index-layar {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    
        .contents {
            width: 50px;
            height: 50px;
            line-height: 56px;
            background-color: #fff;
            color: #000;
            border: 1px solid #000;
            font-weight: bold;
            border-radius: 30px;
            font-size: 33px;
            
            &.active {
                background-color: #000;
                color: #fff;
                animation-name: stepFull;
                animation-duration:1s;
            }

            &:last-child {
                margin-right: 0;
            }
        }

        &:last-child .contents-bar {
            display: none;
        }

        .contents-bar {
            width: 30px;
            height: 5px;
            background-color: #000;
        }
    }
}

.multi-step-form {
    border: 1px solid lightgray;
    text-align: center;
    padding: 20px 10px;
    margin-bottom: 25px;

    dt {
        margin-bottom: 20px;
    }

    dd {
        margin-left: 0;
    }

    .checkbox-area,
    .radio-area {
        display: flex;
        margin-bottom: 20px;
        flex-direction: column;

        span {
            flex-basis: 33.3%;
            line-height: 30px;

            label {
                margin-left: 10px;
            }
        }
    }

    .input-area {
        margin-bottom: 20px;

        input[type="text"] {
            height: 25px;
            text-indent: 10px;
            width: 60%;
        }
    }

    .selectbox-area {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;

        select {
            height: 25px;
            width: 70%;
        }
    }

    .btn {
        width: 100px;
        margin-right: 10px;
        height: 30px;
        font-weight: bold;
        font-size: 18px;
        border: 1px solid #000;
        border-radius: 3px;
        cursor: pointer;

        &.next.active,
        &.submit {
            background: #000;
            color: #fff;
        }
    }
}

@-webkit-keyframes stepFull {
  0% {
    background-color: #fff;
  }
  100% {
    background-color: #000;
  }
}
</style>
