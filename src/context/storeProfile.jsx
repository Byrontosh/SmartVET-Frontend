import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";


const storeProfile = create((set) => ({
        
        user: null,
        setUser: (userData) => set({ user: userData }),
        clearUser: () => set({ user: null }),
        profile: async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem("auth-token"))
                const endpoint = storedUser.state.rol ==="veterinario"
                ? "perfil"
                : "paciente/perfil"
                const url = `${import.meta.env.VITE_BACKEND_URL}/${endpoint}`;
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${storedUser.state.token}`,
                    }
                }
            const respuesta = await axios.get(url, options)
            set({ user: respuesta.data })
        } catch (error) {
            console.error(error)
        }
        },
        updateProfile:async(data,id)=>{
            try {
                const storedUser = JSON.parse(localStorage.getItem("auth-token"))
                const url = `${import.meta.env.VITE_BACKEND_URL}/veterinario/${id}`
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${storedUser.state.token}`,
                    }
                }
                const respuesta = await axios.put(url, data,options)
                set({ user: respuesta.data })
                toast.success("Perfil actualizado correctamente")
            } catch (error) {
                console.log(error)
                toast.error(error.response?.data?.msg)
            }
        }
    })
)

export default storeProfile;
