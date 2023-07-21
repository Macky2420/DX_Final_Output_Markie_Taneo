import React from 'react';
import extraction from '../assets/movie-poster/extraction.jpg';
const ViewTicketData = () => {
  return (
    <><div className='flex justify-center items-center mt-10'>
    <div
  className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row">
  <img
    className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
    src={extraction}
    alt="" />
  <div className="flex flex-col justify-start p-6">
    <h5
      className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
      Extraction
    </h5>
    <p className="mb-4 text-neutral-600 dark:text-neutral-200">
    A black-market mercenary who has nothing to lose is hired to rescue the kidnapped son of an imprisoned international crime lord.
    </p>
    <hr/>
    <h5
      className="mt-2 mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
      Markie
    </h5>
    <p className="mb-4 text-neutral-600 dark:text-neutral-200">
    Brgy. Capoocan
    </p>
    <p className="text-xs text-neutral-500 dark:text-neutral-300">
      June 6, 2023 - 7:30 pm
    </p>
  </div>
</div>
</div>
    </>
  );
}

export default ViewTicketData;