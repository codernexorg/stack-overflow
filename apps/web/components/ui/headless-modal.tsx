import { useState } from "react";
import { Dialog } from "@headlessui/react";

interface HeadlessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: React.ReactElement;
  children: React.ReactNode;
}

export const HeadlessModal: React.FC<HeadlessModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => onClose()}
      className="relative z-50 w-full text-slate-800"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4 w-full">
        <Dialog.Panel className="mx-auto w-full max-w-6xl rounded bg-white p-4">
          <Dialog.Title className={"text-2xl font-semibold"}>
            {title}
          </Dialog.Title>
          <div>{description}</div>

          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
