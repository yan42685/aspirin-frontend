export interface GlobalState {
  name: string;
  age: number;
}

// 所有列表属性都能用它来flatten数据结构 eg: ListProps<Student> 数据结构为: { id: student }
export interface ListProps<P> {
  // 可以理解为 Java 中的 Map
  [id: string]: P;
}

export interface GlobalList<P> {
  data: ListProps<P>;
  isLoaded: boolean;
}
