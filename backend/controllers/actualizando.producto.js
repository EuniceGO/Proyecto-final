import ProductModel from "../models/productos.model.js";

const ActualizarProducto = async (req, res) => {
    
    const {id} = req.params

        
    const {
        nombre,
        descripcion,
        precio,
        disponibilidad
    } = req.body

    const data = {
        nombre: String(nombre),
        descripcion : String(descripcion),
        precio : Number(precio),
        disponibilidad : Boolean(disponibilidad)
    }

    if (!data.nombre || !data.descripcion || !data.precio || !data.disponibilidad === undefined) {
        return res.status(400).json({
            msj : "todos los campos del producto son requiridos"
        })
    }


    try {
        

        const actualizandoProducto = await ProductModel.findByIdAndUpdate(id,data, {new:true} )

        res.status(200).json({
            msj : "producto actualizado exitosamente", actualizandoProducto
        })


    } catch (error) {
        res.status(500).json({
            msj: "hubo un problema al actualizar el producto"
        })
    }

}

export default ActualizarProducto