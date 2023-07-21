import { useState } from 'react';

interface UnitKerjaProps {
  data: string;
  expandClass?: string;
  fallback?: string;
}

export default function ExpandableTableData(props: UnitKerjaProps) {
  const [expand, setExpand] = useState(false);

  const handleExpand = () => setExpand(!expand);

  const { data, expandClass = '', fallback = 'truncate w-40 cursor-pointer' } = props;

  const styles = expand ? expandClass : fallback;

  const renderComponent = data ? (
    <div onClick={handleExpand} className={styles}>
      {data}
    </div>
  ) : null;

  return renderComponent;
}
