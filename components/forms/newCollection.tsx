import axios from "axios";
import { useRef, useState, Fragment, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { FaPlus } from "react-icons/fa";
import { IUseState } from "../../types";
import { API_URL } from "../../lib/constants";

type ComponentProp = {
  eraId: number;
  isOpen: boolean;
  setIsOpen: IUseState<boolean>;
};
type Props = {
  name: string;
  imageId: number;
};
export default function NewCollectionForm({
  eraId,
  isOpen,
  setIsOpen,
}: ComponentProp) {
  const inputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [file, setFile] = useState<File | null>(null);
  //   let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const result = event.target?.result;
      if (result && typeof result === "string") imageRef.current!.src = result;
    };
  }, [file]);
  const onImageSelected = () => {
    const files = inputRef.current?.files;

    if (!files) return;
    setFile(files[0]);
  };

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<Props>();

  const onSubmit: SubmitHandler<Props> = async (values) => {
    try {
      await axios.post(
        `${API_URL}/collection/new`,
        {
          title: values.name,
          eraId,
        },
        { withCredentials: true }
      );
      closeModal();
    } catch (err) {
      setError("name", { message: "An Error Occurred" });
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-between"
                >
                  <p>Add New Collection</p>

                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </Dialog.Title>
                <div className="mt-2">
                  <div className="grid gap-2 justify-center content-center">
                    <form
                      className="grid gap-4 justify-center"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <input
                        type="text"
                        placeholder="Collection Name"
                        className="appearance-none rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-500 ring-2 ring-primary"
                        {...register("name")}
                      />
                      <input
                        id="image-btn"
                        type="file"
                        ref={inputRef}
                        placeholder="Selected Image"
                        onChange={onImageSelected}
                        accept="image/png, image/jpeg, image/jpg"
                        hidden
                      />

                      <button
                        type="submit"
                        className="bg-primary px-1 py-2 rounded shadow-md text-white"
                      >
                        Create
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
