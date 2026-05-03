interface PageProps {
    params: Promise<{
        executionId: string;
    }>;
}

const page = async ({ params }: PageProps) => {
    const { executionId } = await params;
    return <p>execution id: {executionId}</p>;
};

export default page;
