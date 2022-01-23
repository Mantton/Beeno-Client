import { useAuthContext, useSignInFlowContext } from "../../../lib/hooks/auth";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";

interface FormValues {
  password: string;
}
export default function EnterPassword() {
  const flowContext = useSignInFlowContext();
  const authContext = useAuthContext();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async ({ password }) => {
    if (!password) {
      setError("password", { message: "Required" }, { shouldFocus: true });
      return;
    }

    try {
      if (!flowContext.type) throw new Error("Bad State");
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        {
          password,
          [flowContext.type]: flowContext.entry,
        },
        { withCredentials: true }
      );

      console.log(response.data);

      authContext.setAccount({
        id: response.data.data.id,
        handle: response.data.data.handle,
      });
      router.push("/collector/" + response.data.data.handle);
    } catch (err) {
      setError("password", { message: "Invalid Password" });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 justify-center">
          <div>
            <p className="text-red-500">
              {errors.password && errors.password.message}
            </p>

            <input
              className="appearance-none rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-500"
              {...register("password")}
              placeholder="Password"
              type={"password"}
            />
          </div>

          <button
            className="bg-white hover:bg-zinc-200 text-black font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-500"
            type="submit"
          >
            Sign In
          </button>
          <Link href="/flow/login">
            <a className="bg-black hover:bg-zinc-900 text-white text-center font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline  focus:ring-2 focus:ring-white">
              Cancel
            </a>
          </Link>
        </div>
      </form>
    </>
  );
}