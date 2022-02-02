import axios from "axios";
import useSWR from "swr";
import Image from "next/image";
import slugify from "slugify";
type Company = {
  id: number;
  name: string;
  image: {
    base: string;
  };
};
type PageResponse = {
  companies: Company[];
  lastPage: boolean;
};
export default function CompanyPage() {
  const address = `http://localhost:5000/company?page=1&sort=0`;
  const fetcher = async (url: string) =>
    await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR<PageResponse>(address, fetcher);

  if (error) return <p>Failed</p>;
  if (!data) return <p>Loading...</p>;
  return (
    <>
      <div className="grid justify-center">
        <div className="flex justify-center">
          {data &&
            data.companies.map((company) => {
              return (
                <div key={company.id} className="p-4">
                  <a
                    href={`/companies/${company.id}/${slugify(company.name, {
                      lower: true,
                    })}`}
                    className=""
                  >
                    <div className="grid justify-center gap-2">
                      <Image
                        src={company.image.base}
                        height={250}
                        width={200}
                        className="grid justify-center rounded-lg"
                      ></Image>
                      <div className="flex justify-center">
                        <h3>{company.name}</h3>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
