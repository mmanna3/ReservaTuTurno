import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>      
      <div className="max-w-7xl">
        <div className="absolute text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Root;
