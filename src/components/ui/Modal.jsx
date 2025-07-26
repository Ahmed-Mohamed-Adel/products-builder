import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const Modal = ({ isOpen, close, title, children, description }) => {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/25"
          aria-hidden="true"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-lg bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              {title && (
                <DialogTitle as="h3" className="text-base/7 font-medium ">
                  {title}
                </DialogTitle>
              )}
              {description && (
                <p className="text-sm text-gray-500 mt-3">{description}</p>
              )}
              <div className="mt-4">{children}</div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;
