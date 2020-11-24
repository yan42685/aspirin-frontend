<template>
  <ul>
    <li v-for="column in list" :key="column.id"></li>
    <h5>{{ column.title }}</h5>
    <p>{{ column.content }}</p>
    <a href="#" target="_blank">link</a>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export interface ColumnProps {
  id: number;
  title: string;
  content: string;
}

export const ColumnList = defineComponent({
  name: "ColumnList",
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup() {
    return {};
  }
});
</script>

<style module lang="scss"></style>
