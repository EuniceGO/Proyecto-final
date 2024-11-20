import ProductModel from "../models/productos.model.js";


const AgregarProducto = async (req, res) => {
    
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
        
        let guardandoInformacion = await ProductModel(data)

        guardandoInformacion.save()

        res.status(201).json({msj:"producto creado exitosamente", guardandoInformacion})


    } catch (error) {
        console.error(error);
        
    }
}

export default AgregarProducto