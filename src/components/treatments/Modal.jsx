/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import storeTreatments from "../../context/storeTreatments";

const ModalTreatments = ({patientID}) => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { toggleModal, registerTreatments } = storeTreatments()

    const registerTreatmentsForm = (data) => {
        const newData = { ...data, paciente: patientID }
        registerTreatments(newData)
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">

            <div className="lg:w-2xl bg-gray-700 top-1/4 left-auto fixed sticky-0 rounded-lg overflow-y-scroll">

                <p className="text-white font-bold text-lg text-center mt-4">Tratamientos</p>

                <form className="p-10" onSubmit={handleSubmit(registerTreatmentsForm)}>
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-50">Nombre del tratamiento</label>
                        <input
                            type="text"
                            placeholder="Ingresa el nombre"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5 bg-gray-50"
                            {...register("nombre", { required: "El nombre es obligatorio" })}
                        />
                            {errors.nombre && <p className="text-red-800">{errors.nombre.message}</p>}
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-50">Descripción</label>
                        <textarea
                            type="text"
                            placeholder="Ingresa la descripción"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5 bg-gray-50"
                            {...register("descripcion", { required: "La descripción es obligatorio" })}
                        />
                            {errors.descripcion && <p className="text-red-800">{errors.descripcion.message}</p>}
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-50">Prioridad</label>
                        <select
                            id="prioridad"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5 bg-gray-50"
                            {...register("prioridad", { required: "La prioridad es obligatorio" })}
                        >
                            <option value="">--- Seleccionar ---</option>
                            <option value="Baja">Baja</option>
                            <option value="Media">Media</option>
                            <option value="Alta">Alta</option>
                        </select>
                            {errors.prioridad && <p className="text-red-800">{errors.prioridad.message}</p>}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-50">Precio</label>
                        <input
                            type="number"
                            step="any" 
                            placeholder="Ingresa el precio"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5 bg-gray-50"
                            {...register("precio", {
                                required: "El precio es obligatorio",
                                min: { value: 0, message: "El precio no puede ser negativo" }
                            })}
                        />
                        {errors.precio && <p className="text-red-800">{errors.precio.message}</p>}
                    </div>

                    <div className="flex justify-center gap-5">
                        <input
                            type="submit"
                            className="bg-green-700 px-6 text-slate-300 rounded-lg hover:bg-green-900 cursor-pointer"
                            value="Registrar"
                        />
                        <button className="sm:w-auto leading-3 text-center text-white px-6 py-4 rounded-lg bg-red-700 hover:bg-red-900"
                            onClick={() => { toggleModal() }}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalTreatments;
