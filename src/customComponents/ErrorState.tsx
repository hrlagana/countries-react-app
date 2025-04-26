interface Props {
    message: string;
}

const ErrorState = ({ message }: Props) => {
    return <p className="py-6 text-red-500 text-center">Error: {message}</p>;
};

export default ErrorState;