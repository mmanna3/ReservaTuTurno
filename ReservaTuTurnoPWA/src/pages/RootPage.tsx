import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Footer from "../ui/footer";
import { Header } from "../ui/header";

const Root = () => {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="w-full font-roboto">
        <div className="mx-auto w-full max-w-[425px]">
          <div className="grid h-screen grid-rows-[auto_1fr_auto]">
            <Header />
            <main className="overflow-auto text-negro">
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Root;
