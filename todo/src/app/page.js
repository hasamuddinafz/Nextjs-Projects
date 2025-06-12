"use client";
import { useState, useEffect } from "react";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {

  const [open, setOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const data = localStorage.getItem("todos");
    if (data) {
      try {
        setTodos(JSON.parse(data));
      } catch {
        console.error("LocalStorage parse error");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const formik = useFormik({
    initialValues: { input: '' },
    validationSchema: Yup.object({
      input: Yup.string().trim().required('Input is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const text = values.input;
      if (!text) {
        toast.error('Cannot add empty todo');
        return;
      }
      setTodos(prev => [
        ...prev,
        { id: Date.now(), text, done: false },
      ]);
      toast.success('Todo added successfully');
      resetForm();
      setOpen(false);
    },
  });

  const toggleModal = () => setOpen(isOpen => !isOpen);

  const handleComplete = id => {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
    toast.info('Todo status updated');
  };

  const handleDelete = id => {
    setTodos(prev => prev.filter(t => t.id !== id));
    toast.warn('Todo deleted');
  };

  const filtered = todos.filter(t =>
    filter === 'all'
      ? true
      : filter === 'active'
        ? !t.done
        : t.done
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-400 to-amber-200 flex flex-col">
      <ToastContainer position="top-right" autoClose={2000} />
      <header className="py-8">
        <h1 className="text-4xl font-extrabold text-center text-white drop-shadow-lg">
          📝 Next.js Todo App
        </h1>
        <p className="text-center text-amber-100 mt-2">Hasamuddin Afzali</p>
      </header>

      <main className="flex-grow flex items-start justify-center px-4">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 space-y-6">
          <button
            onClick={toggleModal}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 rounded-xl transition shadow-lg"
          >
            + Add Todo
          </button>

          {open && (
            <div
              className="fixed inset-0 bg-gradient-to-b from-amber-400 to-amber-200 flex items-center justify-center z-50 h-screen"
              onClick={toggleModal}
            >
              <form
                onSubmit={formik.handleSubmit}
                className="bg-white rounded-2xl shadow-2xl p-6 w-11/12 max-w-sm"
                onClick={e => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold mb-4">New Todo</h2>
                <input
                  name="input"
                  type="text"
                  placeholder="Enter todo text..."
                  {...formik.getFieldProps('input')}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
                {formik.touched.input && formik.errors.input && (
                  <div className="text-red-500 text-sm mb-2">
                    {formik.errors.input}
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="px-4 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="flex justify-center gap-3">
            {['all', 'active', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full font-medium transition ${filter === f
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {f === 'all' ? 'All' : f === 'active' ? 'Active' : 'Completed'}
              </button>
            ))}
          </div>

          <ul className="divide-y divide-gray-200 max-h-72 overflow-y-auto">
            {filtered.length === 0 ? (
              <li className="text-center py-10 text-gray-400">
                {todos.length === 0
                  ? 'Nothing has been added yet.'
                  : 'There are no tasks matching this filter.'}
              </li>
            ) : (
              filtered.map(item => (
                <li
                  key={item.id}
                  className="flex items-center justify-between py-3 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleComplete(item.id)}
                      className={`p-1 rounded-full transition ${item.done
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                    >
                      <CheckCircleIcon className="h-6 w-6" />
                    </button>
                    <span
                      className={`select-none text-lg ${item.done ? 'line-through text-gray-400' : ''
                        }`}
                    >
                      {item.text}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-full hover:bg-red-100 transition"
                  >
                    <TrashIcon className="h-5 w-5 text-red-500" />
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </main>

      <footer className="py-4 text-center text-gray-600 text-sm">
        © 2025 Hasamuddin Afzali. All rights reserved.
      </footer>
    </div>
  );
}
