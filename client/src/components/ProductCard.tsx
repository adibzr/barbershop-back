import { Link } from "react-router-dom";

type Props = {
  nombre: string;
  precio: number;
  rating: any;
  imagen?: string;
};

const ProductCard = ({ nombre, precio, rating, imagen }: Props) => {
  return (
    <div className=" flex bg-slate-200/50 m-4 rounded-lg max-w-3xl max-h-40 relative">
      <div className=" h-full w-2/5 mr-4 rounded-lg object-center">
        <img
          className="h-32 m-4 object-cover bg-white rounded-xl "
          src={imagen}
          alt="product"
        />
      </div>
      <div className="p-4 flex flex-col justify-between font-sans text-[#000300] ">
        <h3>{nombre}</h3>
        <h2 className="font-medium text-2xl">${precio}</h2>
        <div>{rating}</div>
      </div>
      <Link to={`/product/${nombre}`}>
        <button className="absolute right-0 bottom-0 m-4">Ver más</button>
      </Link>
    </div>
  );
};

export default ProductCard;