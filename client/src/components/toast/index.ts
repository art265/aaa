import Componenet from "./Component.vue";
import { createApp } from "vue";

export type ToastTypes = "Success" | "Failure" | "Warning" | "Info";
export interface ToastConfigs {
  [key: string]: any;
  Message: string;
  Timeout?: number;
  Type: ToastTypes;
}

class Toast {
  $fire(config: ToastConfigs, element?: HTMLElement) {
    const Toast = createApp(Componenet, {
      props: config,
    });

    if (element) Toast.mount(element);

    return Toast;
  }
}

export default new Toast();
