import Link from "next/link";
import axios from "axios";
import useSWR from "swr";
import { Company } from "../../../lib/types";
import Image from "next/image";
import { FaEllipsisH } from "react-icons/fa";
import slugify from "slugify";
import AddCompanyDialog from "../../../components/admin/popup";

interface PageResponse {
  companies: Company[];
}

export default function AdminCompanyPage() {
  const address = `http://localhost:5000/company?page=1&sort=0`;
  const fetcher = async (url: string) =>
    await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR<PageResponse>(address, fetcher);

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
      <div className="flex p-8">
        <table className="border-collapse table-auto w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="border-b p-4">
                <h1 className=" flex justify-between text-lg  items-center">
                  <p>Companies</p>
                  <div className="flex justify-end">
                    <AddCompanyDialog />
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
                              src={company.image.base}
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
