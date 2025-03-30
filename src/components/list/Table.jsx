import { MdDeleteForever, MdInfo, MdPublishedWithChanges } from "react-icons/md";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router'
import storeAuth from "../../context/storeAuth";

const Table = () => {

    const navigate = useNavigate()
    const { fetchDataBackend } = useFetch()
    const [patients, setPatients] = useState([])
    const { rol } = storeAuth()

    const listPatients = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/pacientes`
        const storedUser = JSON.parse(localStorage.getItem("auth-token"))
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedUser.state.token}`,
            }
        }
        const response = await fetchDataBackend(url, null, "GET", options.headers)
        setPatients(...patients, response)
    }


    const deletePatient = async (id) => {
        const confirmDelete = confirm("Vas registrar la salida del paciente, ¿Estás seguro?")
        if (confirmDelete) {
            const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/eliminar/${id}`
            const storedUser = JSON.parse(localStorage.getItem("auth-token"))
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedUser.state.token}`,
                }
            }
            const data = {
                salidaMascota: new Date().toString()
            }
            await fetchDataBackend(url, data, "DELETE", options.headers)
            setPatients((prevPatients) => prevPatients.filter(patient => patient._id !== id))
        }
    }


    useEffect(() => {
        listPatients()
    }, [])


    if (patients.length === 0) {
        return (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">No existen registros</span>
            </div>
        )
    }

    return (

        <table className="w-full mt-5 table-auto shadow-lg bg-white">
            <thead className="bg-gray-800 text-slate-400">
                <tr>
                    {["N°", "Nombre mascota", "Nombre propietario", "Email", "Celular", "Estado", "Acciones"].map((header) => (
                        <th key={header} className="p-2">{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {
                    patients.map((patient, index) => (
                        <tr className="hover:bg-gray-300 text-center"
                            key={patient._id}>
                            <td>{index + 1}</td>
                            <td>{patient.nombreMascota}</td>
                            <td>{patient.nombrePropietario}</td>
                            <td>{patient.emailPropietario}</td>
                            <td>{patient.celularPropietario}</td>
                            <td>
                                <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{patient.estadoMascota && "activo"}</span>
                            </td>
                            <td className='py-2 text-center'>
                                <MdInfo
                                    title="Más información"
                                    className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 hover:text-green-600"
                                    onClick={() => navigate(`/dashboard/visualizar/${patient._id}`)}
                                />

                                {
                                    rol === "veterinario" &&
                                    (
                                        <>
                                            <MdPublishedWithChanges
                                                title="Actualizar"
                                                className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 hover:text-blue-600"
                                                onClick={() => navigate(`/dashboard/actualizar/${patient._id}`)}
                                            />

                                            <MdDeleteForever
                                                title="Eliminar"
                                                className="h-7 w-7 text-red-900 cursor-pointer inline-block hover:text-red-600"
                                                onClick={() => { deletePatient(patient._id) }}
                                            />
                                        </>
                                    )
                                }
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Table
