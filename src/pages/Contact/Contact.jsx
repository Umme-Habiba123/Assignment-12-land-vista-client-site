import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure(); // ensure baseURL is set in this hook

  useEffect(() => {
    if (!user?._id) return;

    const fetchContacts = async () => {
      try {
        // Backend should have GET /contacts?userId=
        const res = await axiosSecure.get(`/contacts`, {
          params: { userId: user._id }
        });
        setContacts(res.data);
      } catch (err) {
        console.error("Failed to fetch contacts:", err);
      }
    };

    fetchContacts();
  }, [user, axiosSecure]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Backend should have PATCH /contacts/:id
      const res = await axiosSecure.patch(`/contacts/${id}`, { status: newStatus });

      if (res.status !== 200 && res.status !== 204) {
        throw new Error("Failed to update status");
      }

      setContacts((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="min-h-screen py-16 px-8 bg-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-red-600 mb-8">📞 Contacts</h1>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="bg-gray-100 text-black">
              <tr>
                <th className="p-3 border-b border-gray-300">Phone Number</th>
                <th className="p-3 border-b border-gray-300">Date</th>
                <th className="p-3 border-b border-gray-300">Status</th>
                <th className="p-3 border-b border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr
                  key={c._id}
                  className="border-b border-gray-300 hover:bg-gray-50"
                >
                  <td className="p-3 text-black">{c.phone}</td>
                  <td className="p-3 text-black">
                    {new Date(c.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        c.status === "contacted"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {c.status === "pending" && (
                      <button
                        onClick={() => handleStatusChange(c._id, "contacted")}
                        className="px-4 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
                      >
                        Mark as Contacted
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Contact;
