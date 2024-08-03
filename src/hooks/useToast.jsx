import { useContext } from "react";
import ToastContext from "../plugin/Toast/ToastContext";

const useToast = () => useContext(ToastContext);

export default useToast;
