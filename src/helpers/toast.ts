import { toast } from "react-toastify"

const toastError = () => {
  toast.error("Có lỗi xảy ra!");
}

const toastHelper = {
  toastError
};
export default toastHelper;