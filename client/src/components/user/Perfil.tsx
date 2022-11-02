import { Link } from "react-router-dom";
// import { FaEdit} from "react-icons/fa";
import { useState} from "react";
import { useAppDispatch} from "../../app/hooks";
import useHeaders from "../../app/header";
import { updateUser } from "../slices/logIn";

const Perfil = () => {
  const user: any = JSON.parse(window.localStorage.getItem("user") || "{}");
  const token: string=JSON.parse(window.localStorage.getItem("token") || "");
  // const adminAuth = user.role[0].name === "admin" ? true : false;
  // const [iputsStates, setStateInputs]=useState({name:true})
  const dispatch=useAppDispatch();

  const img = user?.user_image.length
    ? user.user_image
    : "https://media.istockphoto.com/vectors/black-hipster-vector-mustache-vector-id485318064?k=20&m=485318064&s=170667a&w=0&h=krFPiCXz9kaEOS3gmFxGwYSOzTIxgOXqos7hEELiaTY=";

    const header=useHeaders(token);
    const [formUser, setFormUser]=useState(user)
    
    function fillFormUser(e:React.ChangeEvent<HTMLInputElement>){
      e.preventDefault();
      setFormUser({...formUser,[e.target.name]:e.target.value})
    }
    function submitUserInfo(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
      e.preventDefault();
      dispatch(updateUser(user._id,formUser,header))
    }
    
    return (
    <div className=" bg-white h-[100vh] justify-center bg-no-repeat ">
      <div className="z-10 w-[100vw] h-[30vh] bg-[#222222] flex justify-center">
      <Link className=" text-white" to="/">
        Home
      </Link>
      </div>

    
      <div>
        <div className=" -mt-40  md:p-10 border bg-white border-black rounded-xl h-full md:mx-40 my-auto">
          <div className="flex md:flex-row flex-col ">
            <div className=" grid  justify-items-stretch ">
              <img
                className="border border-black rounded-xl w-1/2 justify-self-center"
                src={img}
                alt="user pic"
              />
              <p className="justify-self-center font-bold">{formUser.email}</p>
            </div>

            <div className="grid justify-items-stretch md:w-2/3">
              <div className="border border-black rounded-xl w-full justify-self-center p-5">
                <h1 className=" text-center font-bold text-lg">
                  DATOS DE LA CUENTA
                </h1>
                <div className="w-5/6  justify-items-stretch">
                  <div className=" flex mt-5">
                  <input 
                  type="text" 
                  value={formUser.name} 
                  className="rounded-lg bg-red-100 mr-5 w-1/2 text-left p-1"
                  placeholder="Nombre"
                  name="name"
                  onChange={(e)=>fillFormUser(e)}
                  />
                  <input 
                  type="text" 
                  value={formUser.lastname} 
                  className="rounded-lg bg-red-100 mr-5 w-1/2 text-left p-1 "
                  placeholder="Apellido"
                  name="lastname"
                  onChange={(e)=>fillFormUser(e)}
                  />
                  </div>

                  <div className="mt-4">
                  <input 
                  type="text" 
                  value={formUser.email} 
                  className="rounded-lg bg-red-100 w-2/3 text-left p-1 "
                  placeholder="Email"
                  name="email"
                  onChange={(e)=>fillFormUser(e)}
                  />
                  </div>

                  <div className="mt-4 mb-5">
                    <input 
                    type="number" 
                    value={formUser.phone_number} 
                    className="rounded-lg bg-red-100 w-2/3 text-left p-1 "
                    placeholder="Teléfono"
                    name="phone_number"
                    onChange={(e)=>fillFormUser(e)}
                   />
                  </div>
                  <div className="grid justify-items-stretch">
                    <button 
                    className=" border border-black rounded-lg hover:bg-gray-200 p-1 mb-10 justify-self-center"
                    onClick={e=>submitUserInfo(e)}
                    >Actualizar Info</button>
                  </div>

                  <button>Cambiar Contraseña</button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20">
            <p>Ver mis compras</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
