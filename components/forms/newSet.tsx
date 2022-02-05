import axios from "axios";
import { useRef, useState, Fragment, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { FaPlus } from "react-icons/fa";
import { IUseState } from "../../lib/types";
import Select from "react-select";

type ComponentProp = {
  collectionId: number;

  members: any[];
};
type Props = {
  title: string;
};
export default function NewSetForm({ collectionId, members }: ComponentProp) {
  const inputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [file, setFile] = useState<File | null>(null);
  let [isOpen, setIsOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

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
      // Upload File
      console.log("Coaut");

      const form = new FormData();
      if (!file) {
        setError("title", { message: "No Image Selected" });
        return;
      }

      if (members.length == 0) {
        setError("title", { message: "At Least 1 Member is Required" });
        return;
      }

      form.append("file", file);
      // Get Uploaded Image Id
      const imageUploadResponse = await axios.post(
        "http://localhost:5000/image/upload",
        form,
        { withCredentials: true }
      );
      const imageId = imageUploadResponse.data.data.id;
      // Sent Company creation request
      //   const artistIds = members.map((v: any) => v.id);
      await axios.post(
        "http://localhost:5000/set/new",
        {
          title: values.title,
          imageId,
          collectionId,
          artistIds: selectedMembers,
        },
        { withCredentials: true }
      );
      closeModal();
    } catch (err) {
      setError("title", { message: "An Error Occurred" });
    }
  };

  return (
    <>
      <div className=" flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md bg-opacity-80 hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <FaPlus></FaPlus>
        </button>
      </div>

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
                  <p>Add Set</p>

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
                      <div>
                        <label> Included Artists </label>
                        <Select
                          isMulti
                          onChange={(v) => {
                            setSelectedMembers(v.map((x) => x.value));
                          }}
                          options={members.map((v) => ({
                            value: v.id,
                            label: v.name,
                          }))}
                        ></Select>
                      </div>
                      <input
                        id="image-btn"
                        type="file"
                        ref={inputRef}
                        placeholder="Selected Image"
                        onChange={onImageSelected}
                        accept="image/png, image/jpeg, image/jpg"
                        hidden
                      />
                      <label
                        htmlFor="image-btn"
                        className="px-1 py-2 bg-primary rounded shadow-lg cursor-pointer text-white text-center"
                      >
                        Upload Image
                      </label>
                      <div className="p-4 flex justify-center">
                        <img
                          ref={imageRef}
                          src="/logo.png"
                          alt="Selected Image"
                          width={150}
                          height={300}
                          className="rounded content-center"
                        />
                      </div>

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
