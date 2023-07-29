import React from "react";
import ReactDOM from "react-dom";

export default function MessageModal({
  isOpen,
  onCloseDeclined,
  onCloseRescinded,
  onOutcomeModalOpen,
  children,
  isOneOption,
  onOk
}) {
  if (!isOpen) {
    return null;
  } else {
    return ReactDOM.createPortal(
      <>
        <div className="fixed z-[10000] w-full h-full top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center text-black bg-[rgba(0,0,0,0.534)]">
          <div className="p-3 fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[500px] text-2xl bg-[rgb(255,255,255)] shadow">
            <h3 className="m-0 py-2">Message Dialog</h3>
            <div className="text-xl">{children}</div>

            {isOneOption === false ? (
              <div className="py-2">
                {/* Source: https://v1.tailwindcss.com/components/buttons */}
                <button
                  className="w-[140px] text-2xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 mx-2 border border-blue-500 hover:border-transparent rounded"
                  onClick={onCloseDeclined}
                >
                  Declined
                </button>
                <button
                  className="w-[140px] text-2xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 mx-2 border border-blue-500 hover:border-transparent rounded"
                  onClick={onCloseRescinded}
                >
                  Rescined
                </button>
                <button
                  className="w-[140px] text-2xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 mx-2 border border-blue-500 hover:border-transparent rounded"
                  onClick={onOutcomeModalOpen}
                >
                  Yes
                </button>
              </div>
            ) : (
              <div className="py-2">
                {/* Source: https://v1.tailwindcss.com/components/buttons */}
                <button
                  className="w-[80px] text-2xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 mx-2 border border-blue-500 hover:border-transparent rounded"
                  onClick={onOk}
                >
                  Ok
                </button>
              </div>
            )}
          </div>
        </div>
      </>,

      document.getElementById("modal")
    );
  }
}
