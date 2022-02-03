import axios from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import { useState } from "react";
export default function EraPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<number | null>(null);

  const { id } = router.query;

  const address = `http://localhost:5000/era/${id}`;
  const fetcher = async (url: string) =>
    await axios.get(url).then((res) => res.data);

  const { data, error } = useSWR<any>(id ? address : null, fetcher);

  if (error) {
    return (
      <div className="flex justify-center">
        <p> An Error Occurred </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center">
        <p> Loading</p>
      </div>
    );
  }
  const eraInfo = data.data;
  const groupInfo = eraInfo.group;

  const memberInfo = groupInfo.members.map((obj: any) => obj.artist);

  const collections = eraInfo.collections;
  const memberCss = (index: number) =>
    `py-4 px-6 border-y-2 border-l-2 ${
      index == memberInfo.length - 1 ? "border-r-2 rounded-r-md" : ""
    }`;

  return (
    <>
      <div className="flex flex-col ">
        <div className="h-1/3 border-b-2">
          <div className="h-full  relative ">
            <Image
              src={eraInfo.image.base}
              layout="fill"
              className="object-cover blur-sm"
            ></Image>
            <div className="absolute inset-0 flex justify-center items-center z-10">
              <div className="w-full text-center font-bold p-4  text-white">
                <p className="text-2xl drop-shadow-lg"> {groupInfo.name}</p>
                <p className="text-3xl drop-shadow-lg"> {eraInfo.title}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 ">
          <div className="flex justify-center ">
            <button
              className="py-4 px-6 border-y-2 border-l-2 rounded-l-md
              "
            >
              <p className="font-bold">All</p>
            </button>

            {memberInfo.map((member: any, index: number) => {
              return (
                <button
                  onClick={() => {
                    setFilter(member.id);
                  }}
                  key={member.id}
                  className={memberCss(index)}
                >
                  <p className="font-bold">{member.name}</p>
                </button>
              );
            })}
          </div>
        </div>
        <div className="grid justify-center  p-4">
          {collections.map((collection: any) => {
            return (
              <div key={collection.id}>
                <p className="font-bold text-2xl">{collection.title}</p>
                <div className="flex flex-wrap gap-10 py-4">
                  {collection.sets.map((set: any) => {
                    const hex = `ring-8 ring-[#${set.rarity.hex}]`;
                    return (
                      <div className={`relative h-96 w-60 ${hex}  rounded-2xl`}>
                        <Image
                          src={set.image.base}
                          layout="fill"
                          className="rounded-2xl object-cover shadow-lg "
                        ></Image>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
