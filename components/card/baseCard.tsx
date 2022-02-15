import Image from "next/image";
import Link from "next/link";
import { CardSet, Artist } from "../../lib/types";

interface PageProp {
  set: CardSet;
  artists: Artist[];
  group: any;
}
export default function BaseBeenoCard({ set, artists }: PageProp) {
  const gradientClass = rarityGradientEndColor(set.rarity.id);
  const textClass = rarityTextColor(set.rarity.id);
  return (
    <div className="flex rounded-2xl">
      <div
        className={`shadow-lg rounded-2xl bg-gradient-to-t from-primary ${gradientClass}`}
      >
        <div className="h-96 w-60 relative m-2">
          <Image
            src={set.imageUrl}
            alt="CARD"
            className="object-cover rounded-xl "
            layout="fill"
          />

          <div className="transition ease-in-out delay-150  absolute inset-0 flex  justify-start items-end z-0 opacity-0 hover:opacity-100 bg-gradient-to-b from-transparent to-black rounded-xl">
            <div className="flex flex-col gap-2 text-white p-2">
              <span> Set #{set.id}</span>
              {artists.length === 1 && (
                <Link href={"#"}>
                  <a>
                    <div className="flex gap-2 items-center">
                      <div className="h-8 w-8 rounded-full relative">
                        <Image
                          src={artists[0].imageUrl}
                          className="object-cover rounded-full"
                          layout="fill"
                        ></Image>
                      </div>
                      <span>{artists.map((v) => v.name).join(", ")}</span>
                    </div>
                  </a>
                </Link>
              )}

              {artists.length !== 1 && (
                <span>{artists.map((v) => v.name).join(", ")}</span>
              )}

              <span className={`font-semibold ${textClass}`}>
                {set.rarity.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
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
