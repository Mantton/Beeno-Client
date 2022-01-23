import { useContext } from "react";
import { useForm } from "react-hook-form";
import { SignInFlowContext } from "../../../lib/hooks/auth";
import FindAccount from "./accountCheck";
import EnterPassword from "./enterPassword";

interface SignInFormProps {
  email: string;
  password: string;
  handle: string;
}
export default function SignInForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const context = useContext(SignInFlowContext);

  if (context?.type) {
    return (
      <>
        <p className="text-center text-xl font-bold pb-5">
          Enter your password
        </p>
        <EnterPassword></EnterPassword>
      </>
    );
  }

  return (
    <>
      <p className="text-center text-xl font-bold pb-5">Sign in to Beeno</p>
      <FindAccount />
    </>
  );
}
