import { Fragment, useState, useEffect, useRef } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useDispatch } from 'react-redux';
import { filterProposals } from '../../features/proposals/proposalSlice';

const allStatus = [
  { name: 'all' },
  { name: 'new' },
  { name: 'accepted' },
  { name: 'rejected' },
];

export default function FilterSelect() {
  const [selected, setSelected] = useState(allStatus[0]);
  const dispatch = useDispatch();
  const refs = useRef(false);
  useEffect(() => {
    if (!refs.current) refs.current = true;
    else dispatch(filterProposals(selected.name));
  }, [selected]);

  return (
    <div className=" w-44 ">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative ">
          <Listbox.Button className="relative w-full  cursor-pointer rounded-lg bg-slate-200 py-2 pl-3 pr-6 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate capitalize">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60  w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {allStatus.map((status, statusIndex) => (
                <Listbox.Option
                  key={statusIndex}
                  className={({ active }) =>
                    `relative  select-none cursor-pointer py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={status}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate capitalize ${
                          selected ? 'font-medium cap' : 'font-normal'
                        }`}
                      >
                        {status.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
