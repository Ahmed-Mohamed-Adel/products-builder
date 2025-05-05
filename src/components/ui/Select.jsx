"use client";

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import { categories } from "../../data";

export default function SelectUser({ selected, setSelected }) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <Label className="block text-sm font-medium text-gray-700 mb-1">
        Category
      </Label>
      <div className="relative">
        <ListboxButton className="w-full cursor-default rounded-md bg-white py-3 pl-3 pr-10 text-left border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <span className="flex items-center gap-2">
            <img
              src={selected.imageURL}
              alt={selected.name}
              className="h-6 w-6 rounded-full"
            />
            <span className="block truncate">{selected.name}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
          {categories.map((category) => (
            <ListboxOption
              key={category.id}
              value={category}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-3 pr-10 ${
                  active ? "bg-indigo-600 text-white" : "text-gray-900"
                }`
              }
            >
              {({ selected: isSelected }) => (
                <>
                  <div className="flex items-center">
                    <img
                      src={category.imageURL}
                      alt=""
                      className="h-6 w-6 rounded-full"
                    />
                    <span
                      className={`ml-3 block truncate ${
                        isSelected ? "font-semibold" : "font-normal"
                      }`}
                    >
                      {category.name}
                    </span>
                  </div>

                  {isSelected ? (
                    <span className="absolute inset-y-0 right-2 flex items-center text-indigo-600">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
