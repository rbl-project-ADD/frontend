// Layout.js
import Sidebar from "@/components/SideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <div className="flex">
                <Sidebar />
                <main className="flex-1 ml-[18rem]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
