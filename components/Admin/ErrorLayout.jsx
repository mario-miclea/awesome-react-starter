import { Layout } from '@components';

const ErrorLayout = () => {
  return (
    <Layout title="Eroare">
      <div className="flex flex-col justify-center items-center">
        <div className="flex gap-5 w-full p-6 bg-red-200 opacity-80 border-1 border-red-700 drop-shadow-sm rounded items-center">
          <i className="fa-solid fa-circle-xmark text-red-500 text-lg"></i>
          <p className="text-red-800 font-medium">
            Ne pare rău, a apărut o eroare care ne împiedică să afișăm corect pagina.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ErrorLayout;
