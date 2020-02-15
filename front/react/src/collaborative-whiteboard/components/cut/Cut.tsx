/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import { combineLatest } from 'rxjs';
import { CutRange } from '../../models';
import CwServiceContext from '../../serviceContext';
import CutUi from './CutUi';

export interface CutProps {}

const Cut: React.FC<CutProps> = () => {
  const service = useContext(CwServiceContext);

  const [cutLength, setCutLength] = useState(0);
  const [cutRange, setCutRange] = useState<CutRange>([0, 0]);

  useEffect(() => {
    const subscription = combineLatest([
      service.historyCutLength$,
      service.cutRange$
    ]).subscribe(([_cutLength, _cutRange]) => {
      setCutLength(_cutLength);
      setCutRange(_cutRange);
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cutRangeHandler = (_cutRange: CutRange) => {
    service.setCutRange(_cutRange);
  };

  const cutHandler = (_cutRange: CutRange) => {
    service.cutByRange(_cutRange);
  };

  return (
    <CutUi
      cutLength={cutLength}
      cutRange={cutRange}
      cutRangeHandler={cutRangeHandler}
      cutHandler={cutHandler}
    />
  );
};

export default Cut;
