import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { slug } from "../../../lib/utils";
import { useAuthContext } from "../../../lib/hooks/auth";
import NewEraForm from "../../../components/forms/newEra";
import { useEffect, useState } from "react";
import Head from "next/head";
import { Artist, Group } from "../../../lib/types";
import { FaFolderPlus, FaUserPlus, FaVideo } from "react-icons/fa";
import NewMemberForm from "../../../components/forms/newMember";
import { API_URL } from "../../../lib/constants";

type PageResponse = Group;
export default function GroupPage() {
  const router = useRouter();
  const { id } = router.query;
  const { account } = useAuthContext();
  //Reference : https://github.com/vercel/next.js/discussions/15952#discussioncomment-47750
  const address = `${API_URL}/group/${id}`;
  const fetcher = async (url: string) =>
    await axios.get(url).then((res) => res.data);
  const { data, error, mutate } = useSWR<PageResponse>(
    id ? address : null,
    fetcher
  );

  const [newEraModalOpen, setNewEraModalOpen] = useState<boolean>(false);
  const [newMemberModalOpen, setNewMemberModalOpen] = useState<boolean>(false);
  useEffect(() => {
    mutate();
  }, [newEraModalOpen, newMemberModalOpen]);

  if (!data) {
    return (
      <>
        <div className="flex justify-center">
          <p>Loading</p>
        </div>
      </>
    );
  }

  if (error)
    return (
      <>
        <div className="flex justify-center">
          <p>An Error Occurred</p>
        </div>
      </>
    );

  const group = data;
  const members = data.members;
  const company = data.company;
  const eras = data.eras!;

  const canAddEra =
    account?.privileges.some((p) => [0, 1].includes(p)) ?? false;
  const canAddMember = canAddEra;
  return (
    <>
      <Head>
        <title>{group.name}</title>
      </Head>

      <div className="flex flex-col">
        <div className="relative h-48">
          <Image
            src={group.bannerImageUrl}
            layout="fill"
            className="object-cover blur-sm opacity-85"
          />

          {canAddMember && (
            <div className="absolute inset-0 justify-end items-end flex gap-6 p-6 ">
              <button
                onClick={() => {
                  setNewMemberModalOpen(true);
                }}
              >
                <FaUserPlus className="text-primary text-xl drop-shadow-xl" />
                <NewMemberForm
                  groupId={group.id}
                  companyId={company.id}
                  isOpen={newMemberModalOpen}
                  setIsOpen={setNewMemberModalOpen}
                />
              </button>
              <button
                onClick={() => {
                  setNewEraModalOpen(true);
                }}
              >
                <FaFolderPlus className="text-primary text-xl drop-shadow-xl" />
                <NewEraForm
                  groupId={group.id}
                  isOpen={newEraModalOpen}
                  setIsOpen={setNewEraModalOpen}
                />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className=" px-8 py-4">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-28 w-28 -mt-[75px] rounded-full border-2 border-gray-600 bg-black">
            <Image
              src={group.logoImageUrl}
              layout="fill"
              className="object-cover rounded-full "
            />
          </div>
          <p className="text-3xl font-bold ">{group.name}</p>
        </div>

        <div className="member__section">
          <div className="flex flex-wrap justify-center items-center gap-8 py-2">
            {members.map((artist) => {
              return (
                <div key={artist.id}>
                  <div className="h-24 w-24 rounded-full relative shadow-lg hover:shadow-xl">
                    <Image
                      src={artist.imageUrl}
                      layout="fill"
                      className="rounded-full object-cover bg-black"
                    />
                  </div>
                  <p className="text-center text-lg font-thin ">
                    {artist.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="eras__section">
          <div className="flex justify-center flex-wrap gap-8 py-4">
            {eras.map((era) => {
              return (
                <div key={era.id}>
                  <Link href={`/eras/${era.id}/${slug(era.title)}`}>
                    <a>
                      <div className="h-60 w-96 relative rounded-lg shadow-lg hover:shadow-xl hover:-m-2">
                        <Image
                          src={era.imageUrl}
                          layout="fill"
                          className="rounded-md object-cover"
                        />
                        <div className="absolute inset-0 flex items-end justify-center">
                          <p className="rounded-b-md p-4 w-full bg-black bg-opacity-60 text-center text-xl text-white">
                            {era.title}
                          </p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
