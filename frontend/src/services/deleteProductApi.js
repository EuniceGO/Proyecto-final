import axios from "axios";

const deleteProductByID = async (id) => {
    
    try {
        
        const response = await axios.delete(`http://localhost:3000/api/borrar-productos/${id}`)

        return await response.data

    } catch (error) {
        console.error(error);
        
    }

}

export default deleteProductByID