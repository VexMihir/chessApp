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
        <div className="fixed z-[10000] w-full h-full top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center text-red-600 bg-[rgba(0,0,0,0.534)]">
          <div className="p-3 fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[350px] text-2xl bg-custom-cream rounded-md shadow">
            <h3 className="m-0 py-2">Message Dialog</h3>
            <div className="text-xl">{children}</div>

            {isOneOption === false ? (
              <div className="py-2">
                {/* Source: https://v1.tailwindcss.com/components/buttons */}
                <button
                  className="w-[140px] text-2xl bg-custom-black hover:bg-yellow-300 text-yellow-400 font-bold hover:text-custom-black py-1 px-3 mx-2 rounded-md rounded"
                  onClick={onCloseDeclined}
                >
                  No
                </button>
                <button
                  className="w-[140px] text-2xl bg-custom-black hover:bg-yellow-300 text-yellow-400 font-bold hover:text-custom-black py-1 px-3 mx-2 rounded-md rounded"
                  onClick={onOutcomeModalOpen}
                >
                  Yes
                </button>
              </div>
            ) : (
              <div className="py-2">
                {/* Source: https://v1.tailwindcss.com/components/buttons */}
                <button
                  className="w-[80px] text-2xl bg-custom-black hover:bg-yellow-300 text-yellow-400 font-bold hover:text-custom-black py-1 px-3 mx-2 rounded-md rounded"
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
