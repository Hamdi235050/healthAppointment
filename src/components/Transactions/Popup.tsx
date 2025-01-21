import React from "react";
import { useStyles } from "./popupStyle";

export const Popup = ({
  isOpen,
  onClose,
  children,
  onConfirm,
  onCancel,
  variant,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  variant: string;
}) => {
  const classes = useStyles({ theme: { variant } });

  if (!isOpen) return null;

  return (
    <div className={classes.overlay} onClick={onClose}>
      <div className={classes.content} onClick={(e) => e.stopPropagation()}>
        <div className={classes.sidebar}></div>
        <div className={classes.body}>
          <button className={classes.closeButton} onClick={onClose}>
            &times;
          </button>
          {children}
          {(onConfirm || onCancel) && (
            <div className={classes.footer}>
              {onCancel && (
                <button
                  className={`${classes.button} cancel`}
                  onClick={onCancel}
                >
                  Annuler
                </button>
              )}
              {onConfirm && (
                <button
                  className={`${classes.button} confirm`}
                  onClick={onConfirm}
                >
                  Confirmer
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
