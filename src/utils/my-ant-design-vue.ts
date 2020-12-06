import { message } from "ant-design-vue";

message.config({
  top: 100,
  duration: 3,
  maxCount: 3
});

export { message as messenger };
