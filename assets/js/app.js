

const proyecto = (() => {

    const materiales = document.querySelector(".formulario__campo__select");
    const añadir = document.querySelector(".btn__añadir");
    const btnCalcular = document.createElement('input');
    const campoBotonCalcular = document.querySelector(".cotizar__calculo__calcular");
    const campoElementosCotizar = document.querySelector(".cotizar__calculo__campos");
    const campoElementoTotal = document.querySelector(".cotizar__calculo__total");
    const limpiar = document.querySelector(".btn__limpiar");

   
    const ingredientes = [

        { nombre: 'Azúcar', precio: 1000 },
        { nombre: 'Luz', precio: 200 },
        { nombre: 'Pan', precio: 300 },
        { nombre: 'Maizena', precio: 400 },
        { nombre: 'Bolsas', precio: 500 },
        { nombre: 'Gas', precio: 600 },
        { nombre: 'Crema', precio: 700 },
    ];

    let verificarC = false;


    //Total Cotizacion
    const crearTotal = document.createElement('p');
    crearTotal.classList.add('cotizar__calculo__total__texto');
    campoElementoTotal.appendChild(crearTotal);


    //total Ganancias

    const mensajeGanacias = document.createElement('p');
    mensajeGanacias.classList.add('cotizar__calculo__ganancias__texto');
    campoElementoTotal.appendChild(mensajeGanacias);





    //Listar Ingredientes en el Select
    for (let i = 0; i < ingredientes.length; i++) {
        const añadirIngredientes = document.createElement('option');
        añadirIngredientes.setAttribute("value", i + 1);
        añadirIngredientes.innerText = ingredientes[i].nombre;
        materiales.append(añadirIngredientes);

    }


    const verificarRepetir = (idInput) => {
        const elementosAgregados = document.querySelectorAll(".cotizar__calculo input");
        let elementoRepetido = false;
        elementosAgregados.forEach(input => {
            if (input.getAttribute('id') === idInput) {
                elementoRepetido = true;
            }
        });

        return elementoRepetido;
    }



    const crearCampos = (ingrediente, indice) => {
        const crearCampo = document.createElement('div');
        const crearLabel = document.createElement('label');
        const crearInput = document.createElement('input');

        const idIngrediente = indice + 1;
        crearCampo.classList.add("cotizar__calculo__campo")

        campoElementosCotizar.append(crearCampo);

        crearLabel.setAttribute("for", `ingrediente${idIngrediente}`);
        crearLabel.classList.add("cotizar__calculo__campo__label")
        crearLabel.textContent = `${ingrediente} : `;


        crearInput.placeholder = 'Ingrese la cantidad';
        crearInput.setAttribute("type", "number");
        crearInput.setAttribute("min", 0);
        crearInput.setAttribute("id", `ingrediente${idIngrediente}`);
        crearInput.classList.add("cotizar__calculo__campo__input");

        crearCampo.append(crearLabel, crearInput);

    }



    const crearCalcular = () => {


        if (!verificarC) {

            btnCalcular.setAttribute("type", "submit");
            btnCalcular.setAttribute("value", "Calcular");
            btnCalcular.setAttribute("id", "calcular")
            btnCalcular.classList.add("btn", "btn__calcular")
            campoBotonCalcular.append(btnCalcular);

        }


    }

    const hacerCotizacion = (resul) => {

        if (resul <= 0) {
            alert('Ponga digitos mayores a 0');
            return;
        }


        // crearTotal.innerText = `Cotización: ${resul}`;

        // let ganancias = resul * .3;

        // mensajeGanacias.innerText = `Ganancias: ${ganancias}`;

        const cotizacionTexto = `Cotización: <span class="cotizar__calculo__span" >${resul}</span>`;
        crearTotal.innerHTML = cotizacionTexto;
    
        let ganancias = resul * 0.3;
        const gananciasTexto = `Ganancias: <span class="cotizar__calculo__span" >${ganancias}</span>`;
        mensajeGanacias.innerHTML = gananciasTexto;
        



    }



    añadir.addEventListener("click", function (event) {


        event.preventDefault();
        const valorSeleccionado = materiales.value * 1;
        const i = (valorSeleccionado - 1);
        let ingrediente = ingredientes[i].nombre;
        
        let idIngrediente = `ingrediente${i + 1}`;
        
        if (valorSeleccionado === "") {
            alert('Seleccione un material');

        } else if (verificarRepetir(idIngrediente)) {
            alert('Elemento Repetido')
        } else {

            crearCampos(ingrediente, i);
            crearCalcular();
            return verificarC = true;

        }

    })




    btnCalcular.addEventListener("click", function (event) {
        event.preventDefault();
        const valores = document.querySelectorAll(".cotizar__calculo .cotizar__calculo__campo__input");


        let precios = [];
        let resultado = 0;

        for (let i = 0; i < valores.length; i++) {
            const valor = valores[i].value * 1;
            const idIngrediente = valores[i].getAttribute('id');
            const indice = parseInt(idIngrediente.match(/\d+/)[0]) - 1;
           
            if (ingredientes[indice].nombre === 'Azúcar') {
                precios.push((valor / 100) * ingredientes[indice].precio);
            } else {
                precios.push(valor * ingredientes[indice].precio);
            }

            resultado += precios[i];
        }
        hacerCotizacion(resultado);


    })





})();

