import { POSITION, useToast } from "vue-toastification";

export type ToastTypes = "Success" | "Failure" | "Warning" | "Info";
export interface ToastConfigs {
  [key: string]: any;
  Message: string;
  Timeout?: number;
  Type: ToastTypes;
}

class Toast {
  private toast = useToast();

  $success(message: string, timeout: number = 3000) {
    this.toast.success(message, {
      timeout: timeout,
      position: POSITION.BOTTOM_RIGHT,
      toastClassName: `relative  rounded-lg bg-gradient-to-r from-apple-300 to-apple-500 drop-shadow-lg`,
    });
  }

  $failure(message: string, timeout: number = 3000) {
    this.toast.error(message, {
      timeout: timeout,
      position: POSITION.BOTTOM_RIGHT,
      toastClassName: `relative  rounded-lg bg-gradient-to-r from-flush-300 to-flush-500 drop-shadow-lg`,
    });
  }

  $warning(message: string, timeout: number = 3000) {
    this.toast.warning(message, {
      timeout: timeout,
      position: POSITION.BOTTOM_RIGHT,
      toastClassName: `relative  rounded-lg bg-gradient-to-r from-wattle-300 to-wattle-500 drop-shadow-lg`,
    });
  }

  $info(message: string, timeout: number = 3000) {
    this.toast.info(message, {
      timeout: timeout,
      position: POSITION.BOTTOM_RIGHT,
      toastClassName: `relative  rounded-lg bg-gradient-to-r from-blue-300 to-blue-500 drop-shadow-lg`,
    });
  }

  $fire(config: ToastConfigs) {
    switch (config.Type) {
      case "Success":
        this.$success(config.Message, config.Timeout);
        break;
      case "Failure":
        this.$failure(config.Message, config.Timeout);
        break;
    }
  }
}

export default new Toast();
