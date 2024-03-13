import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <div className="w-full font-roboto">
        <div className="w-full max-w-[425px] mx-auto border-x">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Root;
