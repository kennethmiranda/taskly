import { lusitana } from "@/app/ui/fonts";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function StoragePage() {
  return (
    <main className="flex-1 p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <h2 className={`${lusitana.className} text-3xl font-bold mb-6`}>
          File Storage
        </h2>

        {/* add file */}
        <button className="flex items-center justify-center rounded-r-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            Add File
          </div>
        </button>

        {/* sort by /*}
        sort by name, size, or date */}

        {/* list of files */}
        <div className="bg-white rounded-lg shadow overflow-hidden mt-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
              <span className="text-sm font-medium text-gray-500">
                File Name
              </span>
              <span className="text-sm font-medium text-gray-500">
                File Size
              </span>
              <span className="text-sm font-medium text-gray-500">
                File Date
              </span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 bg-white">
              <span className="text-sm font-medium text-gray-800">
                file1.docx
              </span>
              <span className="text-sm font-medium text-gray-800">2.5 MB</span>
              <span className="text-sm font-medium text-gray-800">
                10/2/2024
              </span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 bg-white">
              <span className="text-sm font-medium text-gray-800">
                file2.docx
              </span>
              <span className="text-sm font-medium text-gray-800">1.5 MB</span>
              <span className="text-sm font-medium text-gray-800">
                8/30/2024
              </span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 bg-white">
              <span className="text-sm font-medium text-gray-800">
                file3.docx
              </span>
              <span className="text-sm font-medium text-gray-800">3.5 MB</span>
              <span className="text-sm font-medium text-gray-800">
                9/28/2024
              </span>
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8"></div>
      </div>
    </main>
  );
}
