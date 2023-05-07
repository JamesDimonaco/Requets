import CreateRequest from "../../components/CreateRequest";

async function getRequests() {
    const response = await fetch('http://192.168.1.62:5000/api/collections/requests/records?page=1&perPage=30');
    const data = await response.json();
    return data?.items as any[];
    
}


export default async function RequestPage() {
    const requests = await getRequests();
    return (
        <div className="container mx-auto bg-gradient min-h-screen">
        <h1 className="text-4xl font-bold my-6">Request Page</h1>
        <table className="table-fixed w-full">
          <thead>
            <tr className="bg-black text-yellow-300">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => {
              return <RequestCard request={request} key={request.id} />;
            })}
          </tbody>
        </table>
        <CreateRequest />
      </div>
    );
  }
  
  function RequestCard({ request }: { request: any }) {
    const { title, id, done, type } = request;
    return (
      <tr key={id} className="bg-yellow-400 hover:bg-yellow-500 text-black">
        <td className="border px-4 py-2">{title}</td>
        <td className="border px-4 py-2">{type}</td>
        <td className="border px-4 py-2">
          {done === true ? (
            <span className="bg-green-500 text-white px-2 py-1 rounded">✅</span>
          ) : (
            <span className="bg-red-500 text-white px-2 py-1 rounded">❌</span>
          )}
        </td>
      </tr>
    );
  }