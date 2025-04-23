import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import CustomizedModal from "../ui/CustomizedModal";

const WaterSystemRootLayoutPage = (props) => {
  const [modal, setModal] = useState(null);

  return (
    <section className="w-full">
      {modal && (
        <CustomizedModal
          title={modal?.title}
          message={modal?.message}
          onCancel={modal?.onCancel || (() => setModal(null))}
          onContinue={modal?.onContinue}
          size={modal?.size}
          askConfirmation={modal?.askConfirmation}
          continueButtonName={modal?.continueButtonName}
          cancelButtonName={modal?.cancelButtonName}
          modalButtonName={modal?.modalButtonName}
          isButtonDisable={modal?.isButtonDisable}
          content={modal?.content}
        />
      )}
      <section className="my-8 text-primary w-full">
        <Outlet
          context={{
            setModal,
          }}
        />
      </section>
    </section>
  );
};
export default WaterSystemRootLayoutPage;
