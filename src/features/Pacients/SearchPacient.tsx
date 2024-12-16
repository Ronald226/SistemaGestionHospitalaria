import './SearchPacient.css'
import React,{ useState, useEffect } from "react";

import {pacient_search_dni, pacient_search_name } from "../../services/Pacients/Pacients"
import { useForm, SubmitHandler } from 'react-hook-form'

import { Tabla_list_pacients,Tabla_list_pacients_all_modal } from './ListPacient';
import { useLocation } from "react-router-dom";
import { pacientsProps } from './InterfacePacients';
import {ControlsModuls} from '../layaout/ControlsModuls';

// Tipos de las props
interface Option {
    value: string;
    label: string;
  }
  
interface SelectComponentProps {
options: Option[]; // Opciones del select con tipo definido
defaultValue: string; // Valor predeterminado
}
  
  
const SelectComponent: React.FC<SelectComponentProps> = ({ options, defaultValue }) => {
    const [selectedOption, setSelectedOption] = useState<string>(defaultValue);
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

        // Lógica para determinar qué componente mostrar
    const renderSelectedComponent = () => {
        switch (selectedOption) {
        case 'option1':
            return <SearchPacientByDNI />;
        case 'option2':
            return <SearchPacientByName />;
        default:
            return <div>No component selected</div>;
        }
    };
    return (
        <div>
            <label htmlFor="custom-select">Escoge una Opcion</label>
            <select
            id="custom-select"
            value={selectedOption}
            onChange={handleChange}
            style={{ margin: '0.5rem', padding: '0.5rem' }}
            >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                {option.label}
                </option>
            ))}
            </select>

            <div style={{ marginTop: '1rem' }}>
            <h2>Selected Component:</h2>
            {renderSelectedComponent()}
            </div>
        </div>
        );
    };
const SearchPacient: React.FC = () => {
    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
    ];
    return (
        <>
        
        <ControlsModuls></ControlsModuls>
        <main className='main'>
            <SelectComponent options={options} defaultValue="option1" />
            {/* <SearchPacientByDNI ></SearchPacientByDNI> */}
            {/* <SearchPacientByName></SearchPacientByName> */}
        </main>
        </>
    )
}
interface ISearchDNIForm {
    dni: number;
}

const SearchPacientByDNI:React.FC=() => {
    const {register, handleSubmit, formState: { errors } } = useForm<ISearchDNIForm>();
    const location = useLocation();
    const [msg, setText] = useState<string>("");
    const [pacients, setPacients] = useState<pacientsProps|pacientsProps[]>([]); // Almacena la lista de pacientes
    const [RefreshList,setRefreshList] = useState<number>(0);
    const [busqueda,setBusqueda] = useState<ISearchDNIForm>({dni:10000000 })

    let dni:any;
    // Función para obtener la lista de pacientes
    const fetchPacientsByDNI: SubmitHandler<ISearchDNIForm> = async (data) => {
        dni=location.state?.respuesta
        console.log(dni)
        console.log(data)
        console.log("ddd"+data)
        console.log(RefreshList)
        if(dni==undefined && data==undefined){
            return 0
        }
        if(data!=undefined){
            dni=data.dni
        }
        const respon:any = await pacient_search_dni(dni);
        if (respon) {
            setBusqueda({dni:dni});
            console.log("Datos obtenidos con éxito:", data);
            setPacients(respon); // Almacena los pacientes en el estado
            setText(""); // Limpia cualquier mensaje
            console.log(respon);
            console.log("Tamaño del array"+respon.length);
        } else {
            console.log("Error al obtener los datos.");
            setPacients([]);
            setText("");
        }
    }
    useEffect(() => {
        if (RefreshList > 0) { // Evita llamadas innecesarias al cargar el componente
            fetchPacientsByDNI(busqueda);
            // console.log("refresh funcionando")
        }
    },[RefreshList]);
    
    return (
        <>
        <div className='contenedor-form-search'>
        <form onSubmit={handleSubmit(fetchPacientsByDNI)} className="form-inline my-2 my-lg-0 d-flex flex-row h-25 justify-content-around" >
            <input className="flex-fill w-50 form-control mr-sm-2" type="search" placeholder="Search-DNI" aria-label="Search"
                {...register("dni", {
                    required: "Campo es requerido",
                    minLength: {
                        value: 8,
                        message: "No es un dni valido."
                        },
                    validate: {
                        onlyNumbers: (value:any) =>
                            /^\d+$/.test(value) || "El dni debe contener solo números."
                    }
                })}
            />
            <button className="flex-fill w-25 btn btn-success my-2 my-sm-0" type="submit">Buscar por DNI</button>
            {errors.dni && <p>{errors.dni.message}</p>}
        </form>
        </div>
        <Tabla_list_pacients_all_modal pacients={pacients} msg={msg} setRefreshList={setRefreshList} from={'/patients/search'}></Tabla_list_pacients_all_modal>
        {/* <Tabla_list_pacients pacients={pacients} msg={msg} setRefreshList={setRefreshList} from={'/patients/search'} ></Tabla_list_pacients> */}
        </>
    )
}
interface ISearchNameForm {
    nombres: String
    apellidos: String
}

const SearchPacientByName:React.FC=() => {
    const {register, handleSubmit, formState: { errors } } = useForm<ISearchNameForm>();
    const location = useLocation();
    const [msg, setText] = useState<String>("");
    const [pacients, setPacients] = useState<pacientsProps|pacientsProps[]>([]); // Almacena la lista de pacientes
    const [RefreshList,setRefreshList] = useState<number>(0);
    const [busqueda,setBusqueda] = useState<ISearchNameForm>({nombres:"",apellidos:""})
    location.state?.data()
    // Función para obtener la lista de pacientes
    const fetchPacientsByName: SubmitHandler< ISearchNameForm > = async (data) => {
        
        let nombres:String="";
        let apellidos:String="";
        
        if(data==undefined){
            return 0
        }

        if(data!=undefined){
            console.log("Aqui")
            console.log(busqueda)
            console.log(data)
            console.log(nombres)
            console.log(apellidos)
            nombres=data.nombres;
            apellidos=data.apellidos;
        }
        const respon:any = await pacient_search_name(nombres,apellidos);
        if (respon) {
            
            setBusqueda({nombres:nombres,apellidos:apellidos});

            console.log("Datos obtenidos con éxito:", data);
            setPacients(respon); // Almacena los pacientes en el estado
            setText(""); // Limpia cualquier mensaje
            console.log(respon);
            console.log("Tamaño del array"+respon.length);
        } else {
            console.log("Error al obtener los datos.");
            setPacients([]);
            setText("");
        }
    }
  
    useEffect(() => {
        if (RefreshList > 0) { // Evita llamadas innecesarias al cargar el componente
            fetchPacientsByName(busqueda);
            console.log("Se esta refrescando")
        }
    },[RefreshList]);
    
    return (
        <>
        <div className='contenedor-form-search'>
        <form onSubmit={handleSubmit(fetchPacientsByName)} className="form-inline my-2 my-lg-0 d-flex flex-row h-25 justify-content-around" >
            <input className="flex-fill w-50 form-control mr-sm-2" type="text" placeholder="Search-Nombres" aria-label="Search"
                {...register("nombres", {
                    
                    
                    validate: {
                        
                    }
                })}
            />
            <input className="flex-fill w-50 form-control mr-sm-2" type="text" placeholder="Search-Apellidos" aria-label="Search"
                {...register("apellidos", {
                   
                    
                    validate: {
                        
                    }
                })}
            />
            <button className="flex-fill w-25 btn btn-success my-2 my-sm-0" type="submit">Buscar por Nombres y Apellidos</button>
            {errors.nombres && <p>{errors.nombres.message}</p>}
        </form>
        </div>
        <Tabla_list_pacients_all_modal pacients={pacients} msg={msg} setRefreshList={setRefreshList} from={'/patients/search'}></Tabla_list_pacients_all_modal>
        </>
    )
}
export default SearchPacient;