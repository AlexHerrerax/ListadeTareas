import React, { useEffect, useState } from 'react'
import {firebase} from '../firebase'










const ListaTareas = () => {

const [tareas, setTareas] = useState([])


    useEffect(() => {

        const obtenerDatos = async () =>{
            try {

                const db= firebase.firestore()
                const data = await db.collection('Lista de tareas').get()
                console.log(data.docs);

                const arrayData = data.docs.map(doc => ({id: doc.id,  ...doc.data()}))
                console.log(arrayData);
                setTareas(arrayData)
                setLista(arrayData)

                
            } catch (error) {
                console.log(error);
            }
        }
        
        obtenerDatos();
        
    }, [])












    const [tarea, setTarea] = useState("");
    const [lista, setLista] = useState([]);
    const [contador, setContador] = useState(0)
    const [estadoEditar, setEstadoEditar] = useState(false)
    const [unicoId, setUnicoId] = useState(0)
    const [error, setError] = useState(false)


    const enviarDatos = async (e) => {

        e.preventDefault();
        if (!tarea.trim()) {
            setError(true)
            return;
        }

        try {

            const db = firebase.firestore();
            const nuevaTarea = {nombreTarea: tarea}

            const data = await db.collection('Lista de tareas').add(nuevaTarea)
            
        } catch (error) {
            console.log(error);
        }

        setContador(contador + 1)
        setLista([...lista, { id: contador, nombreTarea: tarea }]);
        setTarea("")
        setError(false)
    }

    const eliminar = async (id) => {
        console.log(id);

        try {
            

            const db = firebase.firestore();
            await db.collection('Lista de tareas').doc(id).delete()


        } catch (error) {
            console.log(error);
        }


        const eliminado = lista.filter(item => item.id !== id)
        setLista(eliminado)
    }

    const editar = (item) => {
        setEstadoEditar(true);
        setTarea(item.nombreTarea)
        setUnicoId(item.id)
        setError(false)
    }

    const cambio = async (e) => {
        e.preventDefault();
        if (!tarea.trim()) {
            setError(true)
            return;
        }

        try {
            

            const db = firebase.firestore();
            await db.collection('Lista de tareas').doc(unicoId).update({nombreTarea: tarea})


        } catch (error) {
            console.log(error);
        }





        const cambiar = lista.map((item) => (
            item.id === unicoId ? { id: unicoId, nombreTarea: tarea } : item
        ))
        setLista(cambiar)
        setEstadoEditar(false);
        setTarea("");
        setError(false)
    }

    const eliminarTodo = () =>{
        setLista([]);
        setTarea("");
    }

    return (
        <>
            <div className="container mt-3">
                <h2 className="text-center mb-3">Crud de Tareas</h2>
                <div className="row">
                    {/*  LISTA DE TAREAS */}
                    <div className="col-7 border">
                        <h3 className="text-center">Lista de Tareas</h3>
                        <ul className="list-group">
                            {
                                lista.length === 0 ?
                                    (<span className="lead border p-1 mt-2">No hay tareas</span>)
                                    :
                                    <>
                                        <button className="btn btn-"></button>
                                        {
                                            lista.map((item, index) => (
                                                <li key={index} className="list-group-item mt-2">
                                                    <span className="lead">{item.nombreTarea}</span>
                                                    <button className="btn btn-danger float-end mx-1" onClick={() => eliminar(item.id)}>Eliminar</button>
                                                    <button className="btn btn-warning float-end mx-2" onClick={() => (editar(item))}>Editar</button>
                                                </li>
                                            ))
                                        }
                                        <button type="button" className="btn btn-danger mt-5" data-bs-toggle="modal" data-bs-target="#eliminarTodo">
                                            Eliminar todo
                                        </button>
                                    </>
                            }
                        </ul>
                    </div>
                    {/* AGREGAR TAREAS */}
                    <div className="col-5 border">
                        {
                            estadoEditar === false
                                ?
                                <>
                                    <h3 className="text-center">Agregar tarea</h3>
                                    {
                                        error ? <span className="text-danger">Campo vacio</span> : false
                                    }
                                    <form onSubmit={enviarDatos}>
                                        <div className="contenedor">
                                            <input
                                                type="text"
                                                className="form-control mt-3"
                                                onChange={(e) => setTarea(e.target.value)}
                                                value={tarea}
                                            />
                                            <button type="submit" className="btn btn-primary mt-3">Agregar</button>
                                        </div>
                                    </form>
                                </>
                                :
                                <>
                                    <h3 className="text-center">Editar tarea</h3>
                                    {
                                        error ? <span className="text-danger">Campo vacio</span> : false
                                    }
                                    <form>
                                        <div className="contenedor">
                                            <input
                                                type="text"
                                                className="form-control mt-3"
                                                onChange={(e) => setTarea(e.target.value)}
                                                value={tarea}
                                            />
                                            <button type="submit" className="btn btn-success mt-3" onClick={(e) => cambio(e)}>Aceptar</button>
                                        </div>
                                    </form>
                                </>
                        }
                    </div>
                </div>
            </div>

            <div className="modal fade" id="eliminarTodo" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Eliminar Todo</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {
            lista.length<2 ? "Esta accion afectara a la tarea en lista. ¿Esta seguro de continuar?  " :`Esta accion afectara a ${lista.length} tareas en lista. ¿Esta seguro que desea continuar?`
        }
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-danger" onClick={eliminarTodo} data-bs-dismiss="modal">Aceptar</button>
      </div>
    </div>
  </div>
</div>

        </>
    )
}

export default ListaTareas
