import axios from "axios";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { API_URL } from "../../../lib/constants";

type NewCompanyProp = {
  name: string;
  imageId: number;
};
export default function NewCompany() {
  const inputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const onImageSelected = () => {
    const files = inputRef.current?.files;

    if (!files) return;
    setFile(files[0]);
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const result = event.target?.result;
      if (result && typeof result === "string") imageRef.current!.src = result;
    };
  };

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<NewCompanyProp>();

  const onSubmit: SubmitHandler<NewCompanyProp> = async (values) => {
    try {
      // Upload File

      const form = new FormData();
      if (!file) {
        setError("imageId", { message: "No Image Selected" });
        return;
      }
      form.append("file", file);
      // Get Uploaded Image Id
      const imageUploadResponse = await axios.post(
        `${API_URL}/image/upload`,
        form,
        { withCredentials: true }
      );
      const imageId = imageUploadResponse.data.data.id;
      console.log(imageId);
      // Sent Company creation request
      const response = await axios.post(
        `${API_URL}/company/new`,
        {
          name: values.name,
          imageId: imageId,
        },
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (err) {
      setError("name", { message: "An Error Occurred" });
    }
  };

  return (
    <div className="grid gap-2 justify-center content-center">
      <form
        className="grid gap-4 justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Company Name"
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
  );
}
