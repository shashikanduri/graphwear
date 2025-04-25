import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { Outlet } from "react-router-dom";
import CustomizedModal from "../ui/CustomizedModal";
import { db } from "../../firebase";

const WaterSystemRootLayoutPage = (props) => {
  const [modal, setModal] = useState(null);
  const [users, setAllUsers] = useState([])

  useEffect(() => {
    const unsubscribeAllUsers = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const allUsers = new Set();
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.user_name) {
            allUsers.add(data.user_name);
          }
        });
        setAllUsers(Array.from(allUsers));
      },
      (error) => {
        console.error("Error fetching all users:", error);
      }
    );
  
    return () => {
      if (unsubscribeAllUsers) unsubscribeAllUsers();
    };
  }, []);

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
            users
          }}
        />
      </section>
    </section>
  );
};
export default WaterSystemRootLayoutPage;
