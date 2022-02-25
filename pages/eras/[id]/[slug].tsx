import axios from "axios";
import { useRouter } from "next/router";
import useSWR, { KeyedMutator } from "swr";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { createContext, useEffect, useState } from "react";
import { EraPageMutatorContext, useAuthContext } from "../../../lib/hooks/auth";
import NewCollectionForm from "../../../components/forms/newCollection";
import NewSetForm from "../../../components/forms/newSet";
import BaseBeenoCard from "../../../components/card/baseCard";
import CollectionView from "../../../modules/eras/CollectionView/collection_view";
import { FaPlus } from "react-icons/fa";
import { Era } from "../../../lib/types";

export default function EraPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<number | null>(null);
  const [ncm, setNcm] = useState(false); // New Collection Modal
  const [nem, setNem] = useState(false); // New Set Modal

  enum View {
    collections,
    allCards,
  }

  const [currentView, setCurrentView] = useState(View.collections);
  const { account } = useAuthContext();
  const { id } = router.query;

  const address = `http://localhost:5000/era/${id}`;
  const fetcher = async (url: string) =>
    await axios.get(url).then((res) => res.data);

  const { data, error, mutate } = useSWR<Era>(id ? address : null, fetcher);

  useEffect(() => {
    mutate();
  }, [ncm, nem]);
  if (error) {
    return (
      <div className="flex justify-center">
        <p> An Error Occurred </p>
      </div>
    );
  }

  if (!data) {
    return (
      <>
        <Head>
          <title> Era </title>
        </Head>
        <div className="flex justify-center">
          <p> Loading</p>
        </div>
      </>
    );
  }
  const era = data;
  const group = era.group;
  const members = group!.members;
  const collections = era.collections;

  return (
    <>
      <Head>
        <title>
          {" "}
          {group!.name} - {era.title}{" "}
        </title>
      </Head>
      <div className="flex flex-col  ">
        <div className="border-b-2">
          <div className=" h-60 relative ">
            <Image
              src={era.imageUrl}
              layout="fill"
              className="object-cover blur-sm"
            ></Image>
            <div className="absolute inset-0 flex justify-center items-center ">
              <div className="w-full text-center font-bold p-4  text-white">
                <p className="text-2xl drop-shadow-lg"> {group!.name}</p>
                <p className="text-3xl drop-shadow-lg"> {era.title}</p>
              </div>
            </div>
            {account && account.privileges.some((p) => [0, 2].includes(p)) && (
              <div className="absolute inset-0 flex justify-end items-end p-4">
                <div className=" flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setNcm(true);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md bg-opacity-80 hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    <FaPlus></FaPlus>
                  </button>
                </div>
                <NewCollectionForm
                  eraId={era.id}
                  setIsOpen={setNcm}
                  isOpen={ncm}
                ></NewCollectionForm>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center p-4 ">
          <div className="border-2 border-white rounded-md flex justify-center ">
            <button onClick={() => setCurrentView(View.collections)}>
              <div className="w-32 p-4 items-center flex justify-center hover:shadow-md hover:shadow-amber-700 rounded-l-sm">
                <span className="">Collections</span>
              </div>
            </button>
            <div className="bg-primary w-[2px]"></div>
            <button onClick={() => setCurrentView(View.allCards)}>
              <div className="w-32 p-4 items-center flex justify-center">
                <span className="">All Cards</span>
              </div>
            </button>
          </div>
        </div>
        <EraPageMutatorContext.Provider value={{ mutate }}>
          <CollectionView era={era} />
        </EraPageMutatorContext.Provider>
      </div>
    </>
  );
}
