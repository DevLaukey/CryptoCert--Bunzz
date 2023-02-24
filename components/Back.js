import { useRouter } from 'next/router';
import React from 'react'

const Back = () => {
    const router = useRouter();

  return (
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
          onClick={() => {
              router.back();
          }}
      >
          Back
      </button>  )
}

export default Back