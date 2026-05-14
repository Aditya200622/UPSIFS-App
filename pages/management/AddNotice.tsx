import React, { useState } from 'react';

import {
  ChevronLeft,
  Bell
} from 'lucide-react';

import {
  collection,
  addDoc
} from 'firebase/firestore';

import {
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';

import {
  db,
  storage
} from '../../lib/firebase';

interface Props {
  onBack: () => void;
}

const AddNotice: React.FC<Props> = ({
  onBack
}) => {

  const [loading, setLoading] =
    useState(false);

  const [file, setFile] =
    useState<File | null>(null);

  const [formData, setFormData] =
    useState({

      title: '',

      content: '',

      category: ''

    });

  // ================= INPUT =================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  // ================= SUBMIT =================

  const handleSubmit = async () => {

    if (

      !formData.title ||

      !formData.content ||

      !formData.category

    ) {

      alert(
        'Please fill all fields'
      );

      return;

    }

    try {

      setLoading(true);

      let fileUrl = '';

      let fileType = '';

      // ================= FILE UPLOAD =================

      if (file) {

        console.log(
          'UPLOADING FILE...'
        );

        const storageRef = ref(

          storage,

          `notices/${Date.now()}-${file.name}`

        );

        // 🔥 UPLOAD FILE

        await uploadBytes(

          storageRef,

          file

        );

        // 🔥 GET URL

        fileUrl =
          await getDownloadURL(
            storageRef
          );

        fileType =
          file.type;

        console.log(
          'FILE URL:',
          fileUrl
        );

      }

      // ================= SAVE NOTICE =================

      await addDoc(

        collection(
          db,
          'notices'
        ),

        {

          title:
            formData.title,

          content:
            formData.content,

          category:
            formData.category,

          fileUrl,

          fileType,

          createdAt:
            new Date(),

          isPinned:
            false

        }

      );

      alert(
        'Notice Published Successfully ✅'
      );

      // ================= RESET =================

      setFormData({

        title: '',

        content: '',

        category: ''

      });

      setFile(null);

    } catch (error) {

      console.error(
        'UPLOAD ERROR:',
        error
      );

      alert(
        'Failed to publish notice'
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="p-5 max-w-lg mx-auto">

      {/* HEADER */}

      <header className="flex items-center gap-4 mb-8">

        <button
          onClick={onBack}
          className="p-2 -ml-2"
        >

          <ChevronLeft size={24} />

        </button>

        <h2 className="text-xl font-bold">

          Publish Notice 📢

        </h2>

      </header>

      {/* FORM */}

      <div className="card-3d p-6 space-y-4">

        {/* TITLE */}

        <input
          type="text"
          name="title"
          placeholder="Notice Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none"
        />

        {/* CATEGORY */}

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none"
        />

        {/* CONTENT */}

        <textarea
          name="content"
          placeholder="Notice Content"
          rows={5}
          value={formData.content}
          onChange={handleChange}
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none resize-none"
        />

        {/* FILE */}

        <div className="space-y-2">

          <label className="text-sm font-bold text-slate-600">

            Upload Image or PDF

          </label>

          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => {

              if (
                e.target.files?.[0]
              ) {

                setFile(
                  e.target.files[0]
                );

              }

            }}
            className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none"
          />

          {/* FILE NAME */}

          {file && (

            <p className="text-xs text-slate-500 font-medium">

              Selected:
              {' '}
              {file.name}

            </p>

          )}

        </div>

        {/* BUTTON */}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
        >

          <Bell size={20} />

          {loading

            ? 'Publishing...'

            : 'Publish Notice'}

        </button>

      </div>

    </div>

  );

};

export default AddNotice;