import axios from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";
import { FaPlus } from "react-icons/fa";
import Head from "next/head";
import { useAuthContext } from "../../../hooks/auth";
import NewGroupForm from "../../../components/forms/newGroup";
import { Company, Group } from "../../../types";
import { useState } from "react";
type populatedGroup = {
  id: number;
  name: string;
  companyId: number;
  image: {
    base: string;
  };
};

type PageResponse = Company & { groups: Group[] };
export default function CompanyInfoPage() {
  const router = useRouter();
  const { id } = router.query;
  const { account } = useAuthContext();
  const address = `http://localhost:5000/company/${id}`;
  const fetcher = async (url: string) =>
    await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR<PageResponse>(address, fetcher);

  const [showModal, setShowModal] = useState<boolean>(false);
  if (error) return <p>Failed</p>;
  if (!data) return <p>Loading...</p>;

  const groups = data.groups ?? [];
  return (
    <>
      <Head>
        <title>{data.name}</title>
      </Head>

      <div className="flex flex-col my-4">
        <div className="flex flex-col items-center">
          <div>
            <Image
              src={data.imageUrl}
              width={100}
              height={100}
              layout="intrinsic"
              className="rounded-full"
            ></Image>
          </div>

          <p className="text-xl font-semibold mt-2">{data.name}</p>
        </div>
        <div className="grid justify-left p-10">
          <div className="flex justify-between text-xl font-bold">
            <p className="text-lg font-light">Groups</p>
            {account && account.privileges.some((p) => [0, 1].includes(p)) && (
              <button
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <FaPlus />
                <NewGroupForm
                  companyId={data.id}
                  isOpen={showModal}
                  setIsOpen={setShowModal}
                />
              </button>
            )}
          </div>
          <div className="flex flex-wrap py-4 gap-10 justify-start">
            {groups.map((group) => {
              return (
                <div key={group.id} className="flex  items-center">
                  <Link
                    href={`/groups/${group.id}/${slugify(group.name, {
                      lower: true,
                    })}`}
                  >
                    <a>
                      <div className="h-64 w-96 relative rounded-lg shadow-sm hover:shadow-xl">
                        <Image
                          src={group.bannerImageUrl}
                          layout="fill"
                          className="rounded-lg object-cover"
                        />
                        <div className="absolute inset-0 flex justify-center items-center z-10">
                          <p className="w-full self-end rounded-b-lg text-center text-lg font-bold shadow-md p-4 bg-black bg-opacity-70 text-white">
                            {group.name}
                          </p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
          {/* <div>Solo Artists</div> */}
        </div>
      </div>
    </>
  );
}
