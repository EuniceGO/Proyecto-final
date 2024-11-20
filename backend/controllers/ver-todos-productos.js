import ProductModel from "../models/productos.model.js";

const ObteniendoTodosLosProductos = async (req, res) => {
    
    try {
        
        let obteniendoProductos = await ProductModel.find()

        res.status(200).json({
            msj : "productos obtenidos exitosamente", obteniendoProductos
        })

    } catch (error) {

        res.status(500).json({
            msj: "hubo un problema al obtener los productos"
        })
        
    }
}

export default ObteniendoTodosLosProductos