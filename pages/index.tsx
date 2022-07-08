/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Beeno</title>
        <meta
          name="description"
          content="A K-pop Digital Card Trading platform"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-4 flex justify-center items-center min-h-screen">
        <div className="m-4 block">
          <h1 className="text-4xl font-bold mb-5">
            Beeno, A K-pop Digital Card Trading platform.
          </h1>
          <span className="text-2xl opacity-75">
            Explore, collect & trade cards from your favorite artists
            <i> without</i> destroying the environment.
          </span>
          <div className="flex text-white font-semibold mt-5">
            <Link href="/explore">
              <a className="py-3 px-6 bg-primary rounded-md mr-4" href="">
                Explore Collections
              </a>
            </Link>
            <Link href="/leaderboard">
              <a className="py-3 px-6 bg-primary rounded-md">
                View Leaderboard
              </a>
            </Link>
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
    </>
  );
};

export default Home;
