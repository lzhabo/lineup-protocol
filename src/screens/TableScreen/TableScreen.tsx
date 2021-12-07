import styled from "@emotion/styled";
import React, { useState } from "react";
import data from "./tasks.json";
import { ToggleButton } from "@screens/TableScreen/ToggleButton";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 96px;
  max-width: 560px;
  padding: 32px;
  border-radius: 8px;
  background: white;
`;

const Table = styled.table`
  gap: 0;
  font-family: Roboto, Poppins, sans-serif;
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  text-align: left;
  border-spacing: 0;
  color: #4d5c76;
  border-collapse: collapse;

  th,
  td {
    padding: 0 8px;
    background: #f5f5f5;
    height: 42px;
    box-sizing: border-box;
    border: 1px solid #ebf0f6;
  }

  td {
    height: 30px;
    background: transparent;
  }
`;

const TableScreen: React.FC<IProps> = () => {
  return (
    <Root>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Start date</th>
            <th>Progress</th>
            <th>Task type</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v) => (
            <TableRow key={v.id} v={v} />
          ))}
        </tbody>
      </Table>
    </Root>
  );
};

const StyledCell = styled.div`
  display: flex;
  align-items: center;
`;
const TableRow: React.FC<{ v: any; level?: number }> = ({ v, level = 0 }) => {
  const [opened, setOpened] = useState(false);
  const isParent = v.children && v.children.length > 0;
  return (
    <>
      <tr key={v.id}>
        <td
          style={
            isParent || level > 0
              ? { position: "relative", paddingLeft: 16 + 8 * level }
              : { paddingLeft: 16 + 8 * level }
          }
        >
          <StyledCell>
            {(isParent || level > 0) &&
              Array.from(
                { length: level + 1 },
                (_, i) =>
                  (isParent || i < level) && (
                    <ToggleButton
                      level={i + 1}
                      key={`table-toggle-arrow-${i}`}
                      style={{ left: 10 * i }}
                      opened={opened}
                      disabled={!isParent || i !== level}
                      onClick={() => setOpened(!opened)}
                    />
                  )
              )}
            {v.id}
          </StyledCell>
        </td>
        <td>{v.startDate}</td>
        <td>{v.progress}</td>
        <td>{v.taskType}</td>
      </tr>
      {opened &&
        v.children.map((child: any, key: number) => (
          <TableRow v={child} key={`${v.id}_${key}`} level={level + 1} />
        ))}
    </>
  );
};

export default TableScreen;
