import React from 'react';

import { PresensiShiftDateData } from '../../../types/api/PresensiAPI';
import { classNames } from '../../../utils/Components';
import { withErrorBoundary } from '../../shared/hocs/ErrorBoundary';
import LiburDanRamadhanDetail from './LiburDanRamadhanDetail';
import LiburDanRamadhanList from './LiburDanRamadhanList';

function LiburDanRamadhanPage() {
  const [data, setData] = React.useState<PresensiShiftDateData>();

  return (
    <>
      <div className={classNames(data ? 'hidden' : '')}>
        <LiburDanRamadhanList
          onShowDetail={(data: PresensiShiftDateData) => {
            setData(data);
          }}
        />
      </div>
      {!!data && (
        <LiburDanRamadhanDetail
          data={data}
          onBack={() => {
            setData(undefined);
          }}
        />
      )}
    </>
  );
}

export default withErrorBoundary(LiburDanRamadhanPage);
