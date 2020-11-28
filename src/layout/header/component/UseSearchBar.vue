<!-- <script lang="ts">                     -->
<!-- import { defineComponent } from "vue"; -->

<!-- export default defineComponent({       -->
<!--   name: "UseSearchBar",                -->
<!--   setup() {                            -->
<!--     return {};                         -->
<!--   }                                    -->
<!-- });                                    -->
<!-- </script>                              -->

<!-- <style scoped lang="scss">             -->
<!-- .search-bar-container {                -->
<!--   position: relative;                  -->
<!--   width: 50%;                          -->
<!--   text-align: left;                    -->
<!--   left: 0;                             -->
<!-- }                                      -->
<!-- </style>                               -->
<template>
  <div class="search-bar-container">
    <a-input-search
      v-model:value="value"
      placeholder="input search text"
      enter-button
      @search="onSearch"
    >
      <template #enterButton>
        <a-button>
          Custom
        </a-button>
      </template>
    </a-input-search>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "UseSearchBar",
  setup() {
    const value = ref("");
    function onSearch(value: string) {
      console.log("use value", value);
      console.log("or use this.value", value);
    }

    return { value, onSearch };
  }
});
</script>

<style scoped lang="scss">
.search-bar-container {
  position: relative;
  width: 50%;
  top: 15px;
  right: 230px;
  text-align: center;
}
</style>
