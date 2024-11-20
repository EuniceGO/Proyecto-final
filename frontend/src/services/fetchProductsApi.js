import axios from "axios"


let urlBase = "http://localhost:3000/api/obtener-productos"

const fetchProductos = async () => {
    
    try {
        
        const response = await axios.get(urlBase)

        console.log(await response.data);
        

        return await response.data

    } catch (error) {
        console.error(error);
        
    }

}

export default fetchProductos