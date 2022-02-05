import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import slugify from "slugify";
import { slug } from "../../../lib/utils";
import { useAuthContext } from "../../../lib/hooks/auth";
import NewMemberForm from "../../../components/forms/newMember";
import NewEraForm from "../../../components/forms/newEra";
import { useEffect, useState } from "react";

type PageResponse = {};
export default function GroupPage() {
  const router = useRouter();
  const { id } = router.query;
  const { account } = useAuthContext();
  //Reference : https://github.com/vercel/next.js/discussions/15952#discussioncomment-47750
  const address = `http://localhost:5000/group/${id}`;
  const fetcher = async (url: string) =>
    await axios.get(url).then((res) => res.data);
  const { data, error, mutate } = useSWR<any>(id ? address : null, fetcher);

  const [newEraModalOpen, setNewEraModalOpen] = useState<boolean>(false);

  useEffect(() => {
    mutate();
  }, [newEraModalOpen]);

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

  const result = data.data;
  const members = data.data.members.map((x: any) => x.artist);
  const eras = data.data.eras;
  return (
    <>
      <div className="w-full grid gap-8 justify-start p-8 ">
        <div className="header__section">
          <p className="text-3xl font-bold">{result.name}</p>
        </div>

        <div className="member__section">
          <div className="flex justify-between">
            <p className="text-2xl font-semibold">Members</p>
            {account && account.privileges.some((p) => [0, 1].includes(p)) && (
              <NewMemberForm groupId={result.id} companyId={result.companyId} />
            )}
          </div>
          <div className="flex flex-wrap gap-4 py-2">
            {members.map((artist: any) => {
              return (
                <div key={artist.id}>
                  <div className="h-96 w-64 relative rounded-lg shadow-lg hover:shadow-xl">
                    <Image
                      src={artist.image.base}
                      layout="fill"
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <p className="text-center text-xl ">{artist.name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="eras__section">
          <div className="flex justify-between">
            <p className="text-2xl font-semibold">Eras</p>
            {account && account.privileges.some((p) => [0, 2].includes(p)) && (
              <NewEraForm
                groupId={result.id}
                isOpen={newEraModalOpen}
                setIsOpen={setNewEraModalOpen}
              />
            )}
          </div>
          <div className="flex flex-wrap gap-4 py-2">
            {eras.map((era: any) => {
              return (
                <div key={era.id}>
                  <Link href={`/eras/${era.id}/${slug(era.title)}`}>
                    <a>
                      <div className="h-64 w-96 relative rounded-lg shadow-lg hover:shadow-xl">
                        <Image
                          src={era.image.base}
                          layout="fill"
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <p className="text-center text-xl ">{era.title}</p>
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