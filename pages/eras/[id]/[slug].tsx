import axios from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/auth";
import { FaPlus } from "react-icons/fa";
import { ArtistExcerpt, Card, SingleEraResponse } from "../../../types";
import BaseBeenoCard from "../../../components/card/baseCard";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/outline";
import { slug } from "../../../lib/utils";

export default function EraPage() {
  const router = useRouter();

  const getMemberSlugsFromQuery = () => {
    const query = router.query.m;
    if (!query) return "all";
    if (typeof query === "string") {
      if (query === "all") return "all";
      return [slug(query)];
    }

    return query.map((v) => slug(v));
  };

  const getRaritySlugsFromQuery = () => {
    const query = router.query.r;

    if (!query) return "all";

    if (typeof query === "string") {
      if (query === "all") return "all";
      return [slug(query)];
    }

    return query.map((v) => slug(v));
  };
  const RARITIES = ["Common", "Uncommon", "Rare", "Ultra Rare", "Legendary"];
  const SORT_MODES = [
    "Rarity: Rare to Common",
    "Rarity: Common to Rare",
    "Oldest",
    "Newest",
  ];
  const [sortMode, setSortMode] = useState(SORT_MODES[0]);

  const rarityColor = (n: string) => {
    switch (n) {
      case "Common":
        return "bg-common";
      case "Uncommon":
        return "bg-uncommon";
      case "Rare":
        return "bg-rare";
      case "Ultra Rare":
        return "bg-ultra_rare";
      case "Legendary":
        return "bg-legendary";
      default:
        return "bg-common";
    }
  };

  const { id } = router.query;

  const address = `http://localhost:5000/eras/${id}`;
  const fetcher = async (url: string) =>
    await axios.get(url).then((res) => res.data);

  const { data, error, mutate } = useSWR<SingleEraResponse>(
    id ? address : null,
    fetcher
  );
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
  const cards = era.cards;
  const members = group!.members;
  const updateMemberSlugs = (artist: ArtistExcerpt) => {
    const selected = getMemberSlugsFromQuery();
    const slugs = members.map((v) => slug(v.name));
    const name = slug(artist.name);
    let updatedQuery;
    if (selected === "all")
      updatedQuery = slugs.filter((v) => v !== slug(artist.name));
    else if (selected.includes(name))
      updatedQuery = selected.filter((v) => v !== name);
    else updatedQuery = [...selected, name];

    if (updatedQuery.length == members.length) updatedQuery = "all";
    router.query.m = updatedQuery;
    router.push(router);
  };
  const isMemberSelected = (artist: ArtistExcerpt) => {
    const selected = getMemberSlugsFromQuery();
    if (selected === "all") return true;
    return selected.includes(slug(artist.name));
  };

  const isRaritySelected = (rarity: string) => {
    const selected = getRaritySlugsFromQuery();
    if (selected === "all") return true;
    return selected.includes(slug(rarity));
  };

  const updateRaritySlugs = (rarity: string) => {
    const selected = getRaritySlugsFromQuery();
    const slugs = RARITIES.map((v) => slug(v));
    const name = slug(rarity);
    let updatedQuery;
    if (selected === "all") updatedQuery = slugs.filter((v) => v !== name);
    else if (selected.includes(name))
      updatedQuery = selected.filter((v) => v !== name);
    else updatedQuery = [...selected, name];

    if (updatedQuery.length == RARITIES.length) updatedQuery = "all";

    router.query.r = updatedQuery;
    router.push(router);
  };
  const filteredCards = cards
    .filter((v) => v.artists.some(isMemberSelected))
    .filter((v) => isRaritySelected(v.rarity.label))
    .sort((a, b) => {
      const index = SORT_MODES.indexOf(sortMode);

      switch (index) {
        default:
        case 0:
          return b.rarity.id - a.rarity.id;
        case 1:
          return a.rarity.id - b.rarity.id;
        case 3:
          return new Date(b.created).getTime() - new Date(a.created).getTime();
        case 2:
          return new Date(a.created).getTime() - new Date(b.created).getTime();
      }
    });

  return (
    <>
      <Head>
        <title>
          {group!.name} - {era.title}
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
          </div>
        </div>

        <div className="flex gap-1">
          <div className="flex-col w-1/3 min-h-screen py-4 px-3 bg-gray-50 ">
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              Filter
            </span>

            <div className="flex-col border-t-2 border-t-black rounded-sm pt-3">
              <span className=" text-md">
                Members ({group?.members.length ?? 0})
              </span>
              <div className="flex gap-2 flex-wrap">
                {group?.members
                  .filter((v) => slug(v.name))
                  .map((member) => (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        updateMemberSlugs(member);
                      }}
                      key={member.id}
                    >
                      <div
                        className={
                          "py-1 px-3 border-2 rounded-md " +
                          (isMemberSelected(member)
                            ? "border-gray-600"
                            : "border-gray-300")
                        }
                      >
                        <span>{member.name}</span>
                      </div>
                    </button>
                  ))}
              </div>
            </div>

            <div className="pt-4">
              <span className=" text-md">Rarity</span>
              <div className="flex gap-2 flex-wrap">
                {RARITIES.map((rarity) => {
                  const id = RARITIES.indexOf(rarity);
                  return (
                    <button
                      key={id}
                      onClick={(e) => {
                        e.preventDefault();
                        updateRaritySlugs(rarity);
                      }}
                      className={
                        "px-3 py-1 border-2 rounded-md " +
                        (isRaritySelected(rarity)
                          ? "border-gray-600"
                          : "border-gray-300")
                      }
                    >
                      <div className="flex items-center gap-1">
                        <div
                          className={
                            "w-3 h-3 rounded-full " + rarityColor(rarity)
                          }
                        ></div>
                        <span>{rarity}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-col pt-4">
              <span>Status</span>
              <div>
                <button className="px-3 py-1 border-2  border-gray-300 rounded-md">
                  <span>On TradeHub</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex-col  py-4 px-3 w-full ">
            <div className="px-4 flex justify-between items-center">
              <span className="self-center text-xl font-semibold whitespace-nowrap">
                Cards
              </span>

              <div className="flex gap-4 px-4">
                <div className="w-64 z-10">
                  <Listbox value={sortMode} onChange={setSortMode}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 text-left border-[1px] border-gray-400">
                        <span className="block truncate">{sortMode}</span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {SORT_MODES.map((mode) => (
                            <Listbox.Option
                              key={mode}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active ? "bg-gray-100" : "text-gray-900"
                                }`
                              }
                              value={mode}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {mode}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
              </div>
            </div>
            <div className="p-4 flex justify-items-start flex-wrap gap-8 items-center">
              {filteredCards.map((card) => (
                <div key={card.id}>
                  <BaseBeenoCard
                    group={group}
                    era={{ id: era.id, title: era.title }}
                    card={card}
                    set={null}
                  ></BaseBeenoCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
