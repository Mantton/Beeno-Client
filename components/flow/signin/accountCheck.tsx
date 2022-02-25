import axios from "axios";
import Link from "next/link";
import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { API_URL } from "../../../lib/constants";
import {
  SignInFlowContext,
  useSignInFlowContext,
} from "../../../lib/hooks/auth";

interface FormValues {
  entry: string;
}
export default function FindAccount() {
  const context = useSignInFlowContext();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    if (!values.entry) {
      setError("entry", { message: "Required" }, { shouldFocus: true });
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/flow/exists`, {
        text: values.entry,
      });
      context?.setEntry(values.entry);
      context?.setType(response.data.type);
    } catch (err: any) {
      setError(
        "entry",
        { message: "Account not found" },
        { shouldFocus: true }
      );
      console.log(err.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 justify-center">
          <div>
            <p className="text-red-500">
              {errors.entry && errors.entry.message}
            </p>

            <input
              className="appearance-none rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-500"
              {...register("entry")}
              placeholder="Username or email"
            />
          </div>

          <button
            className="bg-white hover:bg-zinc-200 text-black font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-500"
            type="submit"
          >
            Next
          </button>
          <Link href="/flow/reset">
            <a className="bg-black hover:bg-zinc-900 text-white text-center font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline  focus:ring-2 focus:ring-white">
              Forgot password?
            </a>
          </Link>

          <p className="pt-4 text-sm font-light">
            {"Don't"} have an account?{" "}
            <Link href="/flow/register">
              <a className="text-white">Register</a>
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
