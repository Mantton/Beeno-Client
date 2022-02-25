import Link from "next/link";
import axios from "axios";
import useSWR from "swr";
import { Company } from "../../lib/types";
import Image from "next/image";
import Head from "next/head";
import { FaEllipsisH, FaPlus } from "react-icons/fa";
import slugify from "slugify";
import AddCompanyDialog from "../../components/admin/popup";
import { useEffect, useState } from "react";
import { API_URL } from "../../lib/constants";

interface PageResponse {
  companies: Company[];
}

export default function CompanyPage() {
  const address = `${API_URL}/company?page=1&sort=0`;
  const fetcher = async (url: string) =>
    await axios.get(url).then((res) => res.data);
  const { data, error, mutate } = useSWR<PageResponse>(address, fetcher);

  // SACM - Show Add Company Modal
  const [SACM, setSACM] = useState<boolean>(false);

  useEffect(() => {
    mutate();
  }, [SACM]);

  if (error) {
    return (
      <div className="flex justify-center">
        {" "}
        <p> An Error Occurred</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center">
        {" "}
        <p>Loading..</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Companies</title>
      </Head>
      <div className="flex p-8">
        <table className="border- collapse table-auto w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="border-b p-4">
                <h1 className=" flex justify-between text-lg  items-center">
                  <p className="">Companies</p>
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setSACM(true);
                      }}
                      className="rounded-full shadow-lg bg-primary"
                    >
                      <FaPlus className="drop-shadow-lg text-sm m-1" />
                    </button>
                    <AddCompanyDialog isOpen={SACM} setIsOpen={setSACM} />
                  </div>
                </h1>
              </th>
            </tr>
          </thead>

          <tbody>
            {data.companies.map((company) => {
              return (
                <tr>
                  <td className="border-b p-4 text-md">
                    <div className="flex justify-between items-center">
                      <div className="">
                        <Link
                          href={`/companies/${company.id}/${slugify(
                            company.name,
                            {
                              lower: true,
                            }
                          )}`}
                        >
                          <a className="flex items-center">
                            <Image
                              src={company.imageUrl}
                              width={50}
                              height={50}
                              layout="intrinsic"
                              className="rounded-full"
                            ></Image>
                            <p className="px-4">{company.name}</p>
                          </a>
                        </Link>
                      </div>

                      <div className="">
                        {" "}
                        <FaEllipsisH style={{ color: "gray" }} />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
