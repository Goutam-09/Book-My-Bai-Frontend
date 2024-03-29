import Swal from "sweetalert2";

let Toast = Swal.mixin({
    toast:true,
    position: 'top',
    showConfirmButton:false,
    timer:2000,
    timerProgressBar: true
})

export default Toast;