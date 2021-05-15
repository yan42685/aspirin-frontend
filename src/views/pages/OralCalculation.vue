<template>
  <white-background>
    <div class="multiplication">
      <ul class="problem-area">
        <li v-for="i in multiplicationCount" :key="i">
          {{ factorAs[i - 1] }} x {{ factorBs[i - 1] }} =
          {{ productions[i - 1] }}
        </li>
      </ul>
    </div>
    <div class="subtraction">
      <ul class="problem-area">
        <li v-for="i in subtractionCount" :key="i">
          {{ minuends[i - 1] }} - {{ subtrahends[i - 1] }} =
          {{ differences[i - 1] }}
        </li>
      </ul>
    </div>
  </white-background>
</template>

<script lang="ts">
import WhiteBackground from "@/components/basic/WhiteBackground.vue";
import { computed, defineComponent, reactive, toRefs } from "vue";
import { randomNum } from "@/utils/basic-lib";

export default defineComponent({
  components: { WhiteBackground },
  name: "OralCalculation",
  setup() {
    const data = reactive({
      multiplicationCount: 15,
      subtractionCount: 15,
      factorAs: [] as number[],
      factorBs: [] as number[],
      productions: [] as number[],
      minuends: [] as number[],
      subtrahends: [] as number[],
      differences: [] as number[],
    });

    function fillNumbers() {
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

    return { ...toRefs(data) };
  },
});
</script>

<style scoped lang="scss">
.problem-area {
  //   height: 500px;
  //   width: 300px;
  display: flex;
  flex-wrap: wrap;
  li {
    display: inline-block;
    margin: 10px;
    width: 150px;
    height: 30px;
  }
}
</style>