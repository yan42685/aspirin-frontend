import { message } from "ant-design-vue";

message.config({
  top: 100,
  duration: 1.5,
  maxCount: 3
});

export { message as messenger };
