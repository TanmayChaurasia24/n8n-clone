interface PageProps {
  params: Promise<{
    credentialId: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const { credentialId } = await params;
  return <p>Credentials id: {credentialId}</p>;
};

export default page;
