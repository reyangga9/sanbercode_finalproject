import Swal from 'sweetalert2'

interface ToastProps {
   icon?: string | '';
   title?: string | '';
   text?: string | '';
}

const Toast = ({ icon, title, text }: ToastProps) => {
   const showToast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    showToast.fire({
      icon,
      title,
      text,
    });
}

 export default Toast;