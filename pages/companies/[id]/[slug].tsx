import axios from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";

type PageResponse = {};
export default function CompanyInfoPage() {
  const router = useRouter();
  const { id } = router.query;

  const address = `http://localhost:5000/company?page=1&sort=0`;
  const fetcher = async (url: string) =>
    await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR<PageResponse>(address, fetcher);

  if (error) return <p>Failed</p>;
  if (!data) return <p>Loading...</p>;
  return (
    <>
      <div> Company ID : {id}</div>
    </>
  );
}
