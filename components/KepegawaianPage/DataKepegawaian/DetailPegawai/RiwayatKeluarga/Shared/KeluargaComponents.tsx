import { XIcon } from '@heroicons/react/outline';
import React from 'react';

interface TextInput {
  name: string;
  type: string;
  label: string;
  errorMessage: any;
  isError: any;
  validation: any;
  maxLength?: number;
  value?: string;
  isUneditable?: boolean;
  additionalStyle?: string;
  additionalLabelStyle?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clipBoard?: boolean;
  clipBoardIconSize?: string;
  onCopyToClipboard?: () => void;
}

interface Picker {
  label: string;
  defaultOption: string;
  firstOption?: string;
  secondOption?: string;
  formVerification: string;
  validation: any;
  errorMessage: any;
  isError: any;
  moreOptions?: any;
  firstValue?: any;
  secondValue?: any;
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
          {props.moreOptions}
        </select>
        {props.isError && <p className="mt-1 text-xs text-red-500">{props.errorMessage}</p>}
      </div>
    </div>
  );
}

export function DropdownPicker(props: Picker) {
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
          <option value={props.firstValue}>{props.firstOption}</option>
          <option value={props.secondValue}>{props.secondOption}</option>
          {props.moreOptions}
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
        className="w-30 rounded border border-transparent bg-gray-400 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {props.leftButton}
      </button>
      <button
        type="submit"
        className="w-30 rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {props.rightButton}
      </button>
    </div>
  );
}

export function InputLabelled(props: TextInput) {
  const { clipBoard = false } = props;
  return (
    <div className="mt-5 sm:col-span-6">
      <label htmlFor="nama" className={`block text-sm font-medium text-gray-700 ${props.additionalLabelStyle}`}>
        {props.label}{' '}
        {clipBoard ? (
          <div onClick={props.onCopyToClipboard}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5 animate-pulse"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
              />
            </svg>
          </div>
        ) : null}
      </label>
      <div className="mt-1">
        <input
          onChange={props.onChange}
          disabled={props.isUneditable}
          value={props.value}
          {...props.validation}
          className={`block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm ${props.additionalStyle}`}
          name={props.name}
          type={props.type}
          maxLength={props.maxLength}
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
