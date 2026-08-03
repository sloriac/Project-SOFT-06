$(function() {

    const contrasennia = $("#contrasenna");
    const correo = $("#correo");
    

    const btnIniciarSesion = $("#iniciar-sesion");

    const inputsRequeridos = $("input[required]");



    function validar() {
        let error = false;

        inputsRequeridos.each(function (){
            if ($(this).val().trim() === "") {
                error = true;

                Swal.fire({
                    title: "No se puede iniciar sesión",
                    text: "Por favor complete los campos resaltados.",
                    icon: "warning",
                    confirmButtonText: "Aceptar"
                });
                return false;
            }
        });

        resaltarCamposVacios();
        
        if (!error) {
            iniciarSesion();
        }
    }

    function resaltarCamposVacios() {

        //Contraseña
        if (contrasennia.val().trim() === "") {
            contrasennia.addClass("input-error");
        } else { 
            contrasennia.removeClass("input-error");
        }

        //Correo
        if (correo.val().trim() === "") {
            correo.addClass("input-error");
        } else { 
            correo.removeClass("input-error");
        }
    }

    function iniciarSesion() {

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        let existe = false;

        for(let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].correo === $(correo).val()) {
                existe = true;
                Swal.fire({
                    title: "Bienvenido (a)",
                    text: usuarios[i].nombre,
                    icon: "success",
                    confirmButtonText: "Aceptar"
                });
                break;
            }
        }

        if (existe === false) {
            Swal.fire({
                title: "Error al iniciar sesión",
                text: "Datos de inicio de sesión incorrectos",
                icon: "warning",
                confirmButtonText: "Aceptar"
            });
        }
        
    }

    btnIniciarSesion.on("click", validar);
});