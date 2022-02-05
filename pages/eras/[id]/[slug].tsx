import axios from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../lib/hooks/auth";
import NewCollectionForm from "../../../components/forms/newCollection";
import NewSetForm from "../../../components/forms/newSet";
import { slug } from "../../../lib/utils";
import slugify from "slugify";
export default function EraPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<number | null>(null);
  const [ncm, setNcm] = useState(false); // New Collection Modal
  const [nem, setNem] = useState(false); // New Set Modal

  const { account } = useAuthContext();
  const { id } = router.query;

  const address = `http://localhost:5000/era/${id}`;
  const fetcher = async (url: string) =>
    await axios.get(url).then((res) => res.data);

  const { data, error, mutate } = useSWR<any>(id ? address : null, fetcher);

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
        <div className="border-b-2">
          <div className=" h-60 relative ">
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

        <div className="flex justify-between p-4">
          <p>Collections</p>
          {account && account.privileges.some((p) => [0, 2].includes(p)) && (
            <NewCollectionForm
              eraId={eraInfo.id}
              setIsOpen={setNcm}
              isOpen={ncm}
            ></NewCollectionForm>
          )}
        </div>
        {/* <div className="p-6 ">
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
        </div> */}
        <div className=" flex flex-col gap-6 justify-center  p-4">
          {collections.map((collection: any) => {
            return (
              <div key={collection.id}>
                <div className="flex justify-between">
                  <p className="font-bold text-2xl">{collection.title}</p>
                  {account &&
                    account.privileges.some((p) => [0, 2].includes(p)) && (
                      <NewSetForm
                        collectionId={collection.id}
                        // isOpen={nem}
                        // setIsOpen={setNem}
                        members={memberInfo}
                      />
                    )}
                </div>
                <div className="flex flex-wrap gap-10 py-4">
                  {collection.sets.map((set: any) => {
                    return (
                      <div className="flex rounded-2xl">
                        <div
                          className={
                            `p-2 shadow-lg rounded-2xl bg-gradient-to-tr from-primary to-` +
                            rarityColor(set.rarity.label)
                          }
                        >
                          <img
                            src={set.image.base}
                            alt="CARD"
                            className="h-96 w-60 object-cover rounded-2xl"
                          />
                        </div>
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

const rarityColor = (title: string) => {
  return slugify(title, { lower: true, replacement: "_" });
};
