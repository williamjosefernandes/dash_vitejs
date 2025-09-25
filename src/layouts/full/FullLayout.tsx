import { FC } from 'react';
import { Outlet } from "react-router";
import ScrollToTop from 'src/components/shared/ScrollToTop';
import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';



const FullLayout: FC = () => {
  return (
    <>
      <div className="flex w-full h-full dark:bg-darkgray">
        <div className="page-wrapper flex w-full h-full">
          {/* Header/sidebar */}
          <Sidebar />
          <div className="page-wrapper-sub flex flex-col w-full h-full dark:bg-darkgray">
            {/* Top Header  */}
            <Header />

            <div
              className={`bg-lightgray dark:bg-dark flex-1 rounded-bb`}
            >
              {/* Body Content  */}
              <div
                className={`w-full h-full`}
              >
                <ScrollToTop>
                  <div className="container py-30 h-full">
                    <Outlet />
                  </div>
                </ScrollToTop>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullLayout;
