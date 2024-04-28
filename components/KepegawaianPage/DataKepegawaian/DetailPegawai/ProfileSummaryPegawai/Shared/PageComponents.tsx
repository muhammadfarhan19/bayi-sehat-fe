import React from 'react';

interface Header {
  name: string;
  jabatan?: string;
  contact?: string;
}

interface SubData {
  title: string;
  separatorTop: string;
}

interface InnerData {
  value: any;
  subtitle: string;
}

interface EndLetterStatement {
  text: string;
  styleHeader: string;
  styleContent: string;
}

export function HeaderComponents(props: Header) {
  return (
    <>
      <h1
        style={{
          textAlign: 'left',
          fontWeight: 'bold',
          fontSize: 16,
        }}
      >
        {props.name}
      </h1>
      <h5
        style={{
          fontSize: 10,
          fontWeight: 100,
          color: '#6B7280',
          width: '35%',
        }}
      >
        {props?.jabatan}
      </h5>
      <h5
        style={{
          fontSize: 10,
          fontWeight: 100,
          color: '#6B7280',
        }}
      >
        {props?.contact}
      </h5>
    </>
  );
}

export function LabelledRowsItem(props: SubData) {
  return (
    <div className={props.separatorTop}>
      <h3 style={{ fontWeight: 'bold', fontSize: 12 }}>{props.title}</h3>
    </div>
  );
}

export function ContentLabelledItems(props: InnerData) {
  return (
    <div className="flex flex-row justify-between">
      <span
        style={{
          display: 'flex',
          flex: 1,
          fontSize: 12,
          padding: 4,
        }}
      >
        {props.subtitle}
      </span>
      <span style={{ display: 'flex', flex: 2, fontSize: 12 }}>{props.value}</span>
    </div>
  );
}

export function EndPrintedStatement(props: EndLetterStatement) {
  return (
    <div className={props.styleHeader}>
      <p className={props.styleContent}>{props.text}</p>
    </div>
  );
}
