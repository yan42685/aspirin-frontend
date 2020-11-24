<template>
  <ul>
    <li v-for="column in list" :key="column.id">
      <h5>{{ column.id }}</h5>
      <p>{{  }}</p>
      <a href="#" target="_blank">link</a>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export interface ColumnProps {
  id: number;
  title: string;
  content: string;
}

export default defineComponent({
  name: "ColumnList",
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  }
});
</script>

<style module lang="scss"></style>
