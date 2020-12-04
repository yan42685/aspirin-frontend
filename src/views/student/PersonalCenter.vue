<template>
  <delayed-spin>
    <div class="card-container">
      <a-card class="card-left">
        whatever content
      </a-card>
      <a-card class="card-right">
        whatever content
      </a-card>
    </div>
  </delayed-spin>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import DelayedSpin from "@/components/basic/DelayedSpin.vue";

export default defineComponent({
  components: { DelayedSpin },
  name: "PersonalCenter",
  setup() {
    const data = reactive({
      loading: true,
      handleClick: () => {
        data.loading = !data.loading;
      }
    });
    return { ...toRefs(data) };
  }
});
</script>

<style scoped lang="scss">
.card-container {
  padding: 1.5%;
  display: flex;
  justify-content: space-between;
  .card-left,
  .card-right {
    min-height: 80vh;
  }
  .card-left {
    width: 33.5%;
    &:hover {
      box-shadow: $base-card-box-shadow;
    }
  }
  .card-right {
    width: 63.5%;
    &:hover {
      box-shadow: $base-card-box-shadow;
    }
  }
}
</style>
