import deleteProductByID from "../services/deleteProductApi";
import fetchProductos from "../services/fetchProductsApi";
import Swal from "sweetalert2";
import { Howl } from "howler";
import confetti from "canvas-confetti";

const getProductos = async () => {
  let fetchProducto = await fetchProductos();
  let { obteniendoProductos } = await fetchProducto;

  let app = document.getElementById("app");
  app.textContent = "";

  app.innerHTML = `
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    nombre
                </th>
                <th scope="col" class="px-6 py-3 hidden md:table-cell">
                    descripcion
                </th>
                <th scope="col" class="px-6 py-3">
                    precio
                </th>
                <th scope="col" class="px-6 py-3 hidden lg:table-cell">
                    disponibilidad
                </th>
                <th scope="col" class="px-6 py-3">
                    acciones
                </th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>
    `;

  let fila = document.querySelector("tbody");
  obteniendoProductos.forEach(item => {
    const disponibilidadtransform = () => {
      return item.disponibilidad ? "si esta disponible" : "no esta disponible";
    };

    let valorDisponibilidad = disponibilidadtransform();

    let contenedorDeProductos = document.createElement("tr");
    contenedorDeProductos.className =
      "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700";

    contenedorDeProductos.innerHTML = `
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <p>${item.nombre}</p>
        </th>
        <td class="px-6 py-4 hidden md:table-cell">
            <p>${item.descripcion}</p>
        </td>
        <td class="px-6 py-4">
            <p>${item.precio}</p>
        </td>
        <td class="px-6 py-4 hidden lg:table-cell">
            <p>${valorDisponibilidad}</p>
        </td>
        <td class="px-6 py-4 flex gap-2">
            <button id="delete-${item._id}" value="${item._id}"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 flex items-center gap-1">
                <i class="fas fa-trash-alt"></i> Borrar
            </button>
            <button class="btn focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 flex items-center gap-1"
                onclick="my_modal_1.showModal()">
                <i class="fas fa-edit"></i> Actualizar
            </button>
            <dialog id="my_modal_1" class="modal">
                <div class="modal-box border-spacing-1 bg-fuchsia-300">
                    <h3 class="text-lg font-bold">Editando producto!</h3>
                    <p class="py-4">Press ESC key or click the button below to close</p>
                    <div class="modal-action">
                        <form method="dialog">
                            <input placeholder="${item.nombre}" />
                            <br />
                            <input placeholder="${item.descripcion}" />
                            <br />
                            <input placeholder="${item.precio}" />
                            <br />
                            <select id="opcions">
                                <option value="true">Si esta disponible</option>
                                <option value="false">No esta disponible</option>
                            </select>
                            <button class="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </td>
        `;

    fila.appendChild(contenedorDeProductos);

    let deleteProducto = document.getElementById(`delete-${item._id}`);
    deleteProducto.addEventListener("click", async () => {
      let soundWarning = new Howl({
        src: ["../../warning.mp3"],
        volume: 0.5,
      });

      let soundSuccess = new Howl({
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
            y: Math.random() - 0.2,
          },
        });
      };

      const initSound = () => {
        soundWarning.play();
      };

      const initSoundSucess = () => {
        soundSuccess.play();
      };

      initSound();

      Swal.fire({
        title: "Esta seguro de eliminarlo?",
        text: "Esta acci n es inreversible!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borrarlo!",
      }).then(async result => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "eliminado!",
            text: "borrastes el producto exitosamente.",
            icon: "success",
          });
          const response = await deleteProductByID(deleteProducto.value);
          console.log(await response);
          getProductos();
          initSoundSucess();
          lanzarConfetti();
        }
      });
    });
  });
};

export default getProductos;