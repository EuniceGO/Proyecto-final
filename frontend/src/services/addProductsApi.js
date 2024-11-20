import axios from "axios";

let urlBase = "http://localhost:3000/api/crear-producto"

const AgregarProductos = async (data) => {
    try {

        const response = await axios.post(urlBase, data)

        return await response.data
        
    } catch (error) {
        console.error(error);
        
    }
}

export default AgregarProductos
