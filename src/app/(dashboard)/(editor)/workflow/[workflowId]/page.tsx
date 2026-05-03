interface PageProps {
    params: Promise<{
        workflowId: string;
    }>;
}

const page = async ({ params }: PageProps) => {
    const { workflowId } = await params;
    return <p>execution id: {workflowId}</p>;
};

export default page;
