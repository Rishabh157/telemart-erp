import React from "react";
import ATMTransferList from "./ATMTransferList";

type Props = {
  leftSideTitle: string;
  rightSideTitle: string;
};

const ATMTransferListWrapper = ({ leftSideTitle, rightSideTitle }: Props) => {
  const [left, setLeft] = React.useState<{ label: string; value: string }[]>([
    { label: "Lable 1 ", value: "1" },
    { label: "Lable 2 ", value: "2" },
    { label: "Lable 3 ", value: "3" },
    { label: "Lable 4 ", value: "4" },
  ]);
  const [right, setRight] = React.useState<{ label: string; value: string }[]>(
    []
  );

  const transferListProps = {
    leftSideTitle,
    rightSideTitle,
    left,
    setLeft,
    right,
    setRight,
  };

  return <ATMTransferList {...transferListProps} />;
};

export default ATMTransferListWrapper;
