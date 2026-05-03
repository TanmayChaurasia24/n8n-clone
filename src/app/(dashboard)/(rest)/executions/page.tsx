import { requireAuth } from "@/lib/auth-utils";

const page = async () => {
  await requireAuth()
  return <div>execution</div>;
};

export default page;
