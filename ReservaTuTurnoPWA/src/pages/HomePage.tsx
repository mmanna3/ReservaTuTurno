// const selections = {
//   title: ["Mr.", "Mrs.", "Ms.", "Dr."],
//   firstName: ["John", "Micheal", "Elizabeth"],
//   lastName: ["Lennon", "Jackson", "Jordan", "Legend", "Taylor"],
// };

import ContenedorCentradoConMargenes from "../components/ContenedorCentradoConMargenes";
import ModalPicker from "./ModalPicker";

const Home = () => {
  //   const [pickerValue, setPickerValue] = useState({
  //     title: "Mr.",
  //     firstName: "Micheal",
  //     lastName: "Jordan",
  //   });

  return (
    <ContenedorCentradoConMargenes>
      <ModalPicker />
      {/* <div className="flex h-full flex-col items-center justify-center">
        <img src={FrambuesaIcono} alt="Frambuesa" width="60" height="60" />
        <h1 className="mb-2 mt-4 text-3xl font-bold tracking-wide text-rosaoscuro">
          Frambuesa
        </h1>
        <p className="text-sm">Gestioná tus turnos</p>
      </div> */}
    </ContenedorCentradoConMargenes>
  );
};

export default Home;
