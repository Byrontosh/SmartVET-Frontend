/* eslint-disable react/prop-types */
import { MdDeleteForever, MdAttachMoney  } from "react-icons/md"
import storeTreatments from "../../context/storeTreatments"
import storeAuth from "../../context/storeAuth"


const TableTreatments = ({treatments,listPatient}) => {

    const { deleteTreatments } = storeTreatments()
    const { rol } = storeAuth()

    const handleDelete = async (id) => {
        deleteTreatments(id)
        listPatient()
    }


    return (
        <table className='w-full mt-5 table-auto shadow-lg  bg-white'>
            <thead className='bg-gray-800 text-slate-400'>
                <tr>
                    <th className='p-2'>N°</th>
                    <th className='p-2'>Nombre</th>
                    <th className='p-2'>Descripción</th>
                    <th className='p-2'>Prioridad</th>
                    <th className='p-2'>Precio</th>
                    <th className='p-2'>Estado pago</th>
                    <th className='p-2'>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    treatments.map((treatment, index) => (
                        <tr className="hover:bg-gray-300 text-center" key={treatment.id || index}>
                            <td>{index + 1}</td>
                            <td>{treatment.nombre}</td>
                            <td>{treatment.descripcion}</td>
                            <td>{treatment.prioridad}</td>
                            <td>$ {treatment.precio}</td>
                            <td className={treatment.estadoPago === 'Pagado' ? 'text-green-500 text-sm' : 'text-red-500 text-sm'}>{treatment.estadoPago}</td>
                            
                            <td className='py-2 text-center'>

                            <MdAttachMoney 
                                className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 hover:text-green-600"
                                title="Pagar"/>
                            {
                                rol==="veterinario" && 
                                (
                                    <MdDeleteForever
                                        className={treatment.estadoPago==="Pagado" ? "h-8 w-8 text-gray-500 pointer-events-none inline-block" :"h-8 w-8 text-red-900 cursor-pointer inline-block hover:text-red-600"}
                                        title="Eliminar"
                                        onClick={() => { handleDelete(treatment._id) }}
                                    />
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

export default TableTreatments