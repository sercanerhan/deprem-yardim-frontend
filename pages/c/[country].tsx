import { useRouter } from "next/router";

type PageQuery = {
  country: string;
};

const Country = () => {
  const router = useRouter();
  const { country } = router.query as PageQuery;

  return (
    <div>Implement provision aid locations from other countries: {country}</div>
  );
};

export default Country;
