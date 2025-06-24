import { useEffect, useState } from 'react';
import API from '../api';

const statusOptions = ['To Do', 'In Progress', 'Done'];
const statusColors = {
  'To Do': 'bg-red-600',
  'In Progress': 'bg-yellow-500',
  'Done': 'bg-green-600',
};

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ id: null, title: '', status: 'To Do' });

  const fetchTasks = async () => {
    const res = await API.get('/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const openModal = (task = null) => {
    if (task) {
      setForm({ id: task.id, title: task.title, status: task.status });
    } else {
      setForm({ id: null, title: '', status: 'To Do' });
    }
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) return;
    if (form.id) {
      await API.put(`/tasks/${form.id}`, {
        title: form.title,
        status: form.status,
      });
    } else {
      await API.post('/tasks', { title: form.title });
    }
    setShowModal(false);
    fetchTasks();
  };

  const handleDelete = async () => {
    await API.delete(`/tasks/${form.id}`);
    setShowModal(false);
    fetchTasks();
  };

  const filteredTasks = filter === 'All' ? tasks : tasks.filter(t => t.status === filter);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Task Dashboard</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Add Task
        </button>
      </div>

      <div className="mb-4">
        <label className="mr-2">Filter by Status:</label>
        <select
          className="bg-gray-800 text-white px-3 py-1 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {['All', ...statusOptions].map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-lg">Task</th>
              <th className="px-6 py-3 text-lg">Status</th>
              <th className="px-6 py-3 text-lg">Last Updated</th>
              <th className="px-6 py-3 text-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr
                key={task.id}
                className="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-white text-base">{task.title}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded text-white ${statusColors[task.status]}`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4">{new Date(task.updatedAt).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => openModal(task)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {filteredTasks.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-400">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-xl">
            {/* Close icon */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-300 hover:text-white text-xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold mb-4">
              {form.id ? 'Edit Task' : 'Add New Task'}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Task Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />

              {/* Status buttons (only for editing) */}
              {form.id && (
                <div className="flex justify-between">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => setForm({ ...form, status })}
                      className={`flex-1 mx-1 py-2 rounded text-white ${
                        form.status === status
                          ? `${statusColors[status]} ring-2 ring-white`
                          : `${statusColors[status]} opacity-70`
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-4">
                {form.id && (
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                )}
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
