import AgregarProductos from "../services/addProductsApi";
import getProductos from "./getProductRender";
import Swal from "sweetalert2"
import {Howl} from "howler";
import confetti from "canvas-confetti"

const FormularioParaCrearProducto = () => {
    try {
        let agregarProducto = document.getElementById("form-add")


        
        

        agregarProducto.className = "p-8 "

        agregarProducto.innerHTML = `

<div class="max-w-sm mx-auto ">
<div class="mb-5">
  <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ingrese el nombre</label>

  <input type="text" id="nombre" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nombre" required />

</div>

<div class="mb-5">
  <label for="descripcion" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ingrese la descripcion</label>

  <input type="text" id="descripcion" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="descripcion" required />

</div>

<div class="mb-5">
  <label for="precio" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ingrese el precio</label>

  <input type="number" id="precio" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="precio" required />

</div>


<div class="mb-5">
<label for="opcions" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione la disponibilidad</label>
<select id="opcions" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

      <option value="true" >Si esta disponible</option>
      <option value="false" >No esta disponible</option>
  </select>

</div>
<div class="mb-5 content-center justify-center">
<button id="btnagregar" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agregar producto</button>
</div>

</div>


       

        `
        
        let btnagregar = document.getElementById("btnagregar")

        btnagregar.addEventListener('click', async() => {
          let sound = new Howl({
            src: ["../../success.mp3"],
            volume: 0.5,
          });
  
          const lanzarConfetti = () => {
            confetti({
              particleCount: 100,
              startVelocity: 30,
              spread: 360,
              origin: {
                x: Math.random(),
                // since they fall down, start a bit higher than random
                y: Math.random() - 0.2
              }
            });
          }

          const initSound = () => {
            sound.play();
          }
  

        let nombre = document.getElementById("nombre")
        let descripcion = document.getElementById("descripcion")
        let precio = document.getElementById("precio")
        let options = document.getElementById("opcions")



        let transform = parseFloat(precio.value)

    
        const transformandoABooleano = () => {
            console.log(options.value);
            
            return options.value === "true"
        }

        let booleandata = transformandoABooleano()

        const data = {
            "nombre":nombre.value,
            "descripcion": descripcion.value,
            "precio": transform,
            "disponibilidad": Boolean(booleandata)
        }
            let response = await AgregarProductos(data)
            console.log(await response);
            await getProductos()
            await getProductos()
            Swal.fire({
                title: "Producto creado",
                text: "producto creado exitosamente!",
                icon: "success"
              });

              lanzarConfetti()
              initSound()
              clearInputs()
              
           


        })
        

        const clearInputs = () => {
          document.getElementById("nombre").value = ""
          document.getElementById("descripcion").value = ""
          document.getElementById("precio").value = ""
          document.getElementById("opcions").value = ""
        }

        
        
    } catch (error) {
        console.error(error);   
    }
}
FormularioParaCrearProducto()

