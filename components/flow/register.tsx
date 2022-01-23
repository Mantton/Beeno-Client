import Link from "next/link";

export default function RegisterFlow() {
  return (
    <>
      <div className="w-full">
        <div className="text-center pb-5">
          <p className="text-xl font-bold ">
            What would you like to be known by?
          </p>
          {/* <p>The world awaits...</p> */}
        </div>
        <form>
          <div className="grid gap-4 justify-center">
            <input
              className="appearance-none rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-500"
              id="username"
              type="text"
              placeholder="@Beeno"
            />
            <button
              className="bg-white hover:bg-zinc-200 text-black font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-500"
              type="button"
            >
              Next
            </button>
            <p className="pt-4 text-sm font-light">
              Already have an account?{" "}
              <Link href="/flow/login">
                <a className="text-white">Sign In</a>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
