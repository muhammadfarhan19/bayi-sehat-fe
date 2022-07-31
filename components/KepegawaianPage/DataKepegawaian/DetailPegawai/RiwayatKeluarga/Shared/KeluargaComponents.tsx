import { XIcon } from '@heroicons/react/outline';
import React from 'react';

interface TextInput {
  name: string;
  type: string;
  label: string;
  errorMessage: any;
  isError: any;
  validation: any;
}

interface Picker {
  label: string;
  defaultOption: string;
  firstOption: string;
  secondOption: string;
  formVerification: string;
  validation: any;
  errorMessage: any;
  isError: any;
}

interface ButtonRows {
  toggleModal: () => void;
  leftButton: string;
  rightButton: string;
}

interface HeaderRows {
  navigateBack: () => void;
  headerTitle: string;
}

export function DropdownSelect(props: Picker) {
  return (
    <div className="mt-5 sm:col-span-6">
      <label className="block text-sm font-medium text-gray-700">{props.label}</label>
      <div className="mt-1 sm:col-span-2 sm:mt-0">
        <select
          {...props.validation}
          name={props.formVerification}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value={''}>{props.defaultOption}</option>
          <option value={'1'}>{props.firstOption}</option>
          <option value={'2'}>{props.secondOption}</option>
        </select>
        {props.isError && <p className="mt-1 text-xs text-red-500">{props.errorMessage}</p>}
      </div>
    </div>
  );
}

export function ButtonRows(props: ButtonRows) {
  return (
    <div className="mt-5 flex flex-row justify-end space-x-5">
      <button
        onClick={props.toggleModal}
        className="w-20 rounded border border-transparent bg-gray-400 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {props.leftButton}
      </button>
      <button
        type="submit"
        className="w-20 rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {props.rightButton}
      </button>
    </div>
  );
}

export function InputLabelled(props: TextInput) {
  return (
    <div className="mt-5 sm:col-span-6">
      <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
        {props.label}
      </label>
      <div className="mt-1">
        <input
          {...props.validation}
          className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
          name={props.name}
          type={props.type}
        />
        {props.isError && <p className="mt-1 text-xs text-red-500">{props.errorMessage}</p>}
      </div>
    </div>
  );
}

export function HeaderComponents(props: HeaderRows) {
  return (
    <div className="flex justify-between">
      <h3 className="text-lg font-medium leading-6 text-gray-900">{props.headerTitle}</h3>
      <XIcon className="h-5 cursor-pointer" onClick={props.navigateBack} />
    </div>
  );
}
