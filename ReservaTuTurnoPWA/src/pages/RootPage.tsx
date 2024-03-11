import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <div className="max-w-7xl w-full">
        <div className="w-full max-w-[425px] mx-auto border">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Root;
