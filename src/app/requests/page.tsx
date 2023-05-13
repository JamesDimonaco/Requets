import { getServerSession } from "next-auth";
import CreateRequest from "../../components/CreateRequest";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route"

async function getRequests() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`http://localhost:3000/api/plexRequests`, 
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  ;  
  const data = await response.json();
  return data as any[];

}


export default async function RequestPage() {

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/api/auth/signin');
  }

  const requests = await getRequests();
  
  return (
    <div className="container mx-auto bg-gradient h-screen">
      <h1 className="text-4xl font-bold my-6">Request Page</h1>
      <table className="table-fixed w-full">
        <thead>
          <tr className="bg-black text-yellow-300">
            <th className="px-4 py-2">Title</th>
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
  const { title, id } = request;
  return (
    <tr key={id} className="bg-yellow-400 hover:bg-yellow-500 text-black">
      <td className="border px-4 py-2">{title}</td>
    </tr>
  );
}