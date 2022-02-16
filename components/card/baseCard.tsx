import Image from "next/image";
import Link from "next/link";
import { CardSet, Artist } from "../../lib/types";

interface PageProp {
  set: CardSet;
  artists: Artist[];
  collection: {
    id: number;
    title: string;
  };
  era: {
    id: number;
    title: string;
  };
  group: {
    id: number;
    name: string;
    memberCount: number;
  } | null;
}
export default function BaseBeenoCard({
  set,
  artists,
  collection,
  era,
  group,
}: PageProp) {
  const gradientClass = `hover:bg-[length:200%_200%] bg-right-top bg-gradient-to-t hover:bg-gradient-to-tr from-primary ${rarityGradientEndColor(
    set.rarity.id
  )} overflow-hidden`;
  const textClass = rarityTextColor(set.rarity.id);
  const containsAllMembers = artists.length == group?.memberCount;
  const hoverClass = "text-md font-light text-gray-400";
  return (
    <Link href={"#"}>
      <a className="">
        <div className=" flex rounded-2xl ">
          <div
            className={`hover:animate-card_glimmer relative overflow-hidden rounded-2xl ${gradientClass}`}
          >
            <div className="  h-96 w-60 relative m-2">
              <Image
                src={set.imageUrl}
                alt="CARD"
                className="object-cover rounded-xl "
                layout="fill"
              />
              <div className=" transition ease-in-out delay-150  absolute inset-0 flex  justify-start items-end z-0 opacity-0 hover:opacity-100 bg-gradient-to-b from-transparent to-black rounded-xl">
                <div className="flex flex-col gap-2 text-white px-2 py-4">
                  <span>
                    {" "}
                    Set #{set.id}
                    {" • "}
                    <span className={`font-semibold ${textClass}`}>
                      {set.rarity.label}
                    </span>
                  </span>
                  <p className="text-sm font-thin text-gray-500">
                    <span>
                      {group?.name ?? artists[0].name}
                      {" • "}
                      {era.title}
                    </span>
                    <p>Collection #{collection.id}</p>
                  </p>
                  {artists.length === 1 && (
                    <div className="flex gap-2 items-center">
                      <div className="h-6 w-6 rounded-full relative">
                        <Image
                          src={artists[0].imageUrl}
                          className="object-cover rounded-full"
                          layout="fill"
                        ></Image>
                      </div>
                      <span className={hoverClass}>{artists[0].name}</span>
                    </div>
                  )}
                  {containsAllMembers && (
                    <span className={hoverClass}>OT{artists.length}</span>
                  )}
                  {artists.length !== 1 && !containsAllMembers && (
                    <span className={hoverClass}>
                      {artists.map((v) => v.name).join(", ")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

const rarityGradientEndColor = (n: number) => {
  switch (n) {
    case 1:
      return "to-uncommon";
    case 2:
      return "to-rare";
    case 3:
      return "to-ultra_rare";
    case 4:
      return "to-legendary";
    case 0:
    default:
      return "to-common";
  }
};

const rarityTextColor = (n: number) => {
  switch (n) {
    case 1:
      return "text-uncommon";
    case 2:
      return "text-rare";
    case 3:
      return "text-ultra_rare";
    case 4:
      return "text-legendary";
    case 0:
    default:
      return "text-common";
  }
};
