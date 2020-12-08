<template>
  <div>
    <div><h1>Test One...</h1></div>
    <button @click="getMatched">click</button>
    <!-- <a-breadcrumb>                                                     -->
    <!--   <template v-if="matched && matched.length > 0">                  -->
    <!--     <a-breadcrumb-item v-for="route in matched" :key="route.path"> -->
    <!--       <span                                                        -->
    <!--         v-if="                                                     -->
    <!--           matched.indexOf(route) === matched.length - 1 &&         -->
    <!--             route.meta &&                                          -->
    <!--             route.meta.title                                       -->
    <!--         "                                                          -->
    <!--       >                                                            -->
    <!--         {{ route.meta.title }}                                     -->
    <!--       </span>                                                      -->
    <!--       <span                                                        -->
    <!--         v-else="                                                   -->
    <!--           matched.indexOf(route) === matched.length - 1 &&         -->
    <!--             route.meta &&                                          -->
    <!--             route.meta.title                                       -->
    <!--         "                                                          -->
    <!--       >                                                            -->
    <!--         {{ route.meta.title }}                                     -->
    <!--       </span>                                                      -->
    <!--     </a-breadcrumb-item>                                           -->
    <!--   </template>                                                      -->
    <!-- </a-breadcrumb>                                                    -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watchEffect } from "vue";
import { useRoute, RouteRecord, RouteLocation } from "vue-router";

export default defineComponent({
  name: "Test",
  setup() {
    const currentRoute: RouteLocation = useRoute();
    watchEffect;

    const data = reactive({
      matched: null as null | RouteRecord[],
      getMatched: () => {
        const list = currentRoute.matched;
        console.log(list);
      }
    });
    return { ...toRefs(data) };
  }
});
</script>

<style scoped lang="scss"></style>
