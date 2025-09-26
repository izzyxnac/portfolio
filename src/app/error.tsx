'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <div className='text-center'>
        <h2 className='mb-4 text-2xl font-bold'>Something went wrong!</h2>
        <p className='mb-4 text-gray-600'>An error occurred while rendering this page.</p>
        <button
          onClick={reset}
          className='rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600'
        >
          Try again
        </button>
      </div>
    </div>
  );
}
