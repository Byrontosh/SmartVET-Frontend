/* eslint-disable react/prop-types */
import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router";
import generateAvatar from "../../helpers/consultarDalle";


export const Form = ({patient}) => {

    const [stateAvatar, setStateAvatar] = useState({
        generatedImage: "https://cdn-icons-png.flaticon.com/512/2138/2138440.png",
        prompt: "",
        loading: false
    })

    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, setValue, watch,reset} = useForm()
    const { fetchDataBackend } = useFetch()


    const selectedOption = watch("imageOption")

    const convertBlobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
        })
    }

    
    const handleGenerateImage = async () => {
        setStateAvatar(prev => ({ ...prev, loading: true }))
        const response = await generateAvatar({ prompt: stateAvatar.prompt })
        if (response.type === "image/jpeg") {
            const imageUrl = URL.createObjectURL(response)
            const base64Image = await convertBlobToBase64(response)
            console.log(base64Image)
            setStateAvatar(prev => ({ ...prev, generatedImage: imageUrl, loading: false }))
            setValue("avatarMascotaIA", base64Image)
        }
        else {
            toast.error("Error al generar la imagen, vuelve a intentarlo dentro de 1 minuto");
            setStateAvatar(prev => ({ ...prev, generatedImage: "https://cdn-icons-png.flaticon.com/512/2138/2138440.png", loading: false }))
            setValue("avatarMascotaIA", stateAvatar.generatedImage)
        }
    }


    const registerPatient = async (data) => {
        console.log(data);
        const formData = new FormData()
        Object.keys(data).forEach((key) => {
            if (key === "imagen") {
                formData.append("imagen", data.imagen[0])
            } else {
                formData.append(key, data[key]);
            }
        })
        let url = `${import.meta.env.VITE_BACKEND_URL}/paciente/registro`
        const storedUser = JSON.parse(localStorage.getItem("auth-token"))
        const options = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${storedUser.state.token}`,
            }
        }
        let response
        if (patient?._id) {
            url = `${import.meta.env.VITE_BACKEND_URL}/paciente/actualizar/${patient._id}`
            response = await fetchDataBackend(url, formData, "PUT", options.headers)
        }
        else{
            response = await fetchDataBackend(url, formData, "POST", options.headers)
        }
        if (response) {
            setTimeout(() => {
                navigate("/dashboard/listar")
            }, 1500);
        }
    }

    useEffect(() => {
        if (patient) {
            reset({
                cedulaPropietario: patient?.cedulaPropietario,
                nombrePropietario: patient?.nombrePropietario,
                emailPropietario: patient?.emailPropietario,
                celularPropietario: patient?.celularPropietario,
                nombreMascota: patient?.nombreMascota,
                tipoMascota: patient?.tipoMascota,
                fechaNacimientoMascota: new Date(patient?.fechaNacimientoMascota).toLocaleDateString('en-CA', {timeZone: 'UTC'}),
                sintomasMascota: patient?.sintomasMascota,
            })
        }
    }, [])

    

    return (
        <form onSubmit={handleSubmit(registerPatient)}>
            <ToastContainer />

            {/* Información del propietario */}
            <fieldset className="border-2 border-gray-500 p-6 rounded-lg shadow-lg">
                <legend className="text-xl font-bold text-gray-700 bg-gray-200 px-4 py-1 rounded-md">
                    Información del propietario
                </legend>

                {/* Cédula */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Cédula</label>
                    <div className="flex items-center gap-10 mb-5">
                        <input
                            type="number"
                            placeholder="Ingresa la cédula"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                            {...register("cedulaPropietario", { required: "La cédula es obligatoria" })}
                        />
                        <button className="py-1 px-8 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white sm:w-80"
                        disabled={patient}
                        >
                            Consultar
                        </button>
                    </div>
                    {errors.cedulaPropietario && <p className="text-red-800">{errors.cedulaPropietario.message}</p>}
                </div>

                {/* Nombre completo */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Nombres completos</label>
                    <input
                        type="text"
                        placeholder="Ingresa nombre y apellido"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                        {...register("nombrePropietario", { required: "El nombre completo es obligatorio" })}
                    />
                    {errors.nombrePropietario && <p className="text-red-800">{errors.nombrePropietario.message}</p>}
                </div>

                {/* Correo electrónico */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Correo electrónico</label>
                    <input
                        type="email"
                        placeholder="Ingresa el correo electrónico"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                        {...register("emailPropietario", { required: "El correo electrónico es obligatorio" })}
                    />
                    {errors.emailPropietario && <p className="text-red-800">{errors.emailPropietario.message}</p>}
                </div>

                {/* Celular */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Celular</label>
                    <input
                        type="number"
                        placeholder="Ingresa el celular"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                        {...register("celularPropietario", { required: "El celular es obligatorio" })}
                    />
                    {errors.celularPropietario && <p className="text-red-800">{errors.celularPropietario.message}</p>}
                </div>
            </fieldset>

            {/* Información de la mascota */}
            <fieldset className="border-2 border-gray-500 p-6 rounded-lg shadow-lg mt-10">
                <legend className="text-xl font-bold text-gray-700 bg-gray-200 px-4 py-1 rounded-md">
                    Información de la mascota
                </legend>

                {/* Nombre de la mascota */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Nombre</label>
                    <input
                        type="text"
                        placeholder="Ingresar nombre"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                        {...register("nombreMascota", { required: "El nombre de la mascota es obligatorio" })}
                    />
                    {errors.nombreMascota && <p className="text-red-800">{errors.nombreMascota.message}</p>}
                </div>

                {/* Imagen de la mascota*/}
                <label className="mb-2 block text-sm font-semibold">Imagen de la mascota</label>
                <div className="flex gap-4 mb-2">
                    {/* Opción: Imagen con IA */}
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="ia"
                            {...register("imageOption",{ required: !patient && "El nombre de la mascota es obligatorio"})}
                            disabled={patient}
                        />
                        Generar con IA
                    </label>

                    {/* Opción: Subir Imagen */}
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="upload"
                            {...register("imageOption",{ required: !patient && "El nombre de la mascota es obligatorio"})}
                            disabled={patient}
                        />
                        Subir Imagen
                    </label>
                </div>
                {errors.imageOption && <p className="text-red-800">{errors.imageOption.message}</p>}

                {/* Imagen con IA */}
                {selectedOption === "ia" && (
                    <div className="mt-5">
                        <label className="mb-2 block text-sm font-semibold">Imagen con IA</label>
                        <div className="flex items-center gap-10 mb-5">
                            <input
                                type="text"
                                placeholder="Ingresa el prompt"
                                className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                                value={stateAvatar.prompt}
                                onChange={(e) => setStateAvatar(prev => ({ ...prev, prompt: e.target.value }))}
                            />
                            <button
                                type="button"
                                className="py-1 px-8 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white sm:w-80"
                                onClick={handleGenerateImage}
                                disabled={stateAvatar.loading}
                            >
                                {stateAvatar.loading ? "Generando..." : "Generar con IA"}
                            </button>
                        </div>
                        {stateAvatar.generatedImage && (
                            <img src={stateAvatar.generatedImage} alt="Avatar IA" width={100} height={100} />
                        )}
                    </div>
                )}

                {/* Subir Imagen */}
                {selectedOption === "upload" && (
                    <div className="mt-5">
                        <label className="mb-2 block text-sm font-semibold">Subir Imagen</label>
                        <input
                            type="file"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                            {...register("imagen")}
                        />
                    </div>
                )}

                {/* Tipo de mascota */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Tipo</label>
                    <select
                        id='prioridad'
                        className='block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5'
                        {...register("tipoMascota", { required: "El tipo de la mascota es obligatorio" })}
                    >
                        <option value="">--- Seleccionar ---</option>
                        <option value="gato">Gato</option>
                        <option value="perro">Perro</option>
                        <option value="otro">Otro</option>
                    </select>
                    {errors.tipoMascota && <p className="text-red-800">{errors.tipoMascota.message}</p>}
                </div>

                {/* Fecha de nacimiento */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Fecha de nacimiento</label>
                    <input
                        type="date"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                        {...register("fechaNacimientoMascota", { required: "La fecha de nacimiento de la mascota es obligatorio" })}
                    />
                    {errors.fechaNacimientoMascota && <p className="text-red-800">{errors.fechaNacimientoMascota.message}</p>}
                </div>

                {/* Síntomas */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Síntomas</label>
                    <textarea
                        placeholder="Ingresa los síntomas"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                        {...register("sintomasMascota", { required: "El síntoma de la mascota es obligatorio" })}
                    />
                    {errors.sintomasMascota && <p className="text-red-800">{errors.sintomasMascota.message}</p>}
                </div>
            </fieldset>

            {/* Botón de submit */}
            <input
                type="submit"
                className="bg-gray-800 w-full p-2 mt-5 text-slate-300 uppercase font-bold rounded-lg 
                hover:bg-gray-600 cursor-pointer transition-all"
                value={patient ? "Actualizar" : "Registrar"}
            />
        </form>

    )
}