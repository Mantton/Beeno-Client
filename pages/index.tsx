/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import { SearchIcon } from "@heroicons/react/outline";
import ExploreButton from "../components/nav/exploreButton";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Head>
        <title>Beeno</title>
        <meta
          name="description"
          content="A K-pop Digital Card Trading platform"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="shadow-md p-2.5 flex justify-between items-center">
        <div className="flex items-center">
          <img
            className=" rounded-full ml-1.5 mr-1"
            src="/logo.png"
            alt="logo"
            height={40}
            width={40}
          />
          <span className=" text-2xl font-bold">Beeno</span>
        </div>

        <form action="/" method="get" className="flex">
          <input
            type="text"
            className="w-full border border-gray-450 bg-grey-lighter text-grey-darker border-grey-lighter rounded-md h-10 px-4 focus:outline-none outline-primary rounded-r-none border-r-0"
            placeholder="Search Beeno"
            size={60}
          />

          <button type="submit">
            <SearchIcon className="h-10 w-10 px-2 py-2 bg-gray-300 rounded-r-md">
              {" "}
            </SearchIcon>
          </button>
        </form>

        <div className="flex">
          <ExploreButton></ExploreButton>
        </div>
      </nav>

      <main className="p-4 flex justify-center items-center">
        <div className="m-4 block">
          <h1 className="text-4xl font-bold mb-5">
            Beeno, A K-pop Digital Card Trading platform.
          </h1>
          <span className="text-2xl opacity-75">
            Explore, collect & trade cards from your favorite artists
            <i> without</i> destroying the environment.
          </span>
          <div className="flex text-white font-semibold mt-5">
            <a className="py-3 px-6 bg-primary rounded-md mr-4" href="/explore">
              Explore
            </a>
            <a className="py-3 px-6 bg-primary rounded-md" href="/leaderboard">
              Leaderboard
            </a>
          </div>
        </div>
        <div className="m-2 ">
          <img
            className="rounded-lg"
            src="https://external-preview.redd.it/TmnsGDTHJsBepTMVDf1Zx_OXOfjsZs7haCxNBG14KKk.jpg?width=640&crop=smart&auto=webp&s=46171ceb083471338e2dd617eb9e7ed3f7c97745"
            alt="sample card"
            width="300"
            height="450"
          />
        </div>
      </main>

      <footer className="p-5 bg-primary ">
        <div className="text-sm flex justify-between text-white">
          <a href="">A Mantton Project</a>
          <div className="notSoLegal">
            <a className="mr-4" href="">
              Privacy Policy
            </a>
            <a href="">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
