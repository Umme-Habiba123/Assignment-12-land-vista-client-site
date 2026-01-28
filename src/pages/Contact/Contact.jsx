import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch contacts for logged-in user
  useEffect(() => {
    if (!user?._id) return;

    const fetchContacts = async () => {
      try {
        const res = await axiosSecure.get(`/contacts?userId=${user._id}`);
        setContacts(res.data);
      } catch (err) {
        console.error("Failed to fetch contacts:", err);
      }
    };

    fetchContacts();
  }, [user, axiosSecure]);

  // Update contact status
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/contacts/${id}`, { status: newStatus });
      if (res.status !== 200) throw new Error("Failed to update status");

      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Add new contact
  const handleAddContact = async (e) => {
    e.preventDefault();
    const phone = e.target.phone.value;
    if (!phone) return alert("Phone number required!");

    try {
      const res = await axiosSecure.post("/contacts", { phone });
      if (res.status !== 201) throw new Error("Failed to add contact");
      setContacts((prev) => [...prev, res.data]);
      e.target.reset();
    } catch (err) {
      console.error("Error adding contact:", err);
    }
  };

  return (
    <div className="min-h-screen py-16 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-red-600 mb-8">📞 Contacts</h1>

        <form onSubmit={handleAddContact} className="mb-6 flex gap-2">
          <input
            type="text"
            name="phone"
            placeholder="Enter phone number"
            className="border p-2 rounded-md flex-1"
          />
          <button type="submit" className="bg-gray-200   text-black px-4 rounded-md hover:bg-gray-400">
            Add Contact
          </button>
        </form>

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
                <tr key={c._id} className="border-b border-gray-300 hover:bg-gray-50">
                  <td className="p-3">{c.phone}</td>
                  <td className="p-3">{new Date(c.createdAt).toLocaleString()}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        c.status === "contacted" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
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
