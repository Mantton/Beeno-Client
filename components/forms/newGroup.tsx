import axios from "axios";
import { useRef, useState, Fragment, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { HiOutlineX } from "react-icons/hi";
import { BiImageAdd } from "react-icons/bi";
import { IUseState } from "../../types";
import Image from "next/image";
import { API_URL } from "../../lib/constants";

type ComponentProp = {
  companyId: number;
  isOpen: boolean;
  setIsOpen: IUseState<boolean>;
};
type Props = {
  name: string;
  imageId: number;
};
export default function NewGroupForm({
  companyId,
  isOpen,
  setIsOpen,
}: ComponentProp) {
  const [bannerImageFile, setBannerImage] = useState<File | null>(null);
  const [logoImageFile, setLogoImage] = useState<File | null>(null);

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (bannerImageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(bannerImageFile);
      reader.onload = (event) => {
        const result = event.target?.result;
        const element = document.getElementById(
          "bannerImage"
        ) as HTMLImageElement | null;
        if (element && result && typeof result === "string")
          element.src = result;
      };
    }

    if (logoImageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(logoImageFile);
      reader.onload = (event) => {
        const result = event.target?.result;
        const element = document.getElementById(
          "logoImage"
        ) as HTMLImageElement | null;
        if (element && result && typeof result === "string")
          element.src = result;
      };
    }
  }, [bannerImageFile, logoImageFile]);

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<Props>();

  const onSubmit: SubmitHandler<Props> = async (values) => {
    try {
      // Upload File

      let form = new FormData();
      if (!logoImageFile || !bannerImageFile) {
        setError("imageId", { message: "Banner & Logo Images are required" });
        return;
      }

      // Upload Banner Image

      form.append("file", bannerImageFile);
      let imageUploadResponse = await axios.post(
        `${API_URL}/image/upload`,
        form,
        { withCredentials: true }
      );
      const bannerImageId = imageUploadResponse.data.data.id;

      // Upload Logo Image
      form = new FormData();
      form.append("file", logoImageFile);

      imageUploadResponse = await axios.post(`${API_URL}/image/upload`, form, {
        withCredentials: true,
      });
      const logoImageId = imageUploadResponse.data.data.id;

      await axios.post(
        `${API_URL}/group/new`,
        {
          name: values.name,
          bannerImageId,
          logoImageId,
          companyId,
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
          className="fixed inset-0 z-10 overflow-y-clip"
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
              <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md ">
                <Dialog.Title
                  as="h3"
                  className=" items-center text-lg font-medium leading-6 text-gray-900 flex justify-between"
                >
                  <p className="font-bold text-lg">Add Group</p>

                  <button
                    type="button"
                    className="inline-flex justify-center mx-4 my-2 text-2xl "
                    onClick={closeModal}
                  >
                    <HiOutlineX />
                  </button>
                </Dialog.Title>
                <div className="mt-2">
                  <form
                    className="grid gap-4 "
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div>
                      <label>
                        <p className="text-bold text-md font-semibold pb-2">
                          Name
                        </p>
                      </label>
                      <input
                        type="text"
                        placeholder="Group name"
                        className="appearance-none rounded-sm focus:rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-500 ring-2 ring-primary"
                        {...register("name")}
                      />
                    </div>

                    <div>
                      <label>
                        <p className="text-bold text-md font-semibold pb-2">
                          Banner Image
                        </p>
                      </label>
                      <div className="relative h-40 w-52 bg-opacity-75 rounded-md border-2 border-dashed border-gray-700 flex justify-center items-center hover:bg-gray-500 hover:bg-opacity-50 hover:cursor-pointer">
                        <input
                          type="file"
                          id="bannerImageInput"
                          placeholder="banner image"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files && e.target.files[0];
                            if (!file) return;
                            setBannerImage(file);
                          }}
                          accept="image/png, image/jpeg, image/jpg"
                        />
                        <label
                          htmlFor="bannerImageInput"
                          className="relative w-full h-full flex justify-center items-center hover:cursor-pointer"
                        >
                          {!bannerImageFile && (
                            <BiImageAdd size={70} className="text-gray-600" />
                          )}
                          {bannerImageFile && (
                            <img
                              src=""
                              id="bannerImage"
                              className="w-full h-full object-cover"
                            />
                          )}
                        </label>
                      </div>
                    </div>

                    <div>
                      <label>
                        <p className="text-bold text-md font-semibold pb-2">
                          Group Logo
                        </p>
                      </label>
                      <div className="relative h-40 w-52 bg-opacity-75 rounded-md border-2 border-dashed border-gray-700 flex justify-center items-center hover:bg-gray-300 hover:bg-opacity-50 hover:cursor-pointer">
                        <input
                          type="file"
                          id="logoImageInput"
                          placeholder="logo image"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files && e.target.files[0];
                            if (!file) return;
                            setLogoImage(file);
                          }}
                          accept="image/png, image/jpeg, image/jpg"
                        />
                        <label
                          htmlFor="logoImageInput"
                          className="relative w-full h-full flex justify-center items-center hover:cursor-pointer"
                        >
                          {!logoImageFile && (
                            <BiImageAdd size={70} className="text-gray-600" />
                          )}
                          {logoImageFile && (
                            <img
                              src=""
                              id="logoImage"
                              className="w-full h-full object-cover"
                            />
                          )}
                        </label>
                      </div>
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
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
