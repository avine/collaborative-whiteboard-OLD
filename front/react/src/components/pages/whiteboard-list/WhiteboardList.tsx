/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { WhiteboardPublicListItem } from '../../../../../../back/src/router/whiteboard/whiteboard.types';
import { getWhiteboardList } from '../../../services/whiteboard';

export interface WhiteboardListProps {}

const WhiteboardList: React.FC<WhiteboardListProps> = () => {
  const [list, setList] = useState<WhiteboardPublicListItem[]>([]);

  useEffect(() => {
    getWhiteboardList().then(({ data }) => {
      setList(data);
    });
  });

  return (
    <ul>
      {list.map(item => (
        <li>
          <Link key={item.id} to={`/whiteboard/${item.id}`}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default WhiteboardList;
