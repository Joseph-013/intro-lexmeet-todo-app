import React, { useState } from "react";
import { createPortal } from "react-dom";

type BootstrapModalPropType = {
  posAction?: (setVisible: React.Dispatch<React.SetStateAction<boolean>>) => void;
  negAction?: (setVisible: React.Dispatch<React.SetStateAction<boolean>>) => void;
  posActionName?: string;
  negActionName?: string;
  trigger: {
    className?: string;
    children: React.ReactNode;
  };
  title?: string;
  children?: React.ReactNode;
};

function BootstrapModal(props: BootstrapModalPropType) {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };

  return (
    <>
      <button type="button" className={`${props.trigger?.className || "btn btn-primary"}`} onClick={toggleVisibility}>
        {props.trigger.children}
      </button>

      {visible &&
        createPortal(
          <>
            <div className={`modal fade show d-block`} tabIndex={-1} role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  {props.title && (
                    <div className="modal-header">
                      <h1 className="modal-title fs-5">{props.title}</h1>
                      <button type="button" className="btn-close" onClick={toggleVisibility}></button>
                    </div>
                  )}

                  {props?.children && <div className="modal-body">{props.children}</div>}

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={toggleVisibility}>
                      Close
                    </button>
                    {props.negAction && (
                      <button type="button" className="btn btn-danger" onClick={() => props.negAction?.(setVisible)}>
                        {props?.negActionName || "No"}
                      </button>
                    )}
                    {props.posAction && (
                      <button type="button" className="btn btn-primary" onClick={() => props.posAction?.(setVisible)}>
                        {props?.posActionName || "Yes"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-backdrop fade show" onClick={toggleVisibility}></div>
          </>,
          document.body
        )}
    </>
  );
}

export default BootstrapModal;
