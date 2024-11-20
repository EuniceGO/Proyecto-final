import express from "express";
import AgregarProducto from "../controllers/agregar.productos.js";
import ObteniendoTodosLosProductos from "../controllers/ver-todos-productos.js";
import BorrandoProducto from "../controllers/delete.productos.js";
import ActualizarProducto from "../controllers/actualizando.producto.js";

const rutasDeLosProductos = express.Router();

/**
 * @swagger
 * /crear-producto:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               disponibilidad:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Todos los campos son requeridos
 */
rutasDeLosProductos.post("/crear-producto", AgregarProducto);

/**
 * @swagger
 * /obtener-productos:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 */
rutasDeLosProductos.get("/obtener-productos", ObteniendoTodosLosProductos);

/**
 * @swagger
 * /borrar-productos/{id}:
 *   delete:
 *     summary: Elimina un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       400:
 *          description: El id para borrar el producto es requerido
 *       500:
 *         description: Error al borrar el producto
 */
rutasDeLosProductos.delete("/borrar-productos/:id", BorrandoProducto);

/**
 * @swagger
 * /actualizar-productos/{id}:
 *   put:
 *     summary: Actualiza un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               disponibilidad:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       500:
 *         description: Error al actualizar el producto
 */
rutasDeLosProductos.put("/actualizar-productos/:id", ActualizarProducto);

export default rutasDeLosProductos;
