import useApiData from './hooks/fetchData';

function Check() {
  const apiUrl = '/v1/proposal/';
  const { data, error, isLoading } = useApiData(apiUrl);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && (
        <div>
          <h2>Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Check;
