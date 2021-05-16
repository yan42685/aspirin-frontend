<template>
  <white-background>
    <div class="multiplication">
      <ul class="problem-area">
        <li v-for="i in multiplicationCount" :key="i">
          {{ factorAs[i - 1] }} x {{ factorBs[i - 1] }} =
          <transition mode="out-in" name="fade-in">
            <span v-if="isShowAnswers">{{ productions[i - 1] }}</span>
          </transition>
        </li>
      </ul>
    </div>
    <div class="subtraction">
      <ul class="problem-area">
        <li v-for="i in subtractionCount" :key="i">
          <span>
            {{ minuends[i - 1] }} - {{ subtrahends[i - 1] }} =
            <transition mode="out-in" name="fade-in">
              <span v-if="isShowAnswers">{{ differences[i - 1] }}</span>
            </transition>
          </span>
        </li>
      </ul>
    </div>
    <br />
    <div class="commands">
      <a-button type="primary" @click="fillNumbers">更新</a-button>
      &nbsp;&nbsp;&nbsp;
      <a-button
        type="primary"
        @mouseover="showAnswers"
        @mouseleave="hideAnswers"
        @click="showAnswers"
        >悬浮显示答案</a-button
      >&nbsp;&nbsp;&nbsp;(按空格也可以开关答案)
    </div>
  </white-background>
</template>

<script lang="ts">
import WhiteBackground from "@/components/basic/WhiteBackground.vue";
import { defineComponent, reactive, toRefs } from "vue";
import { randomNum } from "@/utils/basic-lib";
import { stopSpaceDefaultBehavior } from "@/utils/event-listener";
import key from "keymaster";

export default defineComponent({
  components: { WhiteBackground },
  name: "OralCalculation",
  setup() {
    const data = reactive({
      isShowAnswers: false,
      multiplicationCount: 18,
      subtractionCount: 20,
      factorAs: [] as number[],
      factorBs: [] as number[],
      productions: [] as number[],
      minuends: [] as number[],
      subtrahends: [] as number[],
      differences: [] as number[],
      showAnswers: () => {
        data.isShowAnswers = true;
      },
      hideAnswers: () => {
        data.isShowAnswers = false;
      },
      showOrHideAnswers: () => {
        data.isShowAnswers = !data.isShowAnswers;
      },
    });

    function fillNumbers() {
      data.isShowAnswers = false;

      for (let i = 0; i < data.multiplicationCount; i++) {
        data.factorAs[i] = randomNum(11, 100);
        data.factorBs[i] = randomNum(11, 100);
        data.productions[i] = data.factorAs[i] * data.factorBs[i];
      }

      for (let i = 0; i < data.subtractionCount; i++) {
        data.minuends[i] = randomNum(1001, 10000);
        data.subtrahends[i] = randomNum(1001, 10000);
        data.differences[i] = data.minuends[i] - data.subtrahends[i];
      }
    }

    fillNumbers();
    // 注册快捷键
    key("space", data.showOrHideAnswers);
    stopSpaceDefaultBehavior();

    return { ...toRefs(data), fillNumbers };
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/transitions.scss";
.problem-area {
  display: flex;
  flex-wrap: wrap;
  li {
    font-size: 1.4em;
    display: inline-block;
    margin: 10px;
    height: 30px;
  }
}

.multiplication li {
  width: 150px;
}

.subtraction li {
  width: 230px;
}
</style>